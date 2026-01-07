#!/bin/bash
# Script de Migration vers Next.js - Bee Api'C
# Compatible Linux/Mac/WSL

echo "=================================="
echo "Migration vers Next.js - Bee Api'C"
echo "=================================="
echo ""

# Variables
PROJECT_ROOT="./bee-apic-nextjs"
OLD_PROJECT="../interface-tracabilite"

# Créer le projet Next.js
echo "📦 Création du projet Next.js..."
npx create-next-app@latest $PROJECT_ROOT --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes

# Naviguer dans le projet
cd $PROJECT_ROOT

echo ""
echo "📁 Création de la structure de dossiers..."

# Créer la structure
mkdir -p app/tracabilite/\[lotNumber\]
mkdir -p app/apiculteur/\[code\]
mkdir -p app/a-propos
mkdir -p app/api/lots
mkdir -p app/api/apiculteurs
mkdir -p components/{layout,tracabilite,apiculteur,ui}
mkdir -p lib/{api,utils,hooks}
mkdir -p types
mkdir -p public/icons
mkdir -p styles
mkdir -p config
mkdir -p docs

echo "✅ Structure créée"

echo ""
echo "📋 Copie des données existantes..."

# Copier les données
if [ -d "$OLD_PROJECT/data" ]; then
    cp -r $OLD_PROJECT/data ./
    echo "✅ Données copiées"
else
    echo "⚠️  Dossier data non trouvé"
fi

# Copier les images
if [ -d "$OLD_PROJECT/images" ]; then
    cp -r $OLD_PROJECT/images ./public/
    echo "✅ Images copiées"
else
    echo "⚠️  Dossier images non trouvé"
fi

echo ""
echo "✅ Migration terminée !"
echo ""
echo "📦 Prochaines étapes :"
echo "  1. cd $PROJECT_ROOT"
echo "  2. npm install"
echo "  3. npm run dev"
echo ""
echo "Bee Api'C - Projet Next.js prêt !"

