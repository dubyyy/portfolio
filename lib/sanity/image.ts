import { urlForImage } from "./client";

/** Loose shape of a Sanity image field as returned by GROQ. */
export interface SanityImageSource {
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: { x?: number; y?: number };
  alt?: string;
  caption?: string;
}

export interface SanityImageDimensions {
  width: number;
  height: number;
}

/** Read the original pixel dimensions encoded in a Sanity asset ref (image-<id>-800x600-png). */
export function getImageDimensions(source: SanityImageSource | null | undefined): SanityImageDimensions | null {
  const ref: string | undefined = source?.asset?._ref || source?.asset?._id;
  const match = ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

interface ImageUrlOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Build a resized, format-optimized URL from Sanity's image CDN.
 * When a height is given the image is cropped, respecting the editor's hotspot.
 */
export function sanityImageUrl(source: SanityImageSource | null | undefined, opts: ImageUrlOptions = {}): string | null {
  const base = urlForImage(source);
  if (!base) return null;
  if (!base.includes("cdn.sanity.io")) return base;

  const params = new URLSearchParams();
  if (opts.width) params.set("w", String(opts.width));
  if (opts.height) {
    params.set("h", String(opts.height));
    params.set("fit", "crop");
    const hotspot = source?.hotspot;
    if (hotspot && typeof hotspot.x === "number" && typeof hotspot.y === "number") {
      params.set("crop", "focalpoint");
      params.set("fp-x", String(hotspot.x));
      params.set("fp-y", String(hotspot.y));
    }
  } else {
    params.set("fit", "max");
  }
  params.set("q", String(opts.quality ?? 80));
  params.set("auto", "format");

  return `${base}${base.includes("?") ? "&" : "?"}${params.toString()}`;
}

/** Responsive srcset for an inline image. */
export function sanityImageSrcSet(source: SanityImageSource | null | undefined, widths = [480, 768, 1080, 1440]): string | undefined {
  const dims = getImageDimensions(source);
  const usable = dims ? widths.filter((w) => w <= dims.width) : widths;
  const list = usable.length > 0 ? usable : [dims?.width ?? widths[0]];
  const entries = list
    .map((w) => {
      const url = sanityImageUrl(source, { width: w });
      return url ? `${url} ${w}w` : null;
    })
    .filter(Boolean);
  return entries.length > 0 ? entries.join(", ") : undefined;
}

/** 1200×630 social share image (Open Graph / Twitter). */
export function sanityOgImage(source: SanityImageSource | null | undefined) {
  const url = sanityImageUrl(source, { width: 1200, height: 630, quality: 85 });
  if (!url) return null;
  return { url, width: 1200, height: 630, alt: source?.alt };
}
