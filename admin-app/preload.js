const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  readJson: (filename) => ipcRenderer.invoke('read-json', filename),
  writeJson: (filename, data) => ipcRenderer.invoke('write-json', filename, data),
  
  // Backup operations
  listBackups: (fileFilter) => ipcRenderer.invoke('list-backups', fileFilter),
  restoreBackup: (backupFilename) => ipcRenderer.invoke('restore-backup', backupFilename),
  
  // Media operations
  listMedia: () => ipcRenderer.invoke('list-media'),
  uploadMedia: (targetFolder) => ipcRenderer.invoke('upload-media', targetFolder),
  
  // Stats and External
  getAppStats: () => ipcRenderer.invoke('get-app-stats'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  // Real-time GitHub Sync
  gitPush: () => ipcRenderer.invoke('git-push')
});
