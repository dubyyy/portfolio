
import { Suspense } from "react";
import { BioText } from "@/components/BioText";
import { SocialLinks } from "@/components/SocialLinks";
import { Experience } from "@/components/Experience";
import { BlogSection } from "@/components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center px-6">
      <section className="w-full max-w-3xl py-16 md:py-24">
        <div className="space-y-12">
          {/* Aesthetic top bar with obvious link to blogs section */}
          <div className="flex items-center justify-between pb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Michael Dubem Chukwuafu
            </span>

            <a
              href="#blogs"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-3.5 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:shadow-black/50"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              <span>Blog & Articles</span>
              <span className="text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white">
                →
              </span>
            </a>
          </div>

          <div className="space-y-6">
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-500">
              Software Engineer · Solutions Architect · Engineer & Cloud Specialist
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.03em] leading-[1.15] text-neutral-300">
              Building Complicated Systems{" "}

            </h1>

            <div className="text-base md:text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              <BioText>
                I'm Michael Dubem Chukwuafu, a software engineer and Computer
                Engineering student passionate about building useful
                products and solving real-world problems through
                technology.

              </BioText>
            </div>
          </div>

          <SocialLinks />

          <Experience />

          <Suspense
            fallback={
              <div className="space-y-4 pt-2">
                <div className="h-6 w-32 bg-neutral-900 rounded" />
                <div className="h-28 rounded-2xl border border-neutral-900 bg-neutral-950/40 animate-pulse" />
              </div>
            }
          >
            <BlogSection />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
