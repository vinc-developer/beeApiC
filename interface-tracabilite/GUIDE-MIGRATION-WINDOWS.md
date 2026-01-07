# 🪟 Guide de Migration Next.js pour Windows

## 🎯 3 Options pour Windows

### ✅ Option 1 : Script BAT (Le Plus Simple)
**Fichier :** `migrate-to-nextjs.bat`

**Avantages :**
- Double-clic pour lancer
- Pas besoin de PowerShell
- Fonctionne sur tous les Windows

**Utilisation :**
1. Double-cliquer sur `migrate-to-nextjs.bat`
2. Attendre la fin de l'exécution
3. Suivre les instructions affichées

---

### ✅ Option 2 : Script PowerShell (Recommandé)
**Fichier :** `migrate-to-nextjs.ps1`

**Avantages :**
- Plus de contrôle
- Meilleure gestion d'erreurs
- Messages colorés

**Utilisation :**
```powershell
# Méthode 1 : Clic droit > Exécuter avec PowerShell

# Méthode 2 : En ligne de commande
powershell -ExecutionPolicy Bypass -File migrate-to-nextjs.ps1
```

---

### ✅ Option 3 : Commandes Manuelles
**Pour un contrôle total**

#### Étape 1 : Ouvrir PowerShell ou CMD
```
Win + R → Taper "powershell" → Entrée
```

#### Étape 2 : Naviguer vers le dossier
```powershell
cd C:\Users\vincolas\Applis\Projets\beeApiC\interface-tracabilite
```

#### Étape 3 : Créer le projet Next.js
```powershell
npx create-next-app@latest bee-apic-nextjs --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Répondre aux questions :**
- Would you like to use TypeScript? → **Yes**
- Would you like to use ESLint? → **Yes**
- Would you like to use Tailwind CSS? → **Yes**
- Would you like to use `src/` directory? → **No**
- Would you like to use App Router? → **Yes**
- Would you like to customize the default import alias? → **No** (ou Yes si @/*)

#### Étape 4 : Entrer dans le projet
```powershell
cd bee-apic-nextjs
```

#### Étape 5 : Créer la structure
```powershell
# Créer tous les dossiers
$dirs = @(
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

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Write-Host "Structure creee !" -ForegroundColor Green
```

#### Étape 6 : Copier les données
```powershell
# Copier data
Copy-Item -Path "..\data" -Destination ".\data" -Recurse -Force

# Copier images
Copy-Item -Path "..\images" -Destination ".\public\images" -Recurse -Force

Write-Host "Donnees copiees !" -ForegroundColor Green
```

#### Étape 7 : Installer les dépendances
```powershell
npm install
```

#### Étape 8 : Lancer le serveur
```powershell
npm run dev
```

Ouvrir http://localhost:3000

---

## 🔧 Dépannage Windows

### Erreur : "npx n'est pas reconnu"

**Cause :** Node.js n'est pas installé ou pas dans le PATH

**Solution :**
1. Télécharger Node.js depuis https://nodejs.org/
2. Installer la version LTS (recommandée)
3. Redémarrer PowerShell/CMD
4. Vérifier : `node --version`

### Erreur : "Impossible d'exécuter des scripts"

**Cause :** Politique d'exécution PowerShell restrictive

**Solution :**
```powershell
# Temporaire (session actuelle seulement)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Puis relancer le script
.\migrate-to-nextjs.ps1
```

**Ou utiliser :**
```powershell
powershell -ExecutionPolicy Bypass -File migrate-to-nextjs.ps1
```

### Erreur : "Les crochets [ ] posent problème"

**Cause :** Caractères spéciaux dans les noms de dossiers

**Solution :** C'est normal ! Next.js utilise les crochets pour les routes dynamiques. Les dossiers seront créés correctement.

### Erreur lors de la copie des fichiers

**Cause :** Chemins relatifs incorrects

**Solution :**
```powershell
# Vérifier où vous êtes
Get-Location

# Vérifier que les dossiers source existent
Test-Path ..\data
Test-Path ..\images

# Copier avec chemins absolus si besoin
Copy-Item -Path "C:\Users\vincolas\Applis\Projets\beeApiC\interface-tracabilite\data" -Destination ".\data" -Recurse -Force
```

---

## 📋 Checklist Windows

### Avant de commencer :
- [ ] Node.js installé (version 18+)
- [ ] npm disponible
- [ ] Connexion internet active
- [ ] Espace disque suffisant (~500 MB)

### Pendant la migration :
- [ ] Script lancé sans erreur
- [ ] Projet `bee-apic-nextjs` créé
- [ ] Structure de dossiers visible
- [ ] Données copiées dans `data/`
- [ ] Images copiées dans `public/images/`

### Après la migration :
- [ ] `npm install` exécuté
- [ ] Dépendances installées
- [ ] `npm run dev` lancé
- [ ] Serveur démarré sur port 3000
- [ ] Page accessible sur http://localhost:3000

---

## 🚀 Commande Tout-en-Un (PowerShell)

**Une seule commande pour tout faire :**

```powershell
npx create-next-app@latest bee-apic-nextjs --typescript --tailwind --app --no-src-dir --import-alias "@/*"; if ($?) { cd bee-apic-nextjs; $dirs = @("app\tracabilite\[lotNumber]","app\apiculteur\[code]","app\a-propos","app\api\lots","app\api\apiculteurs","components\layout","components\tracabilite","components\apiculteur","components\ui","lib\api","lib\utils","lib\hooks","types","public\icons","styles","config","docs"); foreach ($dir in $dirs) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }; Copy-Item -Path "..\data" -Destination ".\data" -Recurse -Force; Copy-Item -Path "..\images" -Destination ".\public\images" -Recurse -Force; npm install; Write-Host "Migration terminee !" -ForegroundColor Green }
```

---

## 📁 Vérification Rapide

Après la migration, vérifier que tout est en place :

```powershell
# Vérifier la structure
Get-ChildItem

# Vérifier les données
Get-ChildItem data
Get-ChildItem public\images

# Vérifier package.json
Get-Content package.json

# Lancer le serveur
npm run dev
```

---

## ✅ Résumé pour Windows

### Méthode Recommandée :
1. **Double-cliquer** sur `migrate-to-nextjs.bat`
2. **Attendre** la fin (peut prendre 5-10 minutes)
3. **Ouvrir PowerShell** dans le dossier `bee-apic-nextjs`
4. **Lancer** : `npm run dev`

### Alternative PowerShell :
```powershell
powershell -ExecutionPolicy Bypass -File migrate-to-nextjs.ps1
```

### Alternative Manuelle :
Suivre les étapes 1-8 ci-dessus

---

**Date** : 2026-01-07  
**Windows Ready !** 🪟🚀

🐝 **Bonne migration sur Windows !** 🍯

