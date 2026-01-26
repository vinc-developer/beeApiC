import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  console.log('🔐 Création d\'un utilisateur administrateur...');

  const email = 'admin@bee-apic.com';
  const password = 'Admin123!'; // CHANGEZ CE MOT DE PASSE!
  const name = 'Administrateur';

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`⚠️  L'utilisateur ${email} existe déjà.`);
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      },
    });

    console.log('✅ Utilisateur créé avec succès!');
    console.log('');
    console.log('📧 Email:', email);
    console.log('🔑 Mot de passe:', password);
    console.log('');
    console.log('⚠️  IMPORTANT: Changez ce mot de passe après la première connexion!');
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
