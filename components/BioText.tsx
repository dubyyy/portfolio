"use client";

import { AsciiGlitchRipple } from "@/components/ui/ascii-glitch-ripple";

export function BioText({
    children,
}: {
    children: string;
}) {
    return (
        <AsciiGlitchRipple
            as="span"
            dur={1000}
            spread={1.2}
            className="text-base md:text-lg font-mono hover:text-white"
        >
            {children}
        </AsciiGlitchRipple>
    );
}


