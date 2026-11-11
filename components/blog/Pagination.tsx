import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = "/blog" }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-neutral-900 font-mono text-xs">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          ← Previous
        </Link>
      ) : (
        <span className="text-neutral-700 cursor-not-allowed">← Previous</span>
      )}

      <span className="text-neutral-500">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="text-neutral-700 cursor-not-allowed">Next →</span>
      )}
    </div>
  );
}

