"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../beekeepers/page.module.css";

interface HoneyTypeForm {
  code: string;
  name: string;
  description?: string;
}

export default function HoneyTypeFormClient() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<HoneyTypeForm>({
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (params?.id && params.id !== "new") {
      setIsEdit(true);
      loadHoneyType(params.id as string);
    }
  }, [params?.id]);

  const loadHoneyType = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/honey-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setFormData({
        code: data.data.code,
        name: data.data.name,
        description: data.data.description || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const url = isEdit
        ? `http://localhost:3001/api/honey-types/${params?.id}`
        : "http://localhost:3001/api/honey-types";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement");
      }

      router.push("/admin/honey-types");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            {isEdit ? "Modifier" : "Ajouter"} un type de miel
          </h1>
        </div>
        <button
          onClick={() => router.push("/admin/honey-types")}
          className={styles.backButton}
        >
          ← Retour
        </button>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="code">Code *</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                disabled={isEdit}
                className={styles.input}
                placeholder="Ex: ACACIA"
              />
              <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Code unique en majuscules
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Nom *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Ex: Miel d'Acacia"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
              placeholder="Description du type de miel..."
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.push("/admin/honey-types")}
              className={styles.cancelButton}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer"}
            </button>
          </div>
        </form>
    </>
  );
}
