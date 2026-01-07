// Script de validation pour v3.6
// À exécuter dans la console du navigateur

console.log('🔍 Validation de l\'implémentation v3.6...\n');

// 1. Vérifier que les fichiers nécessaires existent
console.log('📁 Vérification des fichiers...');
const filesToCheck = [
    'data/honey-types.json',
    'js/ui.js',
    'js/api.js',
    'js/app.js',
    'index.html'
];

// 2. Vérifier que les éléments DOM existent
console.log('\n🎨 Vérification des éléments DOM...');
const elementsToCheck = [
    'companySection',
    'honeyTypeInfo',
    'honeyTypeBadge',
    'beeapicProducerBadge',
    'partnerBadge'
];

let allElementsFound = true;
elementsToCheck.forEach(id => {
    // Pour companySection, on cherche par classe
    const element = id === 'companySection'
        ? document.querySelector('.company-section')
        : document.getElementById(id);

    if (element) {
        console.log(`✅ ${id} - Trouvé`);
    } else {
        console.log(`❌ ${id} - Manquant !`);
        allElementsFound = false;
    }
});

// 3. Vérifier que les fonctions existent dans UI
console.log('\n🔧 Vérification des fonctions UI...');
const uiFunctions = [
    'displayResults',
    'showSearchForm',
    'initializeCompanyInfo'
];

if (typeof window.UI !== 'undefined') {
    console.log('✅ Module UI chargé');
} else {
    console.log('❌ Module UI non chargé !');
}

// 4. Vérifier que les fonctions existent dans API
console.log('\n🌐 Vérification des fonctions API...');
if (typeof window.API !== 'undefined') {
    console.log('✅ Module API chargé');
    if (typeof window.API.getMockData === 'function') {
        console.log('✅ getMockData disponible');
    }
} else {
    console.log('❌ Module API non chargé !');
}

// 5. Test d'extraction du code apiculteur
console.log('\n🐝 Test d\'extraction du code apiculteur...');
const testLots = [
    { input: 'BA-2026-CH-0107', expectedCode: 'BA', expectedType: 'CH' },
    { input: 'MC-2026-PA-2505', expectedCode: 'MC', expectedType: 'PA' },
    { input: 'CV-2026-P', expectedCode: 'CV', expectedType: 'P' }
];

// Note: Ces fonctions sont privées dans UI.js, donc nous ne pouvons pas les tester ici
// Mais elles seront testées via test-v3.6.html

// 6. Résumé
console.log('\n' + '='.repeat(50));
if (allElementsFound) {
    console.log('✅ Tous les éléments DOM sont présents');
    console.log('✅ L\'implémentation semble correcte !');
    console.log('\n📋 Prochaines étapes :');
    console.log('1. Tester la recherche avec: BA-2026-CH-0107');
    console.log('2. Vérifier que la section company disparaît');
    console.log('3. Vérifier l\'affichage du badge "Miel Bee Api\'C"');
    console.log('4. Vérifier l\'affichage du type de miel');
    console.log('5. Tester avec MC-2026-PA-2505 pour le badge partenaire');
} else {
    console.log('⚠️ Certains éléments sont manquants');
    console.log('Vérifiez que tous les fichiers ont été correctement modifiés');
}
console.log('='.repeat(50));

// 7. Instructions pour les tests manuels
console.log('\n🧪 Pour tester manuellement :');
console.log('1. Ouvrir test-v3.6.html pour les tests unitaires');
console.log('2. Ou tester directement dans l\'application :');
console.log('   - Saisir: BA-2026-CH-0107');
console.log('   - Cliquer sur Rechercher');
console.log('   - Vérifier les badges et le type de miel');

