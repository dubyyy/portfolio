import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Projects | Michael Dubem Chukwuafu",
  description: "Projects built by Michael Dubem Chukwuafu",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex justify-center px-4 sm:px-6">
      <Navbar />
      <section className="w-full max-w-3xl pt-24 pb-16 sm:py-20 md:py-24">
        <div className="space-y-10">
          {/* Top navigation */}
          <div className="flex items-center justify-between pb-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3.5 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
            >
              <span className="text-neutral-500 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-white">
                ←
              </span>
              <span>Back to Portfolio</span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Selected Work
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Projects
            </h1>
            <p className="text-base text-neutral-400">
              Things I&apos;ve built, shipped, and experimented with.
            </p>
          </div>

          {/* Projects list (empty state for now) */}
          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-12 text-center">
            <p className="font-mono text-xs text-neutral-500">
              No projects published yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
