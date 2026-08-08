Set WshShell = WScript.CreateObject("WScript.Shell")
strDesktop = WshShell.SpecialFolders("Desktop")
strCurrentDir = WshShell.CurrentDirectory

Set oShellLink = WshShell.CreateShortcut(strDesktop & "\AP Citizen Hub - Admin Launcher.lnk")
oShellLink.TargetPath = strCurrentDir & "\launch_admin_app.bat"
oShellLink.WorkingDirectory = strCurrentDir & "\admin-app"
oShellLink.WindowStyle = 1
oShellLink.Description = "AP Citizen Hub - Desktop Admin Launcher (Electron)"
oShellLink.Save

WScript.Echo "Success! 'AP Citizen Hub - Admin Launcher' desktop shortcut created on your Windows Desktop!"
