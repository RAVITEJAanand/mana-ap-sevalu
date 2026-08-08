const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Root of the AP website (one level up from admin-app/)
const PROJECT_ROOT = path.join(__dirname, '..');

// Auto Git Push after every save
function autoGitPush(filename) {
  try {
    // Only stage website content — NOT admin-app/ (it's in .gitignore)
    execSync('git add data/ assets/ index.html 2>nul || git add data/ assets/', { cwd: PROJECT_ROOT, stdio: 'pipe', shell: 'powershell.exe' });
    execSync(`git commit -m "[Admin Auto-Sync] Updated ${filename} via Desktop Launcher"`, { cwd: PROJECT_ROOT, stdio: 'pipe' });
    execSync('git push origin main', { cwd: PROJECT_ROOT, stdio: 'pipe' });
    return { success: true, message: `✅ ${filename} saved + pushed to GitHub live site!` };
  } catch (err) {
    const msg = err.message || '';
    if (msg.includes('nothing to commit') || msg.includes('up-to-date')) {
      return { success: true, message: 'Already up-to-date with GitHub.' };
    }
    return { success: false, error: err.message };
  }
}

let mainWindow = null;

const DATA_DIR = path.join(__dirname, '..', 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images');
const ICONS_DIR = path.join(ASSETS_DIR, 'icons');

// Ensure essential directories exist
[DATA_DIR, BACKUP_DIR, ASSETS_DIR, IMAGES_DIR, ICONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 860,
    minWidth: 1060,
    minHeight: 720,
    backgroundColor: '#02121e',
    title: 'AP Citizen Hub - Master Admin Launcher',
    icon: path.join(IMAGES_DIR, 'mana_logo.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ==========================================
// IPC HANDLERS - Node.js File System Access
// ==========================================

// 1. Read JSON file
ipcMain.handle('read-json', async (event, filename) => {
  try {
    const cleanFilename = path.basename(filename);
    const filePath = path.join(DATA_DIR, cleanFilename.endsWith('.json') ? cleanFilename : `${cleanFilename}.json`);
    
    if (!fs.existsSync(filePath)) {
      return { success: false, error: `File not found: ${cleanFilename}`, data: null };
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    return { success: true, data: data, path: filePath };
  } catch (err) {
    return { success: false, error: err.message, data: null };
  }
});

// 2. Write JSON file with Automatic Timestamped Backup
ipcMain.handle('write-json', async (event, filename, data) => {
  try {
    const cleanFilename = path.basename(filename);
    const baseNameWithoutExt = cleanFilename.replace('.json', '');
    const targetFile = path.join(DATA_DIR, `${baseNameWithoutExt}.json`);

    // Step 1: Create automatic backup if file already exists
    if (fs.existsSync(targetFile)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilename = `${baseNameWithoutExt}-${timestamp}.json`;
      const backupPath = path.join(BACKUP_DIR, backupFilename);
      
      const existingContent = fs.readFileSync(targetFile, 'utf-8');
      fs.writeFileSync(backupPath, existingContent, 'utf-8');
    }

    // Step 2: Write newly updated JSON data
    const formattedJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(targetFile, formattedJson, 'utf-8');

    // Step 3: AUTO PUSH to GitHub for real-time website sync
    const pushResult = autoGitPush(`${baseNameWithoutExt}.json`);

    return { 
      success: true, 
      message: pushResult.success
        ? `✅ Saved + Pushed to GitHub Live Site! (${baseNameWithoutExt}.json)`
        : `✅ Saved locally. Push note: ${pushResult.error}`,
      synced: pushResult.success,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Manual Git Push (from UI button)
ipcMain.handle('git-push', async () => {
  const result = autoGitPush('all changes');
  return result;
});

// 3. List Backups for a file or all files
ipcMain.handle('list-backups', async (event, fileFilter) => {
  try {
    if (!fs.existsSync(BACKUP_DIR)) return { success: true, backups: [] };

    const files = fs.readdirSync(BACKUP_DIR);
    let matchedFiles = files.filter(f => f.endsWith('.json'));

    if (fileFilter) {
      const baseFilter = fileFilter.replace('.json', '');
      matchedFiles = matchedFiles.filter(f => f.startsWith(baseFilter));
    }

    const backupDetails = matchedFiles.map(f => {
      const fullPath = path.join(BACKUP_DIR, f);
      const stat = fs.statSync(fullPath);
      return {
        filename: f,
        fullPath: fullPath,
        sizeBytes: stat.size,
        createdAt: stat.birthtime || stat.mtime
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { success: true, backups: backupDetails };
  } catch (err) {
    return { success: false, error: err.message, backups: [] };
  }
});

// 4. Restore a Backup file
ipcMain.handle('restore-backup', async (event, backupFilename) => {
  try {
    const cleanBackupName = path.basename(backupFilename);
    const backupPath = path.join(BACKUP_DIR, cleanBackupName);

    if (!fs.existsSync(backupPath)) {
      return { success: false, error: 'Backup file does not exist' };
    }

    // Determine target file from backup filename (e.g. services-2026-08-08... -> services.json)
    const originalBaseName = cleanBackupName.split('-')[0];
    const targetPath = path.join(DATA_DIR, `${originalBaseName}.json`);

    const backupContent = fs.readFileSync(backupPath, 'utf-8');
    // Verify JSON validity
    JSON.parse(backupContent);

    fs.writeFileSync(targetPath, backupContent, 'utf-8');
    return { success: true, message: `Successfully restored ${originalBaseName}.json from backup` };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// 5. Media Manager: List images, icons, and PDFs
ipcMain.handle('list-media', async () => {
  try {
    const listDir = (dir, type) => {
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir).map(f => {
        const fullPath = path.join(dir, f);
        const stat = fs.statSync(fullPath);
        return {
          name: f,
          type: type,
          relPath: `assets/${type}/${f}`,
          sizeBytes: stat.size,
          updatedAt: stat.mtime
        };
      });
    };

    const images = listDir(IMAGES_DIR, 'images');
    const icons = listDir(ICONS_DIR, 'icons');
    return { success: true, media: [...images, ...icons] };
  } catch (err) {
    return { success: false, error: err.message, media: [] };
  }
});

// 6. Media Manager: Upload / Import a file
ipcMain.handle('upload-media', async (event, targetFolder = 'images') => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select Media File to Import',
      properties: ['openFile'],
      filters: [
        { name: 'Media & Documents', extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'pdf', 'ico'] }
      ]
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, canceled: true };
    }

    const sourcePath = result.filePaths[0];
    const fileName = path.basename(sourcePath);
    const destDir = targetFolder === 'icons' ? ICONS_DIR : IMAGES_DIR;
    const destPath = path.join(destDir, fileName);

    fs.copyFileSync(sourcePath, destPath);

    return {
      success: true,
      fileName: fileName,
      relPath: `assets/${targetFolder}/${fileName}`,
      fullPath: destPath
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// 7. Calculate Global Dashboard Stats
ipcMain.handle('get-app-stats', async () => {
  try {
    const stats = {
      categories: 0,
      services: 0,
      schemes: 0,
      jobs: 0,
      education: 0,
      emergency: 0,
      faqs: 0,
      backups: 0,
      media: 0
    };

    const readLen = (f) => {
      const p = path.join(DATA_DIR, f);
      if (!fs.existsSync(p)) return 0;
      try {
        const obj = JSON.parse(fs.readFileSync(p, 'utf-8'));
        if (Array.isArray(obj)) return obj.length;
        if (typeof obj === 'object' && obj !== null) return Object.keys(obj).length;
        return 0;
      } catch { return 0; }
    };

    stats.categories = readLen('categories.json');
    stats.services = readLen('services.json') || readLen('guides.json');
    stats.schemes = readLen('schemes.json');
    stats.jobs = readLen('jobs.json');
    stats.education = readLen('education.json');
    stats.emergency = readLen('emergency.json');
    stats.faqs = readLen('faqs.json');

    if (fs.existsSync(BACKUP_DIR)) {
      stats.backups = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith('.json')).length;
    }

    let mediaCount = 0;
    if (fs.existsSync(IMAGES_DIR)) mediaCount += fs.readdirSync(IMAGES_DIR).length;
    if (fs.existsSync(ICONS_DIR)) mediaCount += fs.readdirSync(ICONS_DIR).length;
    stats.media = mediaCount;

    return { success: true, stats: stats };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// 8. Open external links in default OS browser
ipcMain.handle('open-external', async (event, url) => {
  if (url) {
    shell.openExternal(url);
    return { success: true };
  }
  return { success: false };
});
