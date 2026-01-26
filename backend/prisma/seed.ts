import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Données des apiculteurs
const beekeepersData = {
  BA: {
    code: 'BA',
    useProxy: false,
    type: 'Apiculteur Récoltant',
    partnerSince: '',
    firstName: 'Vincent',
    lastName: 'Colas',
    commercialName: "Bee Api'C",
    address: '14 la Thibaudière\n44680 Saint-Hilaire-de-Chaléons - France',
    email: 'bee.apic.pro@gmail.com',
    phone: '+33 6 28 51 19 05',
    website: 'https://bee-apic.com/',
    webshop: 'https://bee-apic.sumupstore.com/',
    siret: '910 020 346 00029',
    photo: 'vincent-colas/vincent-colas.jpg',
    logo: 'bee-apic/logo-bee-apic.png',
    bio: "Passionné par la nature et le vivant depuis tout petit, j'ai découvert l'apiculture grâce à mon frère, avant de me lancer avec mes propres ruches en Pays de Retz.\nEngagé auprès des abeilles avec respect et patience, j'installe mes ruches dans des zones soigneusement sélectionnées, préservées des cultures intensives.\nMon approche repose sur l'observation et l'accompagnement des colonies, afin de produire un miel authentique, fidèle aux saisons et aux lieux, dans une démarche de transparence, de traçabilité et de respect de la biodiversité.",
    hivesCount: '',
    location: 'Pays de Retz, Loire-Atlantique, France',
    distance: '25 kms de Nantes et 15 kms de Pornic',
    beekeeperSince: '2022',
    ruchers: ['Saint-Hilaire-de-Chaléons', 'Saint-Léger-les-Vignes', 'Port-Saint-Père', 'Villeneuve-en-Retz'],
    gallery: [
      'vincent-colas/apiculteur.jpeg',
      'vincent-colas/carte-visite.jpg',
      'vincent-colas/chasse-frelon-asiatique.jpg',
      'vincent-colas/ecole.jpg',
    ],
    socialMedia: {
      instagram: 'https://www.instagram.com/bee.api.c/',
      facebook: 'https://www.facebook.com/profile.php?id=61572010006092',
      tiktok: 'https://www.tiktok.com/@bee.apic',
      youtube: '',
      linkedin: 'https://www.linkedin.com/company/bee-apic',
    },
  },
  MC: {
    code: 'MC',
    useProxy: false,
    type: 'Apiculteur Récoltant',
    partnerSince: '2025',
    firstName: 'Matthieu',
    lastName: 'Colas',
    commercialName: "L'abeille Guérinoise",
    address: '44530 Guenrouet - France',
    email: '',
    phone: '+33 6 15 62 47 59',
    website: 'https://www.facebook.com/profile.php?id=61583781035864',
    webshop: '',
    siret: '',
    photo: 'matthieu-colas/matthieu-colas-profil.jpg',
    logo: 'matthieu-colas/logo.jpg',
    bio: '',
    hivesCount: '',
    location: 'Pays de Nantes, Loire-Atlantique, France',
    distance: '45 kms de Nantes et 15 kms de Redon',
    beekeeperSince: '2020',
    ruchers: ['Guenrouet', 'Campbon', 'Cordemais'],
    gallery: [
      'matthieu-colas/ruche-matthieu.jpg',
      'matthieu-colas/rucher-matthieu.jpg',
      'matthieu-colas/matthieu-picking.jpg',
    ],
    socialMedia: {
      instagram: 'https://www.instagram.com/el_matioso/',
      facebook: 'https://www.facebook.com/profile.php?id=61583781035864',
      tiktok: 'https://www.tiktok.com/@jesappellegroot212',
      youtube: '',
      linkedin: '',
    },
  },
  NG: {
    code: 'NG',
    useProxy: false,
    type: 'Apiculteur Récoltant',
    partnerSince: '2025',
    firstName: 'Nicolas',
    lastName: 'Grouls',
    commercialName: 'Bees To Be',
    address: '44210 Nantes - France',
    email: 'nicolas@beestobe.fr',
    phone: '+33 6 09 58 10 60',
    website: 'https://beestobe.fr/',
    webshop: '',
    siret: '979350535',
    photo: 'nicolas-grouls/nicolas.jpeg',
    logo: 'nicolas-grouls/B2B.png',
    bio: "Passionné par l'apiculture depuis mon enfance, je suis fasciné par l'élevage et la préservation des abeilles. J'ai finalement décidé en 2023 de me lancer pleinement sur cette activité, pour communiquer au plus grand nombre l'importance des abeilles dans notre écosystème. Engagé dans une démarche d'apiculture responsable, et respectueuse de l'environnement, je respect la charte de l'agriculture biologique. Mes ruchers sont situés en Pays de Retz, dans des zones natura 2000 ou chez des exploitants en agriculture biologique.",
    hivesCount: '',
    location: 'Pays de Retz, Loire-Atlantique, France',
    distance: '25 kms de Nantes',
    beekeeperSince: '2022',
    ruchers: ['Saint-Mars-de-Coutais', 'Brains', 'Bouaye'],
    gallery: [],
    socialMedia: {
      instagram: 'https://www.instagram.com/bees.to.be',
      facebook: 'https://www.facebook.com/profile.php?id=61576143175322',
      tiktok: '',
      youtube: 'https://www.youtube.com/@beestobe',
      linkedin: 'https://www.linkedin.com/company/beestobe/',
    },
  },
};

