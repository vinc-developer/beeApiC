# Script de nettoyage de la documentation
# Supprime les fichiers obsoletes apres consolidation

Write-Host "Nettoyage de la documentation Bee Api'C" -ForegroundColor Yellow
Write-Host ""

# Liste des fichiers a supprimer
$filesToDelete = @(
    "CHANGELOG-V3.6.md",
    "CHANGELOG-V3.6.1.md",
    "CHANGELOG-V3.6.2.md",
    "CHANGELOG-V3.6.3.md",
    "CHANGELOG-V3.6.4.md",
    "README-V3.6.md",
    "QUICKSTART-V3.6.md",
    "TEST-MASQUAGE-SECTION.md",
    "AMELIORATIONS-V3.5.md",
    "IMPLEMENTATION.md",
    "ICONES-RESEAUX-SOCIAUX.md",
    "SITE-WEB-APICULTEUR.md",
    "STRUCTURE-MAISON-MERE.md",
    "CHANGELOG-APICULTEURS.md"
)

# Fichiers a evaluer manuellement
$filesToReview = @(
    "GUIDE-APICULTEURS.md",
    "GUIDE-NUMEROS-LOTS.md",
    "QUICKSTART.md"
)

Write-Host "Fichiers qui seront supprimes :" -ForegroundColor Cyan
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Write-Host "  - $file" -ForegroundColor Red
    } else {
        Write-Host "  - $file (deja absent)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Fichiers a evaluer manuellement :" -ForegroundColor Yellow
foreach ($file in $filesToReview) {
    if (Test-Path $file) {
        Write-Host "  - $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Nouveaux fichiers principaux :" -ForegroundColor Green
$newFiles = @("README.md", "CHANGELOG.md", "GUIDE-UTILISATEUR.md", "GUIDE-DEVELOPPEUR.md", "INDEX-DOCUMENTATION.md")
foreach ($file in $newFiles) {
    if (Test-Path $file) {
        Write-Host "  + $file" -ForegroundColor Green
    } else {
        Write-Host "  + $file (MANQUANT !)" -ForegroundColor Red
    }
}

Write-Host ""
$response = Read-Host "Voulez-vous supprimer les fichiers obsoletes ? (O/N)"

if ($response -eq "O" -or $response -eq "o") {
    Write-Host ""
    Write-Host "Suppression en cours..." -ForegroundColor Yellow

    $deletedCount = 0
    $notFoundCount = 0

    foreach ($file in $filesToDelete) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "  Supprime : $file" -ForegroundColor Green
            $deletedCount++
        } else {
            Write-Host "  Absent : $file" -ForegroundColor DarkGray
            $notFoundCount++
        }
    }

    Write-Host ""
    Write-Host "Nettoyage termine !" -ForegroundColor Green
    Write-Host "  Fichiers supprimes : $deletedCount" -ForegroundColor Cyan
    Write-Host "  Fichiers deja absents : $notFoundCount" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "N'oubliez pas d'evaluer manuellement :" -ForegroundColor Yellow
    foreach ($file in $filesToReview) {
        if (Test-Path $file) {
            Write-Host "  - $file"
        }
    }
} else {
    Write-Host ""
    Write-Host "Nettoyage annule. Aucun fichier supprime." -ForegroundColor Red
    Write-Host "Vous pouvez supprimer manuellement les fichiers listes ci-dessus." -ForegroundColor Gray
}

Write-Host ""
Write-Host "Documentation consolidee en 4 fichiers principaux :" -ForegroundColor Cyan
Write-Host "  1. README.md - Point d'entree" -ForegroundColor White
Write-Host "  2. CHANGELOG.md - Historique complet" -ForegroundColor White
Write-Host "  3. GUIDE-UTILISATEUR.md - Manuel utilisateur" -ForegroundColor White
Write-Host "  4. GUIDE-DEVELOPPEUR.md - Documentation technique" -ForegroundColor White
Write-Host ""
Write-Host "Consultez INDEX-DOCUMENTATION.md pour naviguer" -ForegroundColor Green
Write-Host ""
Write-Host "Don't Panic, Bee Api'C !" -ForegroundColor Yellow

