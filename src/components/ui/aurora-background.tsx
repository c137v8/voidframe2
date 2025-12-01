"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  slideshowInterval?: number; // seconds
}

export const AuroraBackground = ({
  className,
  children,
  slideshowInterval = 600,
  ...props
}: AuroraBackgroundProps) => {
  const images = [ "/image1.png", "/image2.png", "/image5.jpg"  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideshowInterval * 1000);
    return () => clearInterval(interval);
  }, [slideshowInterval]);

  return (
    <main>
    <div
    className={cn(
      "relative flex flex-col h-[100vh] items-center justify-center bg-black text-white transition-bg overflow-hidden",
      className
    )}
    {...props}
    >
    {/* Background images slideshow */}
    <div className="absolute inset-0">
    {images.map((src, index) => (
      <Image
      key={index}
      src={src}
      alt={`Background ${index + 1}`}
      fill
      priority={index === 0}
      className={cn(
        "object-cover transition-opacity duration-[2000ms]",
        index === currentIndex ? "opacity-100" : "opacity-0"
      )}
      />
    ))}
    </div>

    {/* Main content */}
    <div className="relative z-0">{children}</div>
    </div>
    </main>
  );
};
