@echo off
REM Script de Migration vers Next.js - Bee Api'C
REM Compatible Windows

echo ==================================
echo Migration vers Next.js - Bee Api'C
echo ==================================
echo.

REM Variables
set PROJECT_ROOT=bee-apic-nextjs
set OLD_PROJECT=.

REM Créer le projet Next.js
echo Creation du projet Next.js...
call npx create-next-app@latest %PROJECT_ROOT% --typescript --tailwind --app --no-src-dir --import-alias "@/*"

if errorlevel 1 (
    echo Erreur lors de la creation du projet
    pause
    exit /b 1
)

REM Naviguer dans le projet
cd %PROJECT_ROOT%

echo.
echo Creation de la structure de dossiers...

REM Créer la structure
mkdir app\tracabilite\[lotNumber] 2>nul
mkdir app\apiculteur\[code] 2>nul
mkdir app\a-propos 2>nul
mkdir app\api\lots 2>nul
mkdir app\api\apiculteurs 2>nul
mkdir components\layout 2>nul
mkdir components\tracabilite 2>nul
mkdir components\apiculteur 2>nul
mkdir components\ui 2>nul
mkdir lib\api 2>nul
mkdir lib\utils 2>nul
mkdir lib\hooks 2>nul
mkdir types 2>nul
mkdir public\icons 2>nul
mkdir styles 2>nul
mkdir config 2>nul
mkdir docs 2>nul

echo Structure creee avec succes

echo.
echo Copie des donnees existantes...

REM Copier les données
if exist "%OLD_PROJECT%\data" (
    xcopy /E /I /Y "%OLD_PROJECT%\data" "data"
    echo Donnees copiees
) else (
    echo Dossier data non trouve
)

REM Copier les images
if exist "%OLD_PROJECT%\images" (
    xcopy /E /I /Y "%OLD_PROJECT%\images" "public\images"
    echo Images copiees
) else (
    echo Dossier images non trouve
)

echo.
echo Migration terminee !
echo.
echo Prochaines etapes :
echo   1. cd %PROJECT_ROOT%
echo   2. npm install
echo   3. npm run dev
echo.
echo Bee Api'C - Projet Next.js pret !
echo.
pause

