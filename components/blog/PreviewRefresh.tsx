"use client";

import { useRouter } from "next/navigation";
import { VisualEditing } from "next-sanity/visual-editing/client-component";

/**
 * Connects the page to the Studio's Presentation tool. Each time a document is edited,
 * the page re-renders on the server with the latest draft, so the preview matches the live site.
 */
export function PreviewRefresh() {
  const router = useRouter();

  return (
    <VisualEditing
      refresh={(payload) => {
        if (payload.source === "manual" || payload.source === "mutation") {
          router.refresh();
          return Promise.resolve();
        }
        return false;
      }}
    />
  );
}