// Données des types de miel
const honeyTypesData = {
  P: { code: 'P', name: 'Miel de Printemps', description: 'Récolte de printemps, fleurs variées' },
  PA: { code: 'PA', name: "Miel d'Acacia", description: 'Miel doux et clair' },
  CH: { code: 'CH', name: 'Miel de Châtaignier', description: 'Miel corsé au goût prononcé' },
  E: { code: 'E', name: "Miel d'Été", description: "Récolte d'été, fleurs de saison" },
  F: { code: 'F', name: 'Miel de Forêt', description: 'Miel de miellat aux notes boisées' },
  S: { code: 'S', name: 'Miel de Sapin', description: 'Miel puisant au goût légèrement amère' },
  TF: { code: 'TF', name: 'Miel Toutes Fleurs', description: 'Mélange harmonieux de fleurs variées' },
};

// Données des produits
const productsData = [
  {
    slug: 'bougie-cire-abeille-100g',
    name: "Bougie 100% Cire d'abeille",
    description:
      "Cette bougie est fabriquée à la main à partir de cire d'opercule – la cire la plus fine et la plus pure, récoltée lors de l'extraction du miel de nos ruches familiales des Pays de Retz.",
    price: 8,
    image: 'products/bougie.png',
    category: 'bougie',
    weight: '100g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/bougie-100-cire-d-abeille',
  },
  {
    slug: 'hydromel-sec-50cl',
    name: 'Hydromel Sec 50cl – 11,5° – Vieilli en Fût de Chêne',
    description:
      "Découvrez notre hydromel sec artisanal à 11,5° d'alcool, élaboré avec notre miel d'été local, puis vieilli patiemment en fût de chêne pour développer des arômes complexes et une richesse en bouche exceptionnelle.",
    price: 10,
    image: 'products/hydromel.png',
    category: 'hydromel',
    weight: '75cl',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/hydromel-sec-50cl-11-50-vieilli-en-fut-de-chene',
  },
  {
    slug: 'coffret-cadeau-2-miels-1-bougie',
    name: 'Coffret Cadeau - 2 miels - 1 bougie',
    description:
      "Coffret Cadeau de Noël - Coffret de miel local\n\n2 pots de 250g de miel des Pays de Retz\n\n1 cuillère à miel\n\n1 bougie à la cire d'abeilles ",
    price: 21,
    image: 'products/coffret-2miels-1bougie.png',
    category: 'coffret',
    weight: '2x250g + 100g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/coffret-cadeau-2-miels-1-bougie',
  },
  {
    slug: 'coffret-cadeau-3-miels',
    name: 'Coffret Cadeau - 3 miels',
    description:
      'CCoffret Cadeau de Noël - Coffret de miel local\n\n3 pots de 250g de miel des Pays de Retz\n\n1 cuillère à miel',
    price: 21,
    image: 'products/coffret-3miels.png',
    category: 'coffret',
    weight: '3x250g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/coffret-cadeau-3-miels',
  },
  {
    slug: 'pain-d-epices-artisanal-pur-miel-220g',
    name: "Pain d'Épices Artisanal Pur Miel - 220g",
    description:
      'Laissez-vous séduire par notre pain d\'épices fait maison, riche en saveurs authentiques et en douceur naturelle. Conçu avec 50 % de miel pur.',
    price: 6,
    image: 'products/pain-epice.png',
    category: 'miel',
    weight: '220g',
    inStock: false,
    storeUrl: 'https://bee-apic.sumupstore.com/product/pain-d-epices-artisanal-pur-miel-220g',
  },
  {
    slug: 'miel-acacia-500g',
    name: "Miel d'Acacia - 500g",
    description:
      "Ce miel clair et fluide présente une dominante d'acacia, reconnue pour sa saveur douce, florale et peu sucrée, idéale pour les enfants et les palais sensibles.",
    price: 8,
    image: 'products/acacia.png',
    category: 'miel',
    weight: '500g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/miel-d-acacia-500g-1',
  },
  {
    slug: 'miel-foret-250g',
    name: 'Miel de Forêt - Châtaignier 250g',
    description:
      'Ce miel rare, à la robe sombre et aux arômes boisés, présente une dominante marquée de châtaignier',
    price: 5,
    image: 'products/foret.png',
    category: 'miel',
    weight: '250g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/miel-de-foret-chataignier-250g-1',
  },
  {
    slug: 'miel-toutes-fleurs-500g',
    name: "Miel d'été toutes fleurs 500g",
    description:
      "Entièrement cristallisé, il témoigne de sa pureté et de son origine naturelle, sans aucun chauffage ni traitement. Sa texture fine et fondante rappelle les miels d'antan — authentiques, naturels et riches en caractère.",
    price: 8,
    image: 'products/toutes-fleurs.png',
    category: 'miel',
    weight: '500g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/miel-d-ete-toutes-fleurs-500g',
  },
  {
    slug: 'miel-printemps-500g',
    name: 'Miel de Printemps - 500g',
    description: 'Ce miel est apprécié pour sa douceur florale et ses notes fruitées',
    price: 8,
    image: 'products/printemps.png',
    category: 'miel',
    weight: '500g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/miel-de-printemps-500g',
  },
  {
    slug: 'miel-ete-250g',
    name: "Miel d'Été - 250g",
    description:
      'Ce miel offre une palette aromatique généreuse, avec une douceur équilibrée et des notes florales et fruitées',
    price: 5,
    image: 'products/ete.png',
    category: 'miel',
    weight: '250g',
    inStock: true,
    storeUrl: 'https://bee-apic.sumupstore.com/product/miel-d-ete-250g-1',
  },
];

