"use client";

import React, { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  let theme = "dark";
  const backgroundStyle =
    theme === "dark"
      ? {
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000", 
        }
      : {
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(56, 193, 182, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        };

    console.log("Background style:", backgroundStyle);

  // Outer wrapper
  return (
    <div className="min-h-screen w-full relative ">
      {/* Background */}
      <div className="absolute inset-0 z-0" style={backgroundStyle} />
      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
