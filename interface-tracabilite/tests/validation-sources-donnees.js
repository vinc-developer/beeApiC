// Script de validation pour les sources de données
// À exécuter dans la console du navigateur

console.log('🔍 Validation de la gestion des sources de données...\n');

// 1. Vérifier que les fichiers JSON existent
console.log('📁 Vérification des fichiers JSON...');
async function checkJSONFiles() {
    const files = [
        'data/beekeepers.json',
        'data/traceability-data.json',
        'data/honey-types.json'
    ];

    for (const file of files) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                console.log(`✅ ${file} - Accessible`);
                const data = await response.json();
                console.log(`   Structure valide, ${JSON.stringify(data).length} caractères`);
            } else {
                console.log(`❌ ${file} - Erreur ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ ${file} - ${error.message}`);
        }
    }
}

// 2. Vérifier la structure des apiculteurs
console.log('\n👨‍🌾 Vérification de la structure des apiculteurs...');
async function checkBeekeepers() {
    try {
        const response = await fetch('data/beekeepers.json');
        const data = await response.json();

        console.log(`Nombre d'apiculteurs: ${Object.keys(data.beekeepers).length}`);

        Object.entries(data.beekeepers).forEach(([code, beekeeper]) => {
            console.log(`\n🐝 Apiculteur ${code}:`);
            console.log(`   Nom: ${beekeeper.commercialName || beekeeper.firstName + ' ' + beekeeper.lastName}`);
            console.log(`   useProxy: ${beekeeper.useProxy}`);
            console.log(`   Source: ${beekeeper.useProxy ? '📡 API Proxy' : '📄 JSON Local'}`);

            // Vérifier les champs obligatoires
            const requiredFields = ['code', 'type', 'firstName', 'lastName', 'email'];
            const missingFields = requiredFields.filter(field => !beekeeper[field]);

            if (missingFields.length > 0) {
                console.log(`   ⚠️ Champs manquants: ${missingFields.join(', ')}`);
            } else {
                console.log(`   ✅ Tous les champs obligatoires présents`);
            }
        });
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
}

// 3. Vérifier la structure des données de traçabilité
console.log('\n📦 Vérification des données de traçabilité locales...');
async function checkTraceabilityData() {
    try {
        const response = await fetch('data/traceability-data.json');
        const data = await response.json();

        const lotNumbers = Object.keys(data.lots);
        console.log(`Nombre de lots: ${lotNumbers.length}`);

        lotNumbers.forEach(lotNumber => {
            const lot = data.lots[lotNumber];
            console.log(`\n📦 Lot ${lotNumber}:`);

            // Extraire le code apiculteur
            const beekeeperCode = lotNumber.match(/^([A-Z]{2,3})-/)?.[1];
            console.log(`   Code apiculteur: ${beekeeperCode}`);

            // Vérifier les champs obligatoires
            const requiredFields = ['lotNumber', 'zone', 'production'];
            const missingFields = requiredFields.filter(field => !lot[field]);

            if (missingFields.length > 0) {
                console.log(`   ⚠️ Champs manquants: ${missingFields.join(', ')}`);
            } else {
                console.log(`   ✅ Structure valide`);
            }

            // Afficher quelques informations
            if (lot.zone) {
                console.log(`   Zone: ${lot.zone.publicName}`);
            }
            if (lot.production) {
                console.log(`   Dates d'extraction: ${lot.production.extractionDates?.length || 0}`);
                console.log(`   Mise en pot: ${lot.production.bottlingDate}`);
            }
        });
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
}

// 4. Tester la cohérence entre apiculteurs et lots
console.log('\n🔗 Vérification de la cohérence...');
async function checkConsistency() {
    try {
        const beekeepersResponse = await fetch('data/beekeepers.json');
        const beekeepersData = await beekeepersResponse.json();

        const traceabilityResponse = await fetch('data/traceability-data.json');
        const traceabilityData = await traceabilityResponse.json();

        // Pour chaque lot, vérifier que l'apiculteur existe
        Object.keys(traceabilityData.lots).forEach(lotNumber => {
            const beekeeperCode = lotNumber.match(/^([A-Z]{2,3})-/)?.[1];
            const beekeeper = beekeepersData.beekeepers[beekeeperCode];

            if (!beekeeper) {
                console.log(`❌ Lot ${lotNumber}: Apiculteur ${beekeeperCode} non trouvé !`);
            } else if (beekeeper.useProxy) {
                console.log(`⚠️ Lot ${lotNumber}: L'apiculteur ${beekeeperCode} utilise le proxy mais a des données locales`);
            } else {
                console.log(`✅ Lot ${lotNumber}: Cohérent avec apiculteur ${beekeeperCode}`);
            }
        });

        // Pour chaque apiculteur avec useProxy: false, vérifier qu'il a des lots
        Object.entries(beekeepersData.beekeepers).forEach(([code, beekeeper]) => {
            if (!beekeeper.useProxy) {
                const lotsForBeekeeper = Object.keys(traceabilityData.lots).filter(lot =>
                    lot.startsWith(code + '-')
                );

                if (lotsForBeekeeper.length === 0) {
                    console.log(`⚠️ Apiculteur ${code}: useProxy=false mais aucun lot trouvé dans traceability-data.json`);
                } else {
                    console.log(`✅ Apiculteur ${code}: ${lotsForBeekeeper.length} lot(s) trouvé(s)`);
                }
            }
        });
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
    }
}

// 5. Tester l'extraction du code apiculteur
console.log('\n🔤 Test d\'extraction du code apiculteur...');
function testBeekeeperCodeExtraction() {
    const testCases = [
        { input: 'BA-2026-CH-0107', expected: 'BA' },
        { input: 'CV-2026-PA-0501', expected: 'CV' },
        { input: 'MC-2026-TF-1234', expected: 'MC' },
        { input: 'ABC-2026-CH-0001', expected: 'ABC' },
        { input: 'INVALID', expected: null }
    ];

    testCases.forEach(test => {
        const match = test.input.match(/^([A-Z]{2,3})-/);
        const result = match ? match[1] : null;

        if (result === test.expected) {
            console.log(`✅ ${test.input} → ${result}`);
        } else {
            console.log(`❌ ${test.input} → ${result} (attendu: ${test.expected})`);
        }
    });
}

// Exécuter tous les tests
async function runAllTests() {
    await checkJSONFiles();
    await checkBeekeepers();
    await checkTraceabilityData();
    await checkConsistency();
    testBeekeeperCodeExtraction();

    console.log('\n✅ Validation terminée !');
    console.log('\n💡 Pour tester un numéro de lot:');
    console.log('   - BA-2026-CH-0107 (avec proxy)');
    console.log('   - CV-2026-PA-0501 (sans proxy, données JSON)');
    console.log('   - CV-2026-CH-0815 (sans proxy, données JSON)');
}

// Lancer automatiquement
runAllTests();

