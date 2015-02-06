@echo off

rem //set working directory
pushd %~dp0..\

rem //set SWARM_PATH env variable
SET SWARM_PATH=%CD%\server

rem //start Core 
node ..\SwarmCore\etc\adapters\Core.js