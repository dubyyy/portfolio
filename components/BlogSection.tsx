import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/sanity/queries";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  url?: string;
  isExternal?: boolean;
}

export async function BlogSection({
  posts: initialPosts,
}: {
  posts?: BlogPost[];
}) {
  let displayPosts: BlogPost[] = [];

  if (initialPosts && initialPosts.length > 0) {
    displayPosts = initialPosts;
  } else {
    try {
      const sanityPosts = await getAllPosts();
      displayPosts = sanityPosts.slice(0, 3).map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "Recent",
        readTime: p.readTime || "5 min read",
        tag: p.categories?.[0]?.title || "Article",
        url: `/blog/${p.slug.current}`,
        isExternal: false,
      }));
    } catch {
      displayPosts = [];
    }
  }

  return (
    <section id="blogs" className="scroll-mt-12 space-y-6 pt-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Writing & Insights
          </p>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-200">
            Blogs & Articles
          </h2>
        </div>

        <Link
          href="/blog"
          className="group flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <span>View all</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <div className="space-y-4">
        {displayPosts.length > 0 ? (
          displayPosts.map((post, index) => (
            <Link
              key={index}
              href={post.url || "/blog"}
              target={post.isExternal ? "_blank" : undefined}
              rel={post.isExternal ? "noopener noreferrer" : undefined}
              className="group block rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-700 hover:bg-neutral-900/60"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md border border-neutral-800/80 bg-neutral-900/80 px-2.5 py-0.5 font-mono text-xs text-neutral-400">
                    {post.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    {post.readTime}
                  </span>
                </div>

                <span className="font-mono text-xs text-neutral-500">
                  {post.date}
                </span>
              </div>

              <h3 className="mt-3 text-base sm:text-lg font-semibold text-neutral-100 group-hover:text-white transition-colors flex items-center justify-between gap-2">
                <span>{post.title}</span>

                <svg
                  className="h-4 w-4 shrink-0 text-neutral-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-400">
                {post.excerpt}
              </p>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-neutral-850 bg-neutral-950/40 p-8 text-center border border-neutral-900">
            <p className="font-mono text-xs text-neutral-500">
              No articles published yet. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
