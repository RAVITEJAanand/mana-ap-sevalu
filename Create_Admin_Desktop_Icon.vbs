Set WshShell = WScript.CreateObject("WScript.Shell")
strDesktop = WshShell.SpecialFolders("Desktop")
strCurrentDir = WshShell.CurrentDirectory

Set oShellLink = WshShell.CreateShortcut(strDesktop & "\Mana AP Sevalu - Admin Cockpit.lnk")
oShellLink.TargetPath = strCurrentDir & "\launch_admin.bat"
oShellLink.WorkingDirectory = strCurrentDir
oShellLink.WindowStyle = 1
oShellLink.Description = "Mana AP Sevalu - Master Admin Cockpit"
oShellLink.Save

WScript.Echo "Success! 'Mana AP Sevalu - Admin Cockpit' shortcut created on your Windows Desktop!"
