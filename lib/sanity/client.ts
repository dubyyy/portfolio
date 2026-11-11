import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const isSanityConfigured = Boolean(projectId && projectId.trim().length > 0);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

/**
 * Helper to build an image URL from a Sanity image reference or asset object
 * works without requiring extra external libraries
 */
export function urlForImage(source: any): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;
  if (source.asset?._ref && projectId) {
    // Sanity image asset ref format: image-7473...-800x600-png
    const ref = source.asset._ref as string;
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const extension = parts[3];
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
    }
  }
  return null;
}

