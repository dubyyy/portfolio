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
    return (
        <header
            className={cn(
                "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 sm:px-6",
                "top-[max(1rem,env(safe-area-inset-top))] sm:top-[max(1.5rem,env(safe-area-inset-top))]"
            )}
        >
            <div
                className={cn(
                    "pointer-events-auto max-w-full overflow-hidden",
                    // round border
                    "rounded-full border border-white/10 dark:border-white/15",
                    // subtle glass effect so the border reads over any content
                    "bg-background/60 backdrop-blur-md shadow-lg"
                )}
            >
                <SpotlightNavbar className={className} items={[...items]} />
            </div>
        </header>
    );
}