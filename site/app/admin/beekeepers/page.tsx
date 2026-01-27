import {Metadata} from "next";
import BeekeepersContent from "./beekeepersContent";

export const metadata: Metadata = {
  title: "Gestion des Apiculteurs",
  description: "Gestion des apiculteurs - Bee Api'C",
  robots: {
    index: false,
    follow: false,
  }
}

export default function BeekeepersPage() {
  return <BeekeepersContent />;
}
