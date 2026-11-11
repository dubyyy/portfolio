import React from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/client";

interface PortableTextProps {
  content: any;
}

export function PortableText({ content }: PortableTextProps) {
  if (!content) return null;

  // If content is simple string
  if (typeof content === "string") {
    return <p className="leading-7 text-neutral-300">{content}</p>;
  }

  // If array of blocks
  if (Array.isArray(content)) {
    return (
      <div className="space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg">
        {content.map((block, idx) => {
          if (block._type === "block") {
            const text = block.children?.map((child: any) => child.text).join("") || "";
            if (!text.trim()) return null;

            switch (block.style) {
              case "h1":
                return (
                  <h1
                    key={idx}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-10 mb-4"
                  >
                    {text}
                  </h1>
                );
              case "h2":
                return (
                  <h2
                    key={idx}
                    className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-8 mb-3"
                  >
                    {text}
                  </h2>
                );
              case "h3":
                return (
                  <h3
                    key={idx}
                    className="text-lg sm:text-xl font-medium tracking-tight text-neutral-100 mt-6 mb-2"
                  >
                    {text}
                  </h3>
                );
              case "blockquote":
                return (
                  <blockquote
                    key={idx}
                    className="border-l-2 border-neutral-600 pl-4 my-4 italic text-neutral-400"
                  >
                    {text}
                  </blockquote>
                );
              default:
                return (
                  <p key={idx} className="leading-8 text-neutral-300">
                    {text}
                  </p>
                );
            }
          }

          if (block._type === "image") {
            const imageUrl = urlForImage(block);
            if (!imageUrl) return null;
            return (
              <figure key={idx} className="my-8 overflow-hidden rounded-xl border border-neutral-800">
                <img
                  src={imageUrl}
                  alt={block.alt || "Blog image"}
                  className="w-full h-auto object-cover"
                />
                {block.caption && (
                  <figcaption className="p-2 text-center text-xs text-neutral-500 font-mono">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (block._type === "code") {
            return (
              <pre
                key={idx}
                className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-sm text-neutral-300 my-6"
              >
                <code>{block.code || block.children?.[0]?.text}</code>
              </pre>
            );
          }

          return null;
        })}
      </div>
    );
  }

  return null;
}

