import React from "react";

export default function PostLoading() {
  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-16 md:py-24 animate-pulse">
        <div className="space-y-8">
          <div className="h-6 w-32 bg-neutral-900 rounded-full" />
          <div className="space-y-4">
            <div className="h-12 w-4/5 bg-neutral-900 rounded-lg" />
            <div className="h-6 w-full bg-neutral-900/60 rounded" />
          </div>
          <div className="h-16 border-y border-neutral-900 bg-neutral-950/40 rounded my-6" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-neutral-900/50 rounded" />
            <div className="h-4 w-5/6 bg-neutral-900/50 rounded" />
            <div className="h-4 w-4/6 bg-neutral-900/50 rounded" />
          </div>
        </div>
      </section>
    </main>
  );
}

