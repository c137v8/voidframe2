"use client";

import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface OpenInMapsButtonProps {
    /** Either a human-readable address OR coordinates */
    address?: string;
    lat?: number;
    lng?: number;

    /** Button label text */
    label?: string;

    /** Extra Tailwind classes to style/position it */
    className?: string;
}

export const OpenInMapsButton: React.FC<OpenInMapsButtonProps> = ({
    address,
    lat,
    lng,
    label = "View on Google Maps",
    className,
}) => {
    // Build the Google Maps URL
    let href: string | null = null;

    if (typeof lat === "number" && typeof lng === "number") {
        href = `https://www.google.com/maps?q=${lat},${lng}`;
    } else if (address) {
        href = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    }

    // If neither address nor coords provided, render nothing
    if (!href) return null;

    const handleClick = () => {
        if (typeof window === "undefined") return;
        window.open(href, "_blank", "noopener,noreferrer");
    };

    return (
        <button
        type="button"
        onClick={handleClick}
        className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2",
            "bg-blue-600 text-white text-sm font-medium",
            "hover:bg-blue-700 hover:shadow-lg transition-all duration-200",
            className
        )}
        >
        <MapPinIcon className="h-4 w-4" />
        <span>{label}</span>
        </button>
    );
};
