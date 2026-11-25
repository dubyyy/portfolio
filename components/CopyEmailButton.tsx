"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is not available
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-950 shadow-[0_8px_24px_-12px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.6)] active:translate-y-0"
      title="Copy email address"
      aria-label="Copy email address"
    >
      {copied ? (
        <>
          <svg
            className="h-4 w-4 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-emerald-700">Copied!</span>
        </>
      ) : (
        <>
          <svg
            className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-neutral-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span>Copy Email</span>
        </>
      )}
    </button>
  );
}

