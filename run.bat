@echo off
cd /d "%~dp0"
title Economic Report Influence Graph

REM Just starts the graph. Use setup-and-run.bat instead if you have moved this
REM folder between machines, or if node_modules is missing or broken — that one
REM wipes and reinstalls, which is slow and only needed after a move.

if not exist node_modules (
  echo No node_modules folder. Run setup-and-run.bat first.
  echo.
  pause
  exit /b 1
)

echo Starting the graph at http://localhost:5173
echo Leave this window open. Close it to stop.
echo.
call npm run dev
pause
