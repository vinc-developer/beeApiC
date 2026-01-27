"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "../beekeepers/page.module.css";

interface HoneyType {
  id: number;
  code: string;
  name: string;
  description?: string;
}

export default function HoneyTypesContent() {
  const router = useRouter();
  const [honeyTypes, setHoneyTypes] = useState<HoneyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHoneyTypes();
  }, []);

  const loadHoneyTypes = async () => {
    try {
      const token = localStorage.getItem("adminToken");
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
      const token = localStorage.getItem("adminToken");
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

  const filteredHoneyTypes = honeyTypes.filter((honeyType) =>
    honeyType.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    honeyType.code?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className={styles.pageTitle}>Gestion des Types de Miel</h1>
          <p className={styles.pageSubtitle}>
            {filteredHoneyTypes.length} type{filteredHoneyTypes.length > 1 ? "s" : ""} de miel trouvé{filteredHoneyTypes.length > 1 ? "s" : ""}
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

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Rechercher par nom ou code..."
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
              <th>Code</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoneyTypes.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  {searchTerm ? "Aucun type de miel trouvé" : "Aucun type de miel enregistré"}
                </td>
              </tr>
            ) : (
              filteredHoneyTypes.map((honeyType) => (
                <tr key={honeyType.id}>
                  <td><strong>{honeyType.code}</strong></td>
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
    </AdminLayout>
  );
}
