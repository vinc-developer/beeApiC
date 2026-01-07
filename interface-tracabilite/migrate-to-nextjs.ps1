# Script de Migration vers Next.js - Bee Api'C
# Compatible Windows PowerShell

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Migration vers Next.js - Bee Api'C" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Variables
$ProjectRoot = "bee-apic-nextjs"
$OldProject = "."

# Créer le projet Next.js
Write-Host "Creation du projet Next.js..." -ForegroundColor Yellow
Write-Host "Cette etape peut prendre quelques minutes..." -ForegroundColor Gray
Write-Host ""

try {
    # Créer le projet avec npx
    $process = Start-Process -FilePath "npx" -ArgumentList "create-next-app@latest", $ProjectRoot, "--typescript", "--tailwind", "--app", "--no-src-dir", "--import-alias", "@/*" -NoNewWindow -Wait -PassThru

    if ($process.ExitCode -ne 0) {
        Write-Host "Erreur lors de la creation du projet" -ForegroundColor Red
        exit 1
    }

    Write-Host "Projet cree avec succes !" -ForegroundColor Green
}
catch {
    Write-Host "Erreur : $_" -ForegroundColor Red
    exit 1
}

# Naviguer dans le projet
Set-Location $ProjectRoot

Write-Host ""
Write-Host "Creation de la structure de dossiers..." -ForegroundColor Yellow

# Liste des dossiers à créer
$folders = @(
    "app\tracabilite\[lotNumber]",
    "app\apiculteur\[code]",
    "app\a-propos",
    "app\api\lots",
    "app\api\apiculteurs",
    "components\layout",
    "components\tracabilite",
    "components\apiculteur",
    "components\ui",
    "lib\api",
    "lib\utils",
    "lib\hooks",
    "types",
    "public\icons",
    "styles",
    "config",
    "docs"
)

# Créer chaque dossier
foreach ($folder in $folders) {
    try {
        New-Item -ItemType Directory -Path $folder -Force -ErrorAction Stop | Out-Null
    }
    catch {
        Write-Host "Avertissement : Impossible de creer $folder" -ForegroundColor Yellow
    }
}

Write-Host "Structure creee !" -ForegroundColor Green

Write-Host ""
Write-Host "Copie des donnees existantes..." -ForegroundColor Yellow

# Copier les données
$dataPath = Join-Path ".." "data"
if (Test-Path $dataPath) {
    try {
        Copy-Item -Path $dataPath -Destination ".\data" -Recurse -Force
        Write-Host "Donnees copiees" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur lors de la copie des donnees : $_" -ForegroundColor Red
    }
}
else {
    Write-Host "Dossier data non trouve dans le projet source" -ForegroundColor Yellow
}

# Copier les images
$imagesPath = Join-Path ".." "images"
if (Test-Path $imagesPath) {
    try {
        Copy-Item -Path $imagesPath -Destination ".\public\images" -Recurse -Force
        Write-Host "Images copiees" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur lors de la copie des images : $_" -ForegroundColor Red
    }
}
else {
    Write-Host "Dossier images non trouve dans le projet source" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Migration terminee !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes :" -ForegroundColor Cyan
Write-Host "  1. cd $ProjectRoot" -ForegroundColor White
Write-Host "  2. npm install" -ForegroundColor White
Write-Host "  3. npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Bee Api'C - Projet Next.js pret !" -ForegroundColor Yellow
Write-Host ""

# Retourner au dossier parent
Set-Location ..

Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

