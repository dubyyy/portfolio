"use client";

import { useEffect, useState } from "react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const DEFAULT_ITEMS: readonly NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
];

interface SiteHeaderProps {
    className?: string;
    items?: readonly NavItem[];
}

export default function SiteHeader({
    className,
    items = DEFAULT_ITEMS,
}: SiteHeaderProps) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            // Smoothly progress from 0 to 1 over first 150px of scroll
            const progress = Math.min(Math.max(currentScroll / 150, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 sm:px-6",
                "top-[max(1rem,env(safe-area-inset-top))] sm:top-[max(1.5rem,env(safe-area-inset-top))]"
            )}
        >
            <div
                style={{
                    // Smoothly expand width from compact default up to an expanded pill width
                    width: `calc(230px + ${scrollProgress * 250}px)`,
                    maxWidth: "100%",
                    transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className={cn(
                    "pointer-events-auto overflow-hidden",
                    // round border
                    "rounded-full border border-white/10 dark:border-white/15",
                    // subtle glass effect so the border reads over any content
                    "bg-background/60 backdrop-blur-md shadow-lg"
                )}
            >
                <SpotlightNavbar className={cn("w-full", className)} items={[...items]} />
            </div>
        </header>
    );
}