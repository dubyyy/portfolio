import React from "react";
import { SanityAuthor } from "@/lib/sanity/types";

interface AuthorBoxProps {
  author?: SanityAuthor;
  date?: string;
  readTime?: string;
}

export function AuthorBox({ author, date, readTime }: AuthorBoxProps) {
  const authorName = author?.name || "Michael Dubem Chukwuafu";
  const authorRole = author?.role || "Software & Cloud Engineer";
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4 py-4 border-y border-neutral-900">
      <div className="h-11 w-11 shrink-0 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono text-sm font-semibold text-neutral-300">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <p className="text-sm font-medium text-neutral-200">{authorName}</p>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            {date && <span>{date}</span>}
            {date && readTime && <span>·</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        </div>
        <p className="text-xs text-neutral-400 truncate">{authorRole}</p>
      </div>
    </div>
  );
}

