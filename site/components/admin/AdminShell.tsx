"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminNav from "./AdminNav";
import styles from "./AdminShell.module.css";

interface Props {
  children: React.ReactNode;
}

interface User {
  name: string | null;
  email: string;
}

export default function AdminShell({ children }: Readonly<Props>) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login/";

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminRoute) {
      setLoading(false);
      return;
    }

    // Sur la page login, pas besoin d'authentification
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Vérifier l'authentification
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (!token || !userStr) {
      router.push("/admin/login");
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setIsAuthenticated(true);
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [isAdminRoute, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // Pages non-admin : rendu normal
  if (!isAdminRoute) {
    return <>{children}</>;
  }

  // Page de login admin : rendu sans navigation
  if (isLoginPage) {
    return <div className={styles.loginContainer}>{children}</div>;
  }

  // Chargement en cours
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  // Non authentifié (redirection en cours)
  if (!isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Redirection...</p>
      </div>
    );
  }

  // Layout admin authentifié
  return (
    <div className={styles.adminShell}>
      <AdminNav user={user} onLogout={handleLogout} />
      <div className={styles.shellMain}>{children}</div>
    </div>
  );
}


