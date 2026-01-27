"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import styles from "./page.module.css";

interface Beekeeper {
  id: number;
  name: string;
  location: string;
  email?: string;
  phone?: string;
  description?: string;
  image?: string;
}

export default function BeekeepersClient() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const [beekeepers, setBeekeepers] = useState<Beekeeper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && token) {
      loadBeekeepers();
    }
  }, [authLoading, token]);

  const loadBeekeepers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/beekeepers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setBeekeepers(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet apiculteur ?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/beekeepers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      loadBeekeepers();
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
      {/* Bouton hamburger (mobile uniquement) */}
      <button
        className={`${styles.menuToggle} ${menuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay pour fermer le menu en cliquant à côté */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
        onClick={closeMenu}
      ></div>

      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>🐝 Bee Api&apos;C</h2>
          <p className={styles.sidebarSubtitle}>Administration</p>
        </div>

        <nav className={styles.sidebarNav} onClick={closeMenu}>
          <a href="/admin/dashboard" className={styles.navItem}>
            <span className={styles.navIcon}>📊</span>
            Tableau de bord
          </a>
          <a href="/admin/beekeepers" className={styles.navItem + " " + styles.active}>
            <span className={styles.navIcon}>👨‍🌾</span>
            Apiculteurs
          </a>
          <a href="/admin/honey-types" className={styles.navItem}>
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
            <h1 className={styles.pageTitle}>Gestion des Apiculteurs</h1>
            <p className={styles.pageSubtitle}>
              {beekeepers.length} apiculteur{beekeepers.length > 1 ? "s" : ""} enregistré{beekeepers.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/beekeepers/new")}
            className={styles.addButton}
          >
            ➕ Ajouter un apiculteur
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
                <th>Localisation</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {beekeepers.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    Aucun apiculteur enregistré
                  </td>
                </tr>
              ) : (
                beekeepers.map((beekeeper) => (
                  <tr key={beekeeper.id}>
                    <td className={styles.nameCell}>
                      {beekeeper.image && (
                        <img
                          src={beekeeper.image}
                          alt={beekeeper.name}
                          className={styles.beekeeperImage}
                        />
                      )}
                      <span>{beekeeper.name}</span>
                    </td>
                    <td>{beekeeper.location}</td>
                    <td>{beekeeper.email || "-"}</td>
                    <td>{beekeeper.phone || "-"}</td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => router.push(`/admin/beekeepers/${beekeeper.id}`)}
                        className={styles.editButton}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(beekeeper.id)}
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
