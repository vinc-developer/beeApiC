import {Metadata} from "next";
import LoginClient from "./loginClient";

export const metadata: Metadata = {
  title: "Connexion Administrateur",
  description: "Accès à l'espace administrateur Bee Api'C",
  robots: {
    index: false,
    follow: false,
  }
};

export default function LoginPage() {
  return <LoginClient />;
}
