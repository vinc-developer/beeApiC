"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../beekeepers/page.module.css";

interface ProductForm {
  id?: string;
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

export default function ProductFormClient() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<ProductForm>({
    id: "",
    slug: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "miel",
    weight: "",
    inStock: true,
    storeUrl: "",
  });

  useEffect(() => {
    if (params?.id && params.id !== "new") {
      setIsEdit(true);
      loadProduct(params.id as string);
    }
  }, [params?.id]);

  const loadProduct = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      setFormData({
        slug: data.data.slug,
        name: data.data.name,
        description: data.data.description || "",
        price: data.data.price,
        image: data.data.image || "",
        category: data.data.category || "miel",
        weight: data.data.weight || "",
        inStock: data.data.inStock,
        storeUrl: data.data.storeUrl || "",
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
        ? `http://localhost:3001/api/products/${params?.id}`
        : "http://localhost:3001/api/products";

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

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked :
              type === "number" ? parseFloat(value) || 0 :
              value,
    });
  };

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            {isEdit ? "Modifier" : "Ajouter"} un produit
          </h1>
        </div>
        <button
          onClick={() => router.push("/admin/products")}
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
              <label htmlFor="slug">Slug *</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled={isEdit}
                className={styles.input}
                placeholder="miel-acacia-250g"
              />
              <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Identifiant unique (ex: miel-acacia-250g)
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
                placeholder="Miel d'Acacia 250g"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="miel">Miel</option>
                <option value="accessoire">Accessoire</option>
                <option value="cosmetique">Cosmétique</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Prix (€) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className={styles.input}
                placeholder="8.50"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="weight">Poids</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={styles.input}
                placeholder="250g"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">URL Image</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="storeUrl">URL Boutique</label>
              <input
                type="url"
                id="storeUrl"
                name="storeUrl"
                value={formData.storeUrl}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://..."
              />
            </div>

            <div className={styles.formGroup}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                En stock
              </label>
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
              placeholder="Description du produit..."
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
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
