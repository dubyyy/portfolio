import React from "react";
import { SanityPost } from "@/lib/sanity/types";
import { sanityImageUrl } from "@/lib/sanity/image";
import { defaultAuthor, siteName, siteUrl } from "@/lib/site";

export function JsonLd({ post }: { post: SanityPost }) {
  const url = `${siteUrl}/blog/${post.slug.current}`;
  const image = sanityImageUrl(post.mainImage, { width: 1200, height: 630 });
  const authorName = post.author?.name || defaultAuthor;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    ...(image ? { image: [image] } : {}),
    ...(post.categories?.length
      ? { keywords: post.categories.map((c) => c.title).join(", ") }
      : {}),
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so post content can never close the script tag early
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
