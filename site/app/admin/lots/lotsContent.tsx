"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
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

export default function LotsContent() {
  const router = useRouter();
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLots();
  }, []);

  const loadLots = async () => {
    try {
      const token = localStorage.getItem("adminToken");
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lot ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
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
    lot.lotNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.beekeeper?.commercialName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lot.honeyType?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Gestion de la Traçabilité / Lots</h1>
          <p className={styles.pageSubtitle}>
            {filteredLots.length} lot{filteredLots.length > 1 ? "s" : ""} trouvé{filteredLots.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/lots/new")}
          className={styles.addButton}
        >
          ➕ Créer un lot
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
          placeholder="Rechercher par numéro de lot, apiculteur ou type de miel..."
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
              <th>N° Lot</th>
              <th>Apiculteur</th>
              <th>Type de Miel</th>
              <th>Lieux</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLots.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  {searchTerm ? "Aucun lot trouvé" : "Aucun lot enregistré"}
                </td>
              </tr>
            ) : (
              filteredLots.map((lot) => (
                <tr key={lot.id}>
                  <td>
                    <strong>{lot.lotNumber}</strong>
                  </td>
                  <td>{lot.beekeeper?.commercialName || "-"}</td>
                  <td>{lot.honeyType?.name || "-"}</td>
                  <td>
                    {lot.zones?.length > 0
                      ? lot.zones.map(z => z.lieuxRucher).join(", ")
                      : "-"
                    }
                  </td>
                  <td>{new Date(lot.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className={styles.actionsCell}>
                    <button
                      onClick={() => router.push(`/admin/lots/${lot.id}`)}
                      className={styles.editButton}
                      title="Modifier"
                    >
                      ✏️
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
    </AdminLayout>
  );
}
