export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#f59e0b' }}>🐝 Bee Api&apos;C - Backend API</h1>
      <p>Bienvenue sur l&apos;API Backend de Bee Api&apos;C.</p>

      <h2>📚 Endpoints disponibles</h2>

      <h3>Apiculteurs</h3>
      <ul>
        <li><code>GET /api/beekeepers</code> - Liste tous les apiculteurs</li>
        <li><code>GET /api/beekeepers/:code</code> - Récupère un apiculteur par son code</li>
        <li><code>POST /api/beekeepers</code> - Crée un nouvel apiculteur</li>
        <li><code>PUT /api/beekeepers/:code</code> - Met à jour un apiculteur</li>
        <li><code>DELETE /api/beekeepers/:code</code> - Supprime un apiculteur</li>
      </ul>

      <h3>Types de Miel</h3>
      <ul>
        <li><code>GET /api/honey-types</code> - Liste tous les types de miel</li>
        <li><code>GET /api/honey-types/:code</code> - Récupère un type de miel par son code</li>
        <li><code>POST /api/honey-types</code> - Crée un nouveau type de miel</li>
        <li><code>PUT /api/honey-types/:code</code> - Met à jour un type de miel</li>
        <li><code>DELETE /api/honey-types/:code</code> - Supprime un type de miel</li>
      </ul>

      <h3>Produits</h3>
      <ul>
        <li><code>GET /api/products</code> - Liste tous les produits</li>
        <li><code>GET /api/products/:slug</code> - Récupère un produit par son slug</li>
        <li><code>GET /api/products/category/:category</code> - Récupère les produits par catégorie</li>
        <li><code>POST /api/products</code> - Crée un nouveau produit</li>
        <li><code>PUT /api/products/:slug</code> - Met à jour un produit</li>
        <li><code>DELETE /api/products/:slug</code> - Supprime un produit</li>
      </ul>

      <h3>Lots / Traçabilité</h3>
      <ul>
        <li><code>GET /api/lots</code> - Liste tous les lots</li>
        <li><code>GET /api/lots/:lotNumber</code> - Récupère un lot par son numéro</li>
        <li><code>POST /api/lots</code> - Crée un nouveau lot</li>
        <li><code>PUT /api/lots/:lotNumber</code> - Met à jour un lot</li>
        <li><code>DELETE /api/lots/:lotNumber</code> - Supprime un lot</li>
        <li><code>GET /api/traceability/:lotNumber</code> - Récupère les données de traçabilité complètes</li>
      </ul>

      <h3>Proxy BeePerf (API externe)</h3>
      <ul>
        <li><code>GET /api/beeperf/numero-lot/:numeroLot</code> - Traçabilité via API BeePerf</li>
        <li><code>GET /api/beeperf/numeros-lots</code> - Liste des numéros de lots BeePerf</li>
      </ul>

      <h2>🔧 Configuration</h2>
      <p>
        Configurez la variable <code>DATABASE_URL</code> dans le fichier <code>.env</code> pour connecter MySQL.
      </p>
      <p>
        Exécutez <code>npm run db:push</code> pour créer les tables, puis <code>npm run db:seed</code> pour peupler la base.
      </p>
    </main>
  );
}
