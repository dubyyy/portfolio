import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { previewClient } from "@/lib/sanity/client";

// Called by the Studio's Presentation tool. It checks a secret that Sanity generates, so
// only someone signed in to your Studio can turn preview on.
const handler = previewClient
  ? defineEnableDraftMode({ client: previewClient })
  : null;

export async function GET(request: Request) {
  if (!handler) {
    return new Response("Preview is not configured: set SANITY_API_READ_TOKEN.", { status: 500 });
  }
  return handler.GET(request);
}
