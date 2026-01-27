"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "../beekeepers/page.module.css";

interface HoneyType {
  id: number;
  code: string;
  name: string;
  description?: string;
}

export default function HoneyTypesClient() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();
  const [honeyTypes, setHoneyTypes] = useState<HoneyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && token) {
      loadHoneyTypes();
    }
  }, [authLoading, token]);

  const loadHoneyTypes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/honey-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setHoneyTypes(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce type de miel ?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/honey-types/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      loadHoneyTypes();
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
          <a href="/admin/honey-types" className={styles.navItem + " " + styles.active}>
            <span className={styles.navIcon}>🍯</span>
            Types de miel
          </a>
          <a href="/admin/products" className={styles.navItem}>
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
            <h1 className={styles.pageTitle}>Gestion des Types de Miel</h1>
            <p className={styles.pageSubtitle}>
              {honeyTypes.length} type{honeyTypes.length > 1 ? "s" : ""} de miel enregistré{honeyTypes.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/honey-types/new")}
            className={styles.addButton}
          >
            ➕ Ajouter un type de miel
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
                <th>Code</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {honeyTypes.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyState}>
                    Aucun type de miel enregistré
                  </td>
                </tr>
              ) : (
                honeyTypes.map((honeyType) => (
                  <tr key={honeyType.id}>
                    <td>{honeyType.code}</td>
                    <td>{honeyType.name}</td>
                    <td>{honeyType.description || "-"}</td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => router.push(`/admin/honey-types/${honeyType.id}`)}
                        className={styles.editButton}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(honeyType.id)}
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
