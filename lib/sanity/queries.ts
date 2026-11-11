import { client, isSanityConfigured } from "./client";
import { SanityPost, SanityCategory } from "./types";

/**
 * Add your own posts here or connect Sanity CMS in .env.local
 */
export const fallbackPosts: SanityPost[] = [];

export async function getAllPosts(): Promise<SanityPost[]> {
  "use cache";
  if (!isSanityConfigured || !client) {
    return fallbackPosts;
  }

  try {
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      readTime,
      categories[]->{ _id, title, slug },
      author->{ name, role, avatar, bio }
    }`;
    const posts = await client.fetch<SanityPost[]>(query);
    return posts || [];
  } catch (err) {
    console.error("Sanity fetch error in getAllPosts:", err);
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!isSanityConfigured || !client) {
    return fallbackPosts.find((p) => p.slug.current === slug) || null;
  }

  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      readTime,
      body,
      categories[]->{ _id, title, slug },
      author->{ name, role, avatar, bio }
    }`;
    const post = await client.fetch<SanityPost | null>(query, { slug });
    if (post) return post;
    return fallbackPosts.find((p) => p.slug.current === slug) || null;
  } catch (err) {
    console.error(`Sanity fetch error in getPostBySlug (${slug}):`, err);
    return fallbackPosts.find((p) => p.slug.current === slug) || null;
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.categories?.some((c) => c.slug?.current === categorySlug)
  );
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  if (!isSanityConfigured || !client) {
    const map = new Map<string, SanityCategory>();
    fallbackPosts.forEach((p) => {
      p.categories?.forEach((c) => {
        if (c.slug?.current) map.set(c.slug.current, c);
      });
    });
    return Array.from(map.values());
  }

  try {
    const query = `*[_type == "category" && defined(slug.current)] | order(title asc) {
      _id,
      title,
      slug,
      description
    }`;
    const categories = await client.fetch<SanityCategory[]>(query);
    if (categories && categories.length > 0) return categories;

    const map = new Map<string, SanityCategory>();
    fallbackPosts.forEach((p) => {
      p.categories?.forEach((c) => {
        if (c.slug?.current) map.set(c.slug.current, c);
      });
    });
    return Array.from(map.values());
  } catch (err) {
    console.error("Sanity fetch error in getAllCategories:", err);
    return [];
  }
}
