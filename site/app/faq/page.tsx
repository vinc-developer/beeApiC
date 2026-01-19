import {Metadata} from "next";
import FaqComponent from "@/app/faq/faq";

 export const metadata: Metadata = {
     title: "Foire aux questions - Ventes solidaires & RSE",
     description:
         "Questions fréquentes sur les ventes solidaires de miel dans les écoles et les démarches RSE en entreprise avec Bee Api'C",
     keywords: [
         "vente solidaire",
         "association école",
         "miel artisanal",
         "financement école",
         "HelloAsso",
         "RSE entreprise",
         "apiculteur loire atlantique",
     ],
 };

export default function FaqPage() {
    return (
        <FaqComponent />
    )
}