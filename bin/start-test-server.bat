@echo off

rem //set working directory
pushd %~dp0..\

rem //set SWARM_PATH env variable
SET SWARM_PATH=%CD%\server2

rem //start Launcher 
node ..\SwarmCore\etc\adapters\Launcher.js