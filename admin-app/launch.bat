@echo off
title AP Citizen Hub - Admin Launcher
cd /d "%~dp0"

echo =========================================================
echo    AP CITIZEN HUB - DESKTOP ADMIN LAUNCHER (ELECTRON)
echo =========================================================
echo Checking dependencies...

if not exist "node_modules" (
    echo Installing lightweight dependencies...
    call npm install
)

echo Launching Desktop Application...
call npx electron .
exit
