@echo off
echo =======================================================
echo   Ветеран-Майстер: АВТО-ПУБЛІКАЦІЯ (Режим стеження)
echo =======================================================
echo.
echo Цей скрипт стежить за файлом 'products.js'.
echo Як тільки ви зберігаєте зміни в браузері, сайт оновлюється сам.
echo.
echo [STATUS] Чекаю на зміни... (Не закривайте це вікно!)
echo.

powershell -Command "$file = 'products.js'; $lastWrite = (Get-Item $file).LastWriteTime; while ($true) { $curr = (Get-Item $file).LastWriteTime; if ($curr -ne $lastWrite) { Write-Host '[!] Зміни виявлено! Публікую...'; $lastWrite = $curr; git add .; git commit -m 'Auto-update content'; git push origin main; Write-Host '[OK] Сайт оновлено! Чекаю далі...'; } Start-Sleep -Seconds 2 }"
