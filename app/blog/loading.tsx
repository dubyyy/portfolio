import React from "react";

export default function BlogLoading() {
  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-16 md:py-24 animate-pulse">
        <div className="space-y-8">
          <div className="h-6 w-32 bg-neutral-900 rounded-full" />
          <div className="space-y-3">
            <div className="h-10 w-2/3 bg-neutral-900 rounded-lg" />
            <div className="h-5 w-full bg-neutral-900/60 rounded" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="h-32 bg-neutral-950/60 border border-neutral-900 rounded-2xl" />
            <div className="h-32 bg-neutral-950/60 border border-neutral-900 rounded-2xl" />
            <div className="h-32 bg-neutral-950/60 border border-neutral-900 rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}

