import React from "react";
import { SanityPost } from "@/lib/sanity/types";
import { PostCard } from "./PostCard";

interface RelatedPostsProps {
  currentPostId: string;
  posts: SanityPost[];
}

export function RelatedPosts({ currentPostId, posts }: RelatedPostsProps) {
  const related = posts.filter((p) => p._id !== currentPostId).slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4 pt-10 border-t border-neutral-900">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          More Writing
        </p>
        <h3 className="text-lg font-semibold tracking-tight text-neutral-200">
          Related Articles
        </h3>
      </div>

      <div className="space-y-3">
        {related.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

