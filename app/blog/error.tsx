"use client";

import React from "react";
import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-24 text-center space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Failed to load blog posts
        </h2>
        <p className="text-sm text-neutral-400 font-mono">
          {error?.message || "An unexpected error occurred while fetching posts."}
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono text-xs text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

