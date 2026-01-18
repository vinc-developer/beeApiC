import {Metadata} from "next";
import ContactClient from "@/app/contact/contactClient";

export const metadata: Metadata = {
  title: "Contact – Apiculteur local",
  description:
      "Contactez Bee Api’C, apiculteur local en Loire-Atlantique. Renseignements, vente de miel, partenariats et récupération d’essaims.",
  keywords: [
    "contact apiculteur",
    "apiculteur loire atlantique",
    "miel local",
    "vente miel",
    "récupération essaim",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}

