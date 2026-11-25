import React from "react";
import Link from "next/link";
import {
  PortableText as PortableTextRenderer,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { siteUrl } from "@/lib/site";
import {
  getImageDimensions,
  sanityImageSrcSet,
  sanityImageUrl,
} from "@/lib/sanity/image";

interface PortableTextProps {
  content: unknown;
}

/** Turn absolute links to this site into relative paths so they use client-side navigation. */
function toInternalPath(href: string): string | null {
  if (href.startsWith("/") || href.startsWith("#")) return href;
  if (href.startsWith(siteUrl)) return href.slice(siteUrl.length) || "/";
  return null;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-8 text-neutral-300">{children}</p>,
    // The post title is the page's only <h1>; body "H1" blocks render as <h2> for a clean outline.
    h1: ({ children }) => (
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-10 mb-4">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 mt-6 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-white mt-5 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-sm sm:text-base font-semibold tracking-tight text-neutral-200 mt-4 mb-2">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-neutral-300 mt-4 mb-1">
        {children}
      </h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-neutral-600 pl-4 my-4 italic text-neutral-400">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 marker:text-neutral-500">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 marker:text-neutral-500">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => (
      <code className="rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-200">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href || "";
      if (!href) return <>{children}</>;

      const className =
        "font-medium text-white underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-white";
      const internal = toInternalPath(href);

      if (internal) {
        return (
          <Link href={internal} className={className}>
            {children}
          </Link>
        );
      }

      const openInNewTab = value?.blank ?? true;
      return (
        <a
          href={href}
          className={className}
          {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const src = sanityImageUrl(value, { width: 1080 });
      if (!src) return null;
      const dims = getImageDimensions(value);

      return (
        <figure className="my-8 overflow-hidden rounded-xl border border-neutral-800">
          {/* Sanity's CDN handles resizing + format (auto=format), so next/image isn't needed */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            srcSet={sanityImageSrcSet(value)}
            sizes="(min-width: 768px) 768px, 100vw"
            width={dims?.width}
            height={dims?.height}
            alt={value?.alt || ""}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
          {value?.caption && (
            <figcaption className="p-2 text-center text-xs text-neutral-500 font-mono">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-sm text-neutral-300 my-6">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export function PortableText({ content }: PortableTextProps) {
  if (!content) return null;

  if (typeof content === "string") {
    return <p className="leading-7 text-neutral-300">{content}</p>;
  }

  if (!Array.isArray(content)) return null;
  const blocks = content as PortableTextBlock[];

  return (
    <div className="space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg">
      <PortableTextRenderer value={blocks} components={components} />
    </div>
  );
}
