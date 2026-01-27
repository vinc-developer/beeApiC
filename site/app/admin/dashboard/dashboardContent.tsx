"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Stats {
  beekeepers: number;
  honeyTypes: number;
  products: number;
  lots: number;
}

export default function DashboardContent() {
  const [stats, setStats] = useState<Stats>({ beekeepers: 0, honeyTypes: 0, products: 0, lots: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const [beekeepersRes, honeyTypesRes, productsRes, lotsRes] = await Promise.all([
        fetch("http://localhost:3001/api/beekeepers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3001/api/honey-types", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3001/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:3001/api/lots", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const beekeepers = await beekeepersRes.json();
      const honeyTypes = await honeyTypesRes.json();
      const products = await productsRes.json();
      const lots = await lotsRes.json();

      setStats({
        beekeepers: beekeepers.data?.length || 0,
        honeyTypes: honeyTypes.data?.length || 0,
        products: products.data?.length || 0,
        lots: lots.data?.length || 0,
      });
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
        <p className={styles.dashboardSubtitle}>Bienvenue dans votre espace administration</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👨‍🌾</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Apiculteurs</p>
            <p className={styles.statValue}>{stats.beekeepers}</p>
          </div>
          <a href="/admin/beekeepers" className={styles.statLink}>
            Gérer
          </a>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🍯</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Types de miel</p>
            <p className={styles.statValue}>{stats.honeyTypes}</p>
          </div>
          <a href="/admin/honey-types" className={styles.statLink}>
            Gérer
          </a>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Produits</p>
            <p className={styles.statValue}>{stats.products}</p>
          </div>
          <a href="/admin/products" className={styles.statLink}>
            Gérer
          </a>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏷️</div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Lots / Traçabilité</p>
            <p className={styles.statValue}>{stats.lots}</p>
          </div>
          <a href="/admin/lots" className={styles.statLink}>
            Gérer
          </a>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Actions rapides</h2>
        <div className={styles.actionsGrid}>
          <a href="/admin/beekeepers/new" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionText}>Ajouter un apiculteur</span>
          </a>
          <a href="/admin/honey-types/new" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionText}>Ajouter un type de miel</span>
          </a>
          <a href="/admin/products/new" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionText}>Ajouter un produit</span>
          </a>
          <a href="/admin/lots/new" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionText}>Créer un lot de traçabilité</span>
          </a>
          <a href="/admin/profile" className={styles.actionCard}>
            <span className={styles.actionIcon}>➕</span>
            <span className={styles.actionText}>Créer un admin</span>
          </a>
          <a href="/" target="_blank" className={styles.actionCard}>
            <span className={styles.actionIcon}>🌐</span>
            <span className={styles.actionText}>Voir le site</span>
          </a>
        </div>
      </div>
    </>
  );
}