// Données des lots
const lotsData = {
  'BA-250701-CH': {
    lotNumber: 'BA-250701-CH',
    beekeeperCode: 'BA',
    honeyTypeCode: 'CH',
    humidity: '17.5',
    zones: [
      {
        lieuxRucher: 'Saint-Léger-les-Vignes',
        environnement:
          'Nos ruches sont situées dans un environnement préservé, entouré de forêts de châtaigniers, de prairies fleuries et de cultures biologiques. La diversité florale de cette région offre un miel aux saveurs uniques et authentiques.',
      },
    ],
    production: {
      datesRecolte: ['2025-06-10', '2025-06-17', '2025-06-25'],
      datesExtractions: ['2025-07-15', '2025-07-22'],
      datesConditionnement: ['2025-08-20'],
    },
  },
  'MC-250715-PA': {
    lotNumber: 'MC-250715-PA',
    beekeeperCode: 'MC',
    honeyTypeCode: 'PA',
    humidity: '17',
    zones: [
      { lieuxRucher: 'Guenrouet', environnement: 'Forêts de châtaigniers' },
      { lieuxRucher: 'Campbon', environnement: 'Prairies fleuries' },
      { lieuxRucher: 'Malville', environnement: 'Marais' },
    ],
    production: {
      datesRecolte: ['2025-06-10', '2025-06-17', '2025-06-25'],
      datesExtractions: ['2025-07-15', '2025-07-22'],
      datesConditionnement: [],
    },
  },
};

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer la base de données
  console.log('🗑️  Nettoyage de la base de données...');
  await prisma.lotProduction.deleteMany();
  await prisma.lotZone.deleteMany();
  await prisma.lot.deleteMany();
  await prisma.product.deleteMany();
  await prisma.honeyType.deleteMany();
  await prisma.beekeeperGallery.deleteMany();
  await prisma.socialMedia.deleteMany();
  await prisma.rucher.deleteMany();
  await prisma.beekeeper.deleteMany();

  // Créer les types de miel
  console.log('🍯 Création des types de miel...');
  for (const [code, data] of Object.entries(honeyTypesData)) {
    await prisma.honeyType.create({ data });
    console.log(`   ✓ Type de miel créé: ${code}`);
  }

  // Créer les apiculteurs
  console.log('👨‍🌾 Création des apiculteurs...');
  const beekeeperIds: Record<string, string> = {};
  for (const [code, data] of Object.entries(beekeepersData)) {
    const beekeeper = await prisma.beekeeper.create({
      data: {
        code: data.code,
        useProxy: data.useProxy,
        type: data.type,
        partnerSince: data.partnerSince || null,
        firstName: data.firstName,
        lastName: data.lastName,
        commercialName: data.commercialName,
        address: data.address,
        email: data.email || null,
        phone: data.phone || null,
        website: data.website || null,
        webshop: data.webshop || null,
        siret: data.siret || null,
        photo: data.photo || null,
        logo: data.logo || null,
        bio: data.bio || null,
        hivesCount: data.hivesCount || null,
        location: data.location || null,
        distance: data.distance || null,
        beekeeperSince: data.beekeeperSince || null,
        ruchers: {
          create: data.ruchers.map((name) => ({ name })),
        },
        gallery: {
          create: data.gallery.map((imagePath) => ({ imagePath })),
        },
        socialMedia: {
          create: {
            instagram: data.socialMedia.instagram || null,
            facebook: data.socialMedia.facebook || null,
            tiktok: data.socialMedia.tiktok || null,
            youtube: data.socialMedia.youtube || null,
            linkedin: data.socialMedia.linkedin || null,
          },
        },
      },
    });
    beekeeperIds[code] = beekeeper.id;
    console.log(`   ✓ Apiculteur créé: ${data.commercialName} (${code})`);
  }

  // Créer les produits
  console.log('📦 Création des produits...');
  for (const product of productsData) {
    await prisma.product.create({ data: product });
    console.log(`   ✓ Produit créé: ${product.name}`);
  }

  // Récupérer les IDs des types de miel
  const honeyTypeIds: Record<string, string> = {};
  const honeyTypes = await prisma.honeyType.findMany();
  for (const ht of honeyTypes) {
    honeyTypeIds[ht.code] = ht.id;
  }

  // Créer les lots
  console.log('📋 Création des lots...');
  for (const [lotNumber, data] of Object.entries(lotsData)) {
    await prisma.lot.create({
      data: {
        lotNumber: data.lotNumber,
        humidity: data.humidity,
        beekeeperId: beekeeperIds[data.beekeeperCode],
        honeyTypeId: honeyTypeIds[data.honeyTypeCode] || null,
        zones: {
          create: data.zones,
        },
        production: {
          create: {
            datesRecolte: data.production.datesRecolte,
            datesExtractions: data.production.datesExtractions,
            datesConditionnement: data.production.datesConditionnement,
          },
        },
      },
    });
    console.log(`   ✓ Lot créé: ${lotNumber}`);
  }

  console.log('✅ Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
