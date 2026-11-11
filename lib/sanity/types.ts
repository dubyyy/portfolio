export interface SanityAuthor {
  _id?: string;
  name: string;
  role?: string;
  avatar?: any;
  bio?: string;
}

export interface SanityCategory {
  _id?: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  mainImage?: any;
  categories?: SanityCategory[];
  author?: SanityAuthor;
  readTime?: string;
  body?: any;
}

