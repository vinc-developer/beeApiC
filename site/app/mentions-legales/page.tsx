import {Metadata} from "next";
import MentionsLegalesComponent from "@/app/mentions-legales/mentions-legales";

export const metadata: Metadata = {
    title: "Mentions légales",
    description:
        "Mentions légales du site Bee Api’C, apiculteur local en Loire-Atlantique et producteur de miel artisanal.",
    keywords: [
        "mentions légales",
        "bee api c",
        "apiculteur loire atlantique",
        "site apiculture",
    ],
};

export default function MentionsLegalesPage() {
    return (
        <MentionsLegalesComponent />
    )
}