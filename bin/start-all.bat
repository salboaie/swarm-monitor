@echo off

rem //set working directory
pushd %~dp0..\

rem //set SWARM_PATH env variable
SET SWARM_PATH=%CD%\server

rem //start Core 
start "Core.js" cmd /c node %CD%\..\SwarmCore\etc\adapters\Core.js

timeout 2

rem //start Launcher 
start "Launcher.js" cmd /c node %CD%\..\SwarmCore\etc\adapters\Launcher.js

timeout 5

rem //start web server 
npm start