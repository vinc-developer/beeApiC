import {Metadata} from "next";
import DashboardContent from "./dashboardContent";

export const metadata: Metadata = {
  title: "Dashboard Administrateur",
  description: "Espace d'administration Bee Api'C",
  robots: {
    index: false,
    follow: false,
  }
}

export default function DashboardPage() {
  return <DashboardContent />;
}
