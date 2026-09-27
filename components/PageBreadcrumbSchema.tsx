import { headers } from "next/headers";
import SchemaScript from "@/components/SchemaScript";
import { resolvePageBreadcrumbs } from "@/lib/page-breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/schema";

/**
 * Emits BreadcrumbList JSON-LD for inner pages based on the request pathname.
 */
export default function PageBreadcrumbSchema() {
  const pathname = headers().get("x-pathname") ?? "/";
  const items = resolvePageBreadcrumbs(pathname);

  if (!items) {
    return null;
  }

  return (
    <SchemaScript
      schema={generateBreadcrumbSchema(items)}
      id="page-breadcrumb-schema"
    />
  );
}
