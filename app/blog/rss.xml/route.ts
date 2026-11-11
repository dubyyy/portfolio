import { getAllPosts } from "@/lib/sanity/queries";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chukwuafumichael.dev";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug.current}</link>
      <guid>${siteUrl}/blog/${post.slug.current}</guid>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Michael Dubem Chukwuafu - Blog & Writing</title>
      <link>${siteUrl}/blog</link>
      <description>Software engineering, cloud infrastructure, InfoSec, and AI insights.</description>
      <language>en-us</language>
      ${rssItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

