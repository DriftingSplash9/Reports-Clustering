@echo off
cd /d "%~dp0"
title Economic Report Influence Graph
echo ==================================================
echo   Economic Report Influence Graph - setup and run
echo ==================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js does not appear to be installed.
  echo.
  echo Install it from https://nodejs.org - take the "LTS" version,
  echo accept all the defaults, then run this file again.
  echo.
  pause
  exit /b 1
)

echo Node.js found:
node --version
echo.

if exist node_modules (
  echo Removing the leftover node_modules folder...
  rmdir /s /q node_modules
  echo Done.
  echo.
)
if exist package-lock.json del /q package-lock.json

echo Installing dependencies. This takes a couple of minutes.
echo.
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo ================================================
  echo  Install failed. Take a screenshot of this window.
  echo ================================================
  pause
  exit /b 1
)

echo.
echo Checking the seed data...
echo.
call npm run validate

echo.
echo ==================================================
echo   Starting the graph - your browser should open.
echo   Leave this window open. Close it to stop.
echo ==================================================
echo.
call npm run dev
pause
