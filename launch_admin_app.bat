@echo off
title AP Citizen Hub - Admin Launcher
cd /d "%~dp0admin-app"

echo =========================================================
echo    AP CITIZEN HUB - DESKTOP ADMIN LAUNCHER (ELECTRON)
echo =========================================================
echo Launching your Desktop Admin App...

if not exist "node_modules" (
    echo First-time launch: installing Electron...
    call npm install
)

call npx electron .
exit
