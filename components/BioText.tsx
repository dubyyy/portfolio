"use client";

import { useEffect, useState } from "react";
import { AsciiGlitchRipple } from "@/components/ui/ascii-glitch-ripple";

export function BioText({
    children,
}: {
    children: string;
}) {
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS (iPhone, iPad, iPod)
        const isIOSDevice =
            /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        setIsIOS(isIOSDevice);
    }, []);

    // On iOS devices, render clean static text without glitch ripple
    if (isIOS) {
        return (
            <span className="text-base md:text-lg font-mono text-neutral-400">
                {children}
            </span>
        );
    }

    // On non-iOS devices (desktop/laptops/Android/etc.), run full ASCII glitch ripple effect
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

