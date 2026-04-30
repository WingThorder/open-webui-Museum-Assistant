@echo off
set CORS_ALLOW_ORIGIN=http://muse-ar.ddns.net:5173;http://muse-ar.ddns.net:8080;http://192.168.0.119:5173;http://10.89.59.59:5173;http://192.168.0.176:5173;http://muse-ar.online;http://muse-ar.ddns.net:5173;http://muse-ar.ddns.net:5174
if "%PORT%"=="" set PORT=8080
uvicorn open_webui.main:app --port %PORT% --host 0.0.0.0 --forwarded-allow-ips '*' --reload