"use client";
import React from "react";

import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-beam";

export function TracingBeamDemo({children}: {children?: React.ReactNode}) {
  return (
    <TracingBeam className="px-6">
      {children}
    </TracingBeam>
  );
}

