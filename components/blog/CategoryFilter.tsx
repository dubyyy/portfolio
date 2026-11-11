import React from "react";
import Link from "next/link";
import { SanityCategory } from "@/lib/sanity/types";

interface CategoryFilterProps {
  categories: SanityCategory[];
  activeSlug?: string;
}

export function CategoryFilter({
  categories,
  activeSlug,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-3.5 py-1 text-xs font-mono transition-colors ${
          !activeSlug
            ? "bg-neutral-100 text-neutral-900 font-medium"
            : "border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => {
        const isActive = activeSlug === cat.slug?.current;
        return (
          <Link
            key={cat.slug?.current || cat.title}
            href={`/blog/category/${cat.slug?.current}`}
            className={`rounded-full px-3.5 py-1 text-xs font-mono transition-colors ${
              isActive
                ? "bg-neutral-100 text-neutral-900 font-medium"
                : "border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700"
            }`}
          >
            {cat.title}
          </Link>
        );
      })}
    </div>
  );
}

