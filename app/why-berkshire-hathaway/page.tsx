import { redirect } from "next/navigation";

/**
 * Legacy BHHS marketing URL — this site leads with Iron Mountain Ranch /
 * Homes by Dr. Jan Duffy. Brokerage disclosure lives in the footer only.
 */
export default function WhyBerkshireHathawayRedirectPage() {
  redirect("/about");
}
