import React from "react";
import Link from "next/link";
import { SanityPost } from "@/lib/sanity/types";

interface PostCardProps {
  post: SanityPost;
}

export function PostCard({ post }: PostCardProps) {
  const primaryCategory = post.categories?.[0]?.title || "Article";
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-700 hover:bg-neutral-900/60"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="rounded-md border border-neutral-800/80 bg-neutral-900/80 px-2.5 py-0.5 font-mono text-xs text-neutral-400">
            {primaryCategory}
          </span>
          {post.readTime && (
            <span className="font-mono text-xs text-neutral-500">
              {post.readTime}
            </span>
          )}
        </div>

        <span className="font-mono text-xs text-neutral-500">
          {formattedDate}
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

      {post.excerpt && (
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}

