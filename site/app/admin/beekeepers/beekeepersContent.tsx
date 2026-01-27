"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
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

export default function BeekeepersContent() {
  const router = useRouter();
  const [beekeepers, setBeekeepers] = useState<Beekeeper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadBeekeepers();
  }, []);

  const loadBeekeepers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
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
      const token = localStorage.getItem("adminToken");
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

  const filteredBeekeepers = beekeepers.filter((beekeeper) =>
    beekeeper.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beekeeper.location?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className={styles.pageTitle}>Gestion des Apiculteurs</h1>
          <p className={styles.pageSubtitle}>
            {filteredBeekeepers.length} apiculteur{filteredBeekeepers.length > 1 ? "s" : ""} trouvé{filteredBeekeepers.length > 1 ? "s" : ""}
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

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Rechercher par nom ou localisation..."
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
              <th>Localisation</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeekeepers.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {searchTerm ? "Aucun apiculteur trouvé" : "Aucun apiculteur enregistré"}
                </td>
              </tr>
            ) : (
              filteredBeekeepers.map((beekeeper) => (
                <tr key={beekeeper.id}>
                  <td>
                    <strong>{beekeeper.name}</strong>
                  </td>
                  <td>{beekeeper.location || "-"}</td>
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
    </AdminLayout>
  );
}
