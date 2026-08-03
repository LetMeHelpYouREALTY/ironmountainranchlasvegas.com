import { agentInfo, siteConfig } from "@/lib/site-config";

/** First-party branded portrait for hero / about (circular frame asset). */
export const AGENT_PORTRAIT = {
  src: "/images/agent/dr-jan-duffy.png",
  srcJpg: "/images/agent/dr-jan-duffy.jpg",
  width: 512,
  height: 512,
  alt: `${agentInfo.name}, REALTOR® — ${siteConfig.byline}`,
} as const;
