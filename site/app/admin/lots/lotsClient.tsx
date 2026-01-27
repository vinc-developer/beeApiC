"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "../beekeepers/page.module.css";

interface Lot {
  id: string;
  lotNumber: string;
  humidity?: string;
  beekeeperId: string;
  beekeeper: {
    commercialName: string;
  };
  honeyType?: {
    name: string;
  };
  zones: Array<{
    lieuxRucher: string;
    environnement?: string;
  }>;
  production?: {
    datesRecolte: string[];
    datesExtractions: string[];
    datesConditionnement: string[];
  };
  createdAt: string;
}

export default function LotsClient() {
  const router = useRouter();
  const { user, token, loading: authLoading, logout } = useAuth();
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && token) {
      loadLots();
    }
  }, [authLoading, token]);

  const loadLots = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/lots", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setLots(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lot ? Cette action est irréversible.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/lots/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      loadLots();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredLots = lots.filter((lot) =>
    lot.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.beekeeper.commercialName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <a href="/admin/products" className={styles.navItem}>
            <span className={styles.navIcon}>📦</span>
            Produits
          </a>
          <a href="/admin/lots" className={styles.navItem + " " + styles.active}>
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
            <h1 className={styles.pageTitle}>Gestion de la Traçabilité</h1>
            <p className={styles.pageSubtitle}>
              {filteredLots.length} lot{filteredLots.length > 1 ? "s" : ""} trouvé{filteredLots.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/lots/new")}
            className={styles.addButton}
          >
            ➕ Créer un nouveau lot
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
            placeholder="Rechercher par numéro de lot ou apiculteur..."
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
                <th>Numéro de lot</th>
                <th>Apiculteur</th>
                <th>Type de miel</th>
                <th>Zones</th>
                <th>Humidité</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLots.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    {searchTerm ? "Aucun lot trouvé" : "Aucun lot enregistré"}
                  </td>
                </tr>
              ) : (
                filteredLots.map((lot) => (
                  <tr key={lot.id}>
                    <td>
                      <strong style={{ color: "var(--color-primary)" }}>
                        {lot.lotNumber}
                      </strong>
                    </td>
                    <td>{lot.beekeeper.commercialName}</td>
                    <td>{lot.honeyType?.name || "-"}</td>
                    <td>
                      {lot.zones.length > 0
                        ? lot.zones.map((z) => z.lieuxRucher).join(", ")
                        : "-"}
                    </td>
                    <td>{lot.humidity || "-"}</td>
                    <td>
                      {new Date(lot.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => router.push(`/admin/lots/${lot.id}`)}
                        className={styles.editButton}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => window.open(`/lot-number?lot=${lot.lotNumber}`, "_blank")}
                        className={styles.editButton}
                        title="Voir la traçabilité publique"
                        style={{ background: "#dbeafe" }}
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleDelete(lot.id)}
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
