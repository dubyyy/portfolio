import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/sanity/queries";
import { PortableText } from "@/components/blog/PortableText";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { JsonLd } from "@/components/blog/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Michael Dubem Chukwuafu`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  const category = post.categories?.[0];

  return (
    <>
      <JsonLd post={post} />
      <main className="min-h-screen flex justify-center px-6">
        <article className="w-full max-w-3xl py-16 md:py-24">
          <div className="space-y-8">
            {/* Top Bar */}
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

              {category && (
                <Link
                  href={`/blog/category/${category.slug.current}`}
                  className="rounded-md border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 font-mono text-xs text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  {category.title}
                </Link>
              )}
            </div>

            {/* Title & Excerpt */}
            <header className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.2]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Author info */}
            <AuthorBox
              author={post.author}
              date={formattedDate}
              readTime={post.readTime}
            />

            {/* Content Body */}
            <div className="pt-2">
              <PortableText content={post.body} />
            </div>

            {/* Related Posts */}
            <RelatedPosts currentPostId={post._id} posts={allPosts} />
          </div>
        </article>
      </main>
    </>
  );
}

