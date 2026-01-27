# Script de test de l'espace administrateur

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Test de l'espace administrateur" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier que les fichiers existent
$files = @(
    "app\admin\layout.tsx",
    "app\admin\login\page.tsx",
    "app\admin\login\loginClient.tsx",
    "app\admin\login\page.module.css",
    "app\admin\dashboard\page.tsx",
    "app\admin\dashboard\dashboardClient.tsx",
    "app\admin\dashboard\page.module.css",
    "app\admin\beekeepers\page.tsx",
    "app\admin\beekeepers\beekeepersClient.tsx",
    "app\admin\beekeepers\page.module.css",
    "hooks\useAuth.ts"
)

$allFilesExist = $true

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "[OK] $file" -ForegroundColor Green
    } else {
        Write-Host "[ERREUR] $file manquant" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""

if ($allFilesExist) {
    Write-Host "Tous les fichiers sont présents!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour tester l'application:" -ForegroundColor Yellow
    Write-Host "1. Démarrez le backend: cd ..\backend; npm run dev" -ForegroundColor White
    Write-Host "2. Démarrez le frontend: npm run dev" -ForegroundColor White
    Write-Host "3. Accédez à: http://localhost:3000/admin/login" -ForegroundColor White
} else {
    Write-Host "Certains fichiers sont manquants!" -ForegroundColor Red
}
