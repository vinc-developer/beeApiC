# Script d'Initialisation du Projet Next.js Bee Api'C
# Crée toute la structure et les fichiers de base

Write-Host "Initialisation du projet Next.js Bee Api'C" -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

$projectRoot = "C:\Users\vincolas\Applis\Projets\beeApiC\bee-apic-nextjs"

# Créer la structure de dossiers
Write-Host "📁 Création de la structure de dossiers..." -ForegroundColor Yellow

$folders = @(
    "app\tracabilite\`[lotNumber`]",
    "app\apiculteur\`[code`]",
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
    "data",
    "public\images",
    "public\icons",
    "styles",
    "config",
    "docs"
)

foreach ($folder in $folders) {
    $path = Join-Path $projectRoot $folder
    New-Item -ItemType Directory -Path $path -Force | Out-Null
    Write-Host "  ✅ $folder" -ForegroundColor Green
}

Write-Host "`n📦 Création du package.json..." -ForegroundColor Yellow

$packageJson = @'
{
  "name": "bee-apic-nextjs",
  "version": "4.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "14.0.4"
  }
}
'@

$packageJson | Out-File -FilePath (Join-Path $projectRoot "package.json") -Encoding UTF8
Write-Host "package.json créé" -ForegroundColor Green

Write-Host "`n Création des fichiers de configuration..." -ForegroundColor Yellow

# tsconfig.json
$tsconfigJson = @'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@

$tsconfigJson | Out-File -FilePath (Join-Path $projectRoot "tsconfig.json") -Encoding UTF8
Write-Host "  ✅ tsconfig.json créé" -ForegroundColor Green

# next.config.js
$nextConfigJs = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
'@

$nextConfigJs | Out-File -FilePath (Join-Path $projectRoot "next.config.js") -Encoding UTF8
Write-Host "  ✅ next.config.js créé" -ForegroundColor Green

# tailwind.config.js
$tailwindConfigJs = @'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7e7',
          500: '#f9bd28',
          600: '#f8b724',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
    },
  },
  plugins: [],
};
'@

$tailwindConfigJs | Out-File -FilePath (Join-Path $projectRoot "tailwind.config.js") -Encoding UTF8
Write-Host "  ✅ tailwind.config.js créé" -ForegroundColor Green

# .gitignore
$gitignore = @'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
'@

$gitignore | Out-File -FilePath (Join-Path $projectRoot ".gitignore") -Encoding UTF8
Write-Host "  .gitignore créé" -ForegroundColor Green

Write-Host "`n Copie des données existantes..." -ForegroundColor Yellow

$oldDataPath = "C:\Users\vincolas\Applis\Projets\beeApiC\interface-tracabilite\data"
$newDataPath = Join-Path $projectRoot "data"

$dataFiles = @("beekeepers.json", "traceability-data.json", "honey-types.json")

foreach ($file in $dataFiles) {
    $source = Join-Path $oldDataPath $file
    $dest = Join-Path $newDataPath $file
    if (Test-Path $source) {
        Copy-Item $source $dest -Force
        Write-Host "  ✅ $file copié" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  $file non trouvé" -ForegroundColor Yellow
    }
}

Write-Host "`n  Copie des images..." -ForegroundColor Yellow

$oldImagesPath = "C:\Users\vincolas\Applis\Projets\beeApiC\interface-tracabilite\images"
$newImagesPath = Join-Path $projectRoot "public\images"

if (Test-Path $oldImagesPath) {
    Copy-Item "$oldImagesPath\*" $newImagesPath -Recurse -Force
    Write-Host "  ✅ Images copiées" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Dossier images non trouvé" -ForegroundColor Yellow
}


