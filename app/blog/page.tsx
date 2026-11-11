import React from "react";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/sanity/queries";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";


export const metadata = {
  title: "Blog & Writing | Michael Dubem Chukwuafu",
  description: "Articles and insights on software engineering, InfoSec, AI, and blockchain.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-16 md:py-24">
        <div className="space-y-10">
          {/* Top navigation */}
          <div className="flex items-center justify-between pb-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3.5 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
            >
              <span className="text-neutral-500 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-white">
                ←
              </span>
              <span>Back to Portfolio</span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Writing & Articles
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Blog & Thoughts
            </h1>
            <p className="text-base text-neutral-400">
              Insights, technical post-mortems, and architectural deep dives into
              software systems, cloud infrastructure, InfoSec, and AI.
            </p>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <CategoryFilter categories={categories} />
          )}

          {/* Posts list */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-12 text-center">
                <p className="font-mono text-xs text-neutral-500">
                  No articles published yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
