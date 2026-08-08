@echo off
cd /d "%~dp0"
title Validate seed data

REM Runs the corpus validator only - does not touch node_modules and does not
REM start the graph. Safe to run any time. If it says node_modules is missing,
REM run setup-and-run.bat once instead (that one reinstalls, which is slow).

if not exist node_modules (
  echo No node_modules folder. Run setup-and-run.bat first.
  echo.
  pause
  exit /b 1
)

echo Running: npm run validate
echo.
call npm run validate
echo.
echo ==================================================
echo   Finished. Errors, if any, are listed above.
echo ==================================================
echo.
pause
