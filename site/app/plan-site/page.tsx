import {Metadata} from "next";
import PlanSiteComponent from "@/app/plan-site/plan-site";

export const metadata: Metadata = {
    title: "Plan du site - Bee Api'C",
    description:
        "Plan du site Bee Api'C : retrouvez facilement toutes les pages et sections de notre site web d'apiculture locale en Loire-Atlantique.",
    keywords: [
        "plan du site",
        "sitemap",
        "navigation",
        "bee api c",
        "apiculteur loire atlantique",
        "miel artisanal",
    ],
};

export default function PlanSitePage() {
    return (
        <PlanSiteComponent />
    )
}
