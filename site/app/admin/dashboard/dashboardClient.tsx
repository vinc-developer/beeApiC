"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import styles from "./page.module.css";
interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
}
interface Stats {
  beekeepers: number;
  honeyTypes: number;
  products: number;
  lots: number;
}
export default function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({ beekeepers: 0, honeyTypes: 0, products: 0, lots: 0 });
  const [loading, setLoading] = useState(true);
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");
    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }
    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      loadStats(token);
    } catch (error) {
      console.error("Erreur:", error);
      router.push("/admin/login");
    }
  }, [router]);
  const loadStats = async (token: string) => {
    try {
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
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }
  return (
    <div className={styles.dashboardContainer}>
      {/* Bouton hamburger (mobile uniquement) */}
      <div>
        <button
            className={`${styles.menuToggle} ${menuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
        >
          <div className={styles.buttonContent}>
            <p>Admin Menu
            </p>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>


        </button>
      </div>

      {/* Overlay pour fermer le menu en cliquant à côté */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
        onClick={closeMenu}
      ></div>

      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>🐝 Bee Api C</h2>
          <p className={styles.sidebarSubtitle}>Administration</p>
        </div>
        <nav className={styles.sidebarNav} onClick={closeMenu}>
          <a href="/admin/dashboard" className={styles.navItem + " " + styles.active}>
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
          <a href="/admin/lots" className={styles.navItem}>
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
          <button onClick={handleLogout} className={styles.logoutButton}>
            Déconnexion
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Tableau de bord</h1>
          <p className={styles.dashboardSubtitle}>
            Bienvenue dans votre espace administration
          </p>
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
            <a href="/" target="_blank" className={styles.actionCard}>
              <span className={styles.actionIcon}>🌐</span>
              <span className={styles.actionText}>Voir le site</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
