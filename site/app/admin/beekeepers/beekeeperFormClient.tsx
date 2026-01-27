"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css";

export interface SocialMediaDto {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
}
interface BeekeeperForm {
  id?: string;
  code: string;
  useProxy?: boolean;
  type: string;
  partnerSince?: string;
  firstName: string;
  lastName: string;
  commercialName: string;
  address: string;
  email?: string;
  phone?: string;
  website?: string;
  webshop?: string;
  siret?: string;
  photo?: string;
  logo?: string;
  bio?: string;
  hivesCount?: string;
  location?: string;
  distance?: string;
  beekeeperSince?: string;
  ruchers?: string[];
  gallery?: string[];
  socialMedia?: SocialMediaDto;
}

export default function BeekeeperFormClient() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<BeekeeperForm>({
    code: "",
    type: "partner",
    firstName: "",
    lastName: "",
    commercialName: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    if (params?.id && params.id !== "new") {
      setIsEdit(true);
      loadBeekeeper(params.id as string);
    }
  }, [params?.id]);

  const loadBeekeeper = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/beekeepers/${id}`, {
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
        type: data.data.type,
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        commercialName: data.data.commercialName,
        email: data.data.email || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
        location: data.data.location || "",
        bio: data.data.bio || "",
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
        ? `http://localhost:3001/api/beekeepers/${params?.id}`
        : "http://localhost:3001/api/beekeepers";

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

      router.push("/admin/beekeepers");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            {isEdit ? "Modifier" : "Ajouter"} un apiculteur
          </h1>
        </div>
        <button
          onClick={() => router.push("/admin/beekeepers")}
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
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="partner">Partenaire</option>
                <option value="owner">Propriétaire</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="firstName">Prénom *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Nom *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="commercialName">Nom commercial *</label>
              <input
                type="text"
                id="commercialName"
                name="commercialName"
                value={formData.commercialName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Localisation</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Adresse complète</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bio">Biographie</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.push("/admin/beekeepers")}
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
