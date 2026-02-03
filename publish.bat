@echo off
echo ===================================================
echo   Ветеран-Майстер: Публікація змін на сайт
echo ===================================================
echo.
echo 1. Перевірка змін...
git status
echo.
echo 2. Додавання файлів...
git add products.js
git add *.png
git add *.jpg
git add *.glb
echo.
echo 3. Збереження версії...
git commit -m "Auto-update via Admin Mode"
echo.
echo 4. Відправка на сервер (Render.com)...
git push origin main
echo.
echo ===================================================
echo   ГОТОВО! Сайт оновиться протягом 1-2 хвилин.
echo ===================================================
pause
