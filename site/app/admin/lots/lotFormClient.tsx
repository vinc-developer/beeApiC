"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "../beekeepers/page.module.css";

interface Zone {
  lieuxRucher: string;
  environnement: string;
}

interface LotForm {
  lotNumber: string;
  beekeeperId: string;
  honeyTypeId: string;
  humidity: string;
  zones: Zone[];
  datesRecolte: string[];
  datesExtractions: string[];
  datesConditionnement: string[];
}

interface Beekeeper {
  id: string;
  commercialName: string;
}

interface HoneyType {
  id: string;
  name: string;
}

export default function LotFormClient() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [beekeepers, setBeekeepers] = useState<Beekeeper[]>([]);
  const [honeyTypes, setHoneyTypes] = useState<HoneyType[]>([]);

  const [formData, setFormData] = useState<LotForm>({
    lotNumber: "",
    beekeeperId: "",
    honeyTypeId: "",
    humidity: "",
    zones: [{ lieuxRucher: "", environnement: "" }],
    datesRecolte: [""],
    datesExtractions: [""],
    datesConditionnement: [""],
  });

  useEffect(() => {
    loadBeekeepers();
    loadHoneyTypes();

    if (params?.id && params.id !== "new") {
      setIsEdit(true);
      loadLot(params.id as string);
    }
  }, [params?.id]);

  const loadBeekeepers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/beekeepers");
      const data = await response.json();
      setBeekeepers(data.data || []);
    } catch (err) {
      console.error("Erreur chargement apiculteurs:", err);
    }
  };

  const loadHoneyTypes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/honey-types");
      const data = await response.json();
      setHoneyTypes(data.data || []);
    } catch (err) {
      console.error("Erreur chargement types de miel:", err);
    }
  };

  const loadLot = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/lots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement");
      }

      const lot = data.data;
      setFormData({
        lotNumber: lot.lotNumber,
        beekeeperId: lot.beekeeperId,
        honeyTypeId: lot.honeyTypeId || "",
        humidity: lot.humidity || "",
        zones: lot.zones.length > 0 ? lot.zones : [{ lieuxRucher: "", environnement: "" }],
        datesRecolte: lot.production?.datesRecolte || [""],
        datesExtractions: lot.production?.datesExtractions || [""],
        datesConditionnement: lot.production?.datesConditionnement || [""],
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
      // Nettoyer les données
      const cleanedData = {
        ...formData,
        datesRecolte: formData.datesRecolte.filter((d) => d !== ""),
        datesExtractions: formData.datesExtractions.filter((d) => d !== ""),
        datesConditionnement: formData.datesConditionnement.filter((d) => d !== ""),
        zones: formData.zones.filter((z) => z.lieuxRucher !== ""),
      };

      const url = isEdit
        ? `http://localhost:3001/api/lots/${params?.id}`
        : "http://localhost:3001/api/lots";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement");
      }

      router.push("/admin/lots");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addZone = () => {
    setFormData({
      ...formData,
      zones: [...formData.zones, { lieuxRucher: "", environnement: "" }],
    });
  };

  const removeZone = (index: number) => {
    setFormData({
      ...formData,
      zones: formData.zones.filter((_, i) => i !== index),
    });
  };

  const updateZone = (index: number, field: keyof Zone, value: string) => {
    const newZones = [...formData.zones];
    newZones[index][field] = value;
    setFormData({ ...formData, zones: newZones });
  };

  const addDate = (field: keyof Pick<LotForm, "datesRecolte" | "datesExtractions" | "datesConditionnement">) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeDate = (field: keyof Pick<LotForm, "datesRecolte" | "datesExtractions" | "datesConditionnement">, index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const updateDate = (field: keyof Pick<LotForm, "datesRecolte" | "datesExtractions" | "datesConditionnement">, index: number, value: string) => {
    const newDates = [...formData[field]];
    newDates[index] = value;
    setFormData({ ...formData, [field]: newDates });
  };

  return (
      <AdminLayout >
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              {isEdit ? "Modifier" : "Créer"} un lot
            </h1>
          </div>
          <button
            onClick={() => router.push("/admin/lots")}
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
          {/* Informations principales */}
          <h2 style={{ marginBottom: "1rem", color: "var(--color-secondary)" }}>
            Informations principales
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="lotNumber">Numéro de lot *</label>
              <input
                type="text"
                id="lotNumber"
                name="lotNumber"
                value={formData.lotNumber}
                onChange={handleChange}
                required
                disabled={isEdit}
                className={styles.input}
                placeholder="BA-250701-CH"
              />
              <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Format: CODE-YYMMDD-TYPE
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="beekeeperId">Apiculteur *</label>
              <select
                id="beekeeperId"
                name="beekeeperId"
                value={formData.beekeeperId}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Sélectionner un apiculteur</option>
                {beekeepers.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.commercialName}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="honeyTypeId">Type de miel</label>
              <select
                id="honeyTypeId"
                name="honeyTypeId"
                value={formData.honeyTypeId}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Sélectionner un type</option>
                {honeyTypes.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="humidity">Humidité (%)</label>
              <input
                type="text"
                id="humidity"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                className={styles.input}
                placeholder="17.5"
              />
            </div>
          </div>

          {/* Zones de production */}
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem", color: "var(--color-secondary)" }}>
            Zones de production
          </h2>
          {formData.zones.map((zone, index) => (
            <div key={index} style={{ marginBottom: "1rem", padding: "1rem", background: "#f9fafb", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <strong>Zone {index + 1}</strong>
                {formData.zones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeZone(index)}
                    style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
                  >
                    ✕ Supprimer
                  </button>
                )}
              </div>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Lieu du rucher *</label>
                  <input
                    type="text"
                    value={zone.lieuxRucher}
                    onChange={(e) => updateZone(index, "lieuxRucher", e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Exemple: Nantes"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Environnement</label>
                  <input
                    type="text"
                    value={zone.environnement}
                    onChange={(e) => updateZone(index, "environnement", e.target.value)}
                    className={styles.input}
                    placeholder="Exemple: Forêt, marais..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addZone}
            style={{ marginBottom: "2rem", padding: "0.5rem 1rem", background: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            + Ajouter une zone
          </button>

          {/* Dates de production */}
          <h2 style={{ marginTop: "2rem", marginBottom: "1rem", color: "var(--color-secondary)" }}>
            Dates de production
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Dates de récolte</h3>
            {formData.datesRecolte.map((date, index) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => updateDate("datesRecolte", index, e.target.value)}
                  className={styles.input}
                />
                {formData.datesRecolte.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDate("datesRecolte", index)}
                    style={{ padding: "0.5rem 1rem", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDate("datesRecolte")}
              style={{ padding: "0.5rem 1rem", background: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }}
            >
              + Ajouter une date
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Dates d&apos;extraction</h3>
            {formData.datesExtractions.map((date, index) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => updateDate("datesExtractions", index, e.target.value)}
                  className={styles.input}
                />
                {formData.datesExtractions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDate("datesExtractions", index)}
                    style={{ padding: "0.5rem 1rem", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDate("datesExtractions")}
              style={{ padding: "0.5rem 1rem", background: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }}
            >
              + Ajouter une date
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Dates de conditionnement</h3>
            {formData.datesConditionnement.map((date, index) => (
              <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => updateDate("datesConditionnement", index, e.target.value)}
                  className={styles.input}
                />
                {formData.datesConditionnement.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDate("datesConditionnement", index)}
                    style={{ padding: "0.5rem 1rem", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDate("datesConditionnement")}
              style={{ padding: "0.5rem 1rem", background: "#e0f2fe", color: "#0369a1", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "0.5rem" }}
            >
              + Ajouter une date
            </button>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.push("/admin/lots")}
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
      </AdminLayout>
  );
}
