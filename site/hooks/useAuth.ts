import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");

    if (!storedToken || !userStr) {
      router.push("/admin/login");
      setLoading(false);
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setToken(storedToken);
    } catch (error) {
      console.error("Erreur lors du chargement des données utilisateur:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  return { user, token, loading, logout };
}
