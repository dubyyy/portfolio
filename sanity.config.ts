import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Portfolio Blog",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    // "Presentation" tab: edits a post next to the real blog page, which updates live as you type.
    presentationTool({
      previewUrl: {
        // The Studio is embedded in this site, so the preview is served from the same origin.
        initial: typeof window !== "undefined" ? window.location.origin : undefined,
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        // Opening /blog/<slug> in the preview loads that post in the editor.
        mainDocuments: defineDocuments([
          { route: "/blog/:slug", filter: `_type == "post" && slug.current == $slug` },
        ]),
        // Lets a post's editor show (and jump to) the pages that display it.
        locations: {
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    { title: doc.title || "Untitled", href: `/blog/${doc.slug}` },
                    { title: "Blog", href: "/blog" },
                  ]
                : [],
            }),
          }),
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
