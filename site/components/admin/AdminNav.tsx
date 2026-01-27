import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import styles from "./AdminNav.module.css";

interface AdminNavProps {
  user?: {
    name: string | null;
    email: string;
  } | null;
  onLogout: () => void;
}

export default function AdminNav({ user, onLogout }: AdminNavProps) {
  const pathname = usePathname();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();

  const navItems = [
    { href: "/admin/dashboard", icon: "📊", label: "Tableau de bord" },
    { href: "/admin/beekeepers", icon: "👨‍🌾", label: "Apiculteurs" },
    { href: "/admin/honey-types", icon: "🍯", label: "Types de miel" },
    { href: "/admin/products", icon: "📦", label: "Produits" },
    { href: "/admin/lots", icon: "🏷️", label: "Traçabilité / Lots" },
    { href: "/admin/profile", icon: "⚙️", label: "Mon Profil" },
  ];

  return (
    <>
      {/* Bouton hamburger (mobile uniquement) */}
      <button
        className={`${styles.menuToggle} ${menuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Menu Admin"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay pour fermer le menu en cliquant à côté */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>🐝 Bee Api&apos;C</h2>
          <p className={styles.sidebarSubtitle}>Administration</p>
        </div>

        <nav className={styles.sidebarNav} onClick={closeMenu}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                pathname === item.href ? styles.active : ""
              }`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          {user && (
            <div className={styles.userInfo}>
              <span className={styles.userIcon}>👤</span>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{user.name || "Administrateur"}</p>
                <p className={styles.userEmail}>{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={onLogout} className={styles.logoutButton}>
            🚪 Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
