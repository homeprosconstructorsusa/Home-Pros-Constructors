import type { Metadata } from "next";
import { CompanyPartnershipPage } from "@/components/partnership-pages";
import { isDemoMode } from "@/lib/catalog";
export const metadata: Metadata = { title: "Parceria com a Home Pros Constructors" };
export default function PartnershipCompany() { return <CompanyPartnershipPage demo={isDemoMode()} />; }
