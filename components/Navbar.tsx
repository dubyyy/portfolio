"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const DEFAULT_ITEMS: readonly NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
];

/** Scroll distance (px) over which the navbar grows from compact to full width */
const GROW_DISTANCE = 200;

interface SiteHeaderProps {
    className?: string;
    items?: readonly NavItem[];
}

export default function SiteHeader({
    className,
    items = DEFAULT_ITEMS,
}: SiteHeaderProps) {
    const { scrollY } = useScroll();

    // Map scroll position to a 0 → 1 progress value, then smooth it with a spring
    // so the width eases into place instead of tracking the scrollbar rigidly.
    const rawProgress = useTransform(scrollY, [0, GROW_DISTANCE], [0, 1], {
        clamp: true,
    });
    const progress = useSpring(rawProgress, {
        stiffness: 180,
        damping: 28,
        mass: 0.6,
    });

    return (
        <header
            className={cn(
                "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 sm:px-6",
                "top-[max(1rem,env(safe-area-inset-top))] sm:top-[max(1.5rem,env(safe-area-inset-top))] md:top-[max(2rem,env(safe-area-inset-top))]"
            )}
        >
            <motion.div
                style={{
                    // --nav-progress is driven by the spring (no React re-renders on scroll)
                    ["--nav-progress" as string]: progress,
                    // Grow by at most 20% of the base width
                    width: "calc(var(--nav-base) * (1 + 0.2 * var(--nav-progress)))",
                    maxWidth: "100%",
                }}
                className={cn(
                    "pointer-events-auto overflow-hidden will-change-[width]",
                    // responsive base widths (more breathing room on larger screens)
                    "[--nav-base:230px] md:[--nav-base:300px] lg:[--nav-base:340px]",
                    // round border
                    "rounded-full border border-white/10 dark:border-white/15",
                    // subtle glass effect so the border reads over any content
                    "bg-background/60 backdrop-blur-md shadow-lg"
                )}
            >
                <SpotlightNavbar className={cn("w-full", className)} items={[...items]} />
            </motion.div>
        </header>
    );
}
