"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../beekeepers/page.module.css";

interface Product {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  weight?: string;
  inStock: boolean;
  storeUrl?: string;
}

export default function ProductsContent() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:3001/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setProducts(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      loadProducts();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Chargement...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Gestion des Produits</h1>
          <p className={styles.pageSubtitle}>
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/new")}
          className={styles.addButton}
        >
          ➕ Ajouter un produit
        </button>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Rechercher par nom ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
          style={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {searchTerm ? "Aucun produit trouvé" : "Aucun produit enregistré"}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>{product.category || "-"}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>
                    <span style={{ color: product.inStock ? "green" : "red" }}>
                      {product.inStock ? "✓ En stock" : "✗ Rupture"}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => router.push(`/admin/products/${product.id}`)}
                      className={styles.editButton}
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={styles.deleteButton}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

