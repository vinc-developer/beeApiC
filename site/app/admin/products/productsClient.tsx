"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
}

export default function ProductsClient() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && token) {
      loadProducts();
    }
  }, [authLoading, token]);

  const loadProducts = async () => {
    try {
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

  if (authLoading || loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>🐝 Bee Api&apos;C</h2>
          <p className={styles.sidebarSubtitle}>Administration</p>
        </div>

        <nav className={styles.sidebarNav}>
          <a href="/admin/dashboard" className={styles.navItem}>
            <span className={styles.navIcon}>📊</span>
            Tableau de bord
          </a>
          <a href="/admin/beekeepers" className={styles.navItem}>
            <span className={styles.navIcon}>👨‍🌾</span>
            Apiculteurs
          </a>
          <a href="/admin/honey-types" className={styles.navItem}>
            <span className={styles.navIcon}>🍯</span>
            Types de miel
          </a>
          <a href="/admin/products" className={styles.navItem + " " + styles.active}>
            <span className={styles.navIcon}>📦</span>
            Produits
          </a>
          <a href="/admin/lots" className={styles.navItem}>
            <span className={styles.navIcon}>🏷️</span>
            Traçabilité / Lots
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.userIcon}>👤</span>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.name || "Administrateur"}</p>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className={styles.logoutButton}>
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Gestion des Produits</h1>
            <p className={styles.pageSubtitle}>
              {products.length} produit{products.length > 1 ? "s" : ""} enregistré{products.length > 1 ? "s" : ""}
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

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Poids</th>
                <th>En stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    Aucun produit enregistré
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className={styles.nameCell}>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.beekeeperImage}
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      )}
                      <span>{product.name}</span>
                    </td>
                    <td>{product.category || "-"}</td>
                    <td>{product.price.toFixed(2)} €</td>
                    <td>{product.weight || "-"}</td>
                    <td>
                      <span style={{ color: product.inStock ? 'green' : 'red' }}>
                        {product.inStock ? '✓ Oui' : '✗ Non'}
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
      </main>
    </div>
  );
}
