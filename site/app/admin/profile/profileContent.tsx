"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../beekeepers/page.module.css";

interface UserProfile {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NewAdminForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function ProfileContent() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "admin">("profile");

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newAdminForm, setNewAdminForm] = useState<NewAdminForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const userStr = localStorage.getItem("adminUser");

      if (!userStr) {
        router.push("/admin/login");
        return;
      }

      const userData = JSON.parse(userStr);
      setUser(userData);
      setProfileForm({
        name: userData.name || "",
        email: userData.email || "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      // Mettre à jour le localStorage
      const updatedUser = { ...user, ...profileForm };
      localStorage.setItem("adminUser", JSON.stringify(updatedUser));
      setUser(updatedUser as UserProfile);

      setSuccess("Profil mis à jour avec succès !");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du changement de mot de passe");
      }

      setSuccess("Mot de passe changé avec succès !");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newAdminForm.password !== newAdminForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (newAdminForm.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:3001/api/auth/create-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newAdminForm.name,
          email: newAdminForm.email,
          password: newAdminForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSuccess("Administrateur créé avec succès !");
      setNewAdminForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Chargement...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mon Profil</h1>
          <p className={styles.pageSubtitle}>Gérer mon compte administrateur</p>
        </div>
      </header>

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: "1rem",
          background: "#d4edda",
          color: "#155724",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          border: "1px solid #c3e6cb"
        }}>
          <span style={{ marginRight: "0.5rem" }}>✓</span>
          {success}
        </div>
      )}

      {/* Tabs */}
      <div style={{ borderBottom: "2px solid #e5e7eb", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              padding: "1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "profile" ? "3px solid var(--color-primary)" : "3px solid transparent",
              color: activeTab === "profile" ? "var(--color-primary)" : "#6b7280",
              fontWeight: activeTab === "profile" ? "600" : "400",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            👤 Mes Informations
          </button>
          <button
            onClick={() => setActiveTab("password")}
            style={{
              padding: "1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "password" ? "3px solid var(--color-primary)" : "3px solid transparent",
              color: activeTab === "password" ? "var(--color-primary)" : "#6b7280",
              fontWeight: activeTab === "password" ? "600" : "400",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            🔒 Mot de passe
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            style={{
              padding: "1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "admin" ? "3px solid var(--color-primary)" : "3px solid transparent",
              color: activeTab === "admin" ? "var(--color-primary)" : "#6b7280",
              fontWeight: activeTab === "admin" ? "600" : "400",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            ➕ Nouvel Admin
          </button>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileUpdate} className={styles.form}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Mes Informations</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Rôle</label>
            <input
              type="text"
              value={user?.role || "Admin"}
              className={styles.input}
              disabled
              style={{ background: "#f3f4f6", cursor: "not-allowed" }}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Enregistrement..." : "Mettre à jour"}
            </button>
          </div>
        </form>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <form onSubmit={handlePasswordChange} className={styles.form}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Changer le mot de passe</h2>

          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Mot de passe actuel *</label>
            <input
              type="password"
              id="currentPassword"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nouveau mot de passe * (min. 6 caractères)</label>
            <input
              type="password"
              id="newPassword"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
            <input
              type="password"
              id="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Enregistrement..." : "Changer le mot de passe"}
            </button>
          </div>
        </form>
      )}

      {/* New Admin Tab */}
      {activeTab === "admin" && (
        <form onSubmit={handleCreateAdmin} className={styles.form}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Créer un nouvel administrateur</h2>

          <div className={styles.formGroup}>
            <label htmlFor="adminName">Nom complet *</label>
            <input
              type="text"
              id="adminName"
              value={newAdminForm.name}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adminEmail">Email *</label>
            <input
              type="email"
              id="adminEmail"
              value={newAdminForm.email}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adminPassword">Mot de passe * (min. 6 caractères)</label>
            <input
              type="password"
              id="adminPassword"
              value={newAdminForm.password}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="adminConfirmPassword">Confirmer le mot de passe *</label>
            <input
              type="password"
              id="adminConfirmPassword"
              value={newAdminForm.confirmPassword}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, confirmPassword: e.target.value })}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Création..." : "Créer l'administrateur"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
