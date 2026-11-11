import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getPostsByCategory,
  getAllCategories,
} from "@/lib/sanity/queries";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug.current === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.title} Articles | Michael Dubem Chukwuafu`,
    description: `Articles categorized under ${category.title}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getPostsByCategory(slug),
  ]);

  const currentCategory = categories.find((c) => c.slug?.current === slug);

  if (!currentCategory && posts.length === 0) {
    notFound();
  }

  const categoryTitle = currentCategory?.title || slug;

  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-16 md:py-24">
        <div className="space-y-10">
          {/* Top navigation */}
          <div className="flex items-center justify-between pb-2">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3.5 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
            >
              <span className="text-neutral-500 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-white">
                ←
              </span>
              <span>All Articles</span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Category
            </span>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              {categoryTitle}
            </h1>
            <p className="text-base text-neutral-400">
              {posts.length} {posts.length === 1 ? "article" : "articles"} in this category
            </p>
          </div>

          {/* Categories Filter */}
          <CategoryFilter categories={categories} activeSlug={slug} />

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-sm text-neutral-500 font-mono py-8">
                No articles published in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

