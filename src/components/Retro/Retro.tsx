"use client";

import { getAboutMe } from "@/app/actions/aboutMe";
import { getRetrospectives } from "@/app/actions/retrospective";
import { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import RetroCard from "./RetroCard";

interface Retrospective {
  id: string;
  year: string;
  title: string;
  description: string;
  views: number;
  aboutMeId: string;
}

export default function Retro() {
  const [retrospectives, setRetrospectives] = useState<Retrospective[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const aboutMeResult = await getAboutMe();
      if (aboutMeResult.success && aboutMeResult.data) {
        const aboutMeId = aboutMeResult.data.id;
        const result = await getRetrospectives(aboutMeId);
        if (result.success && result.data) {
          setRetrospectives(result.data.slice(0, 3)); // Limit to last 3 retrospectives
        } else {
          toast.error(result.error || "Failed to load retrospectives", {
            id: "retro-error",
          });
        }
      } else {
        toast.error("Failed to load About Me data", {
          id: "about-error",
        });
      }
    };
    loadData();
  }, []);

  return (
    <section className="min-h-screen flex flex-col px-4 sm:px-6 md:px-12 py-12">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "12px",
            boxShadow: "var(--shadow-lg)",
          },
          success: {
            style: {
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            },
            iconTheme: {
              primary: "var(--primary-foreground)",
              secondary: "var(--primary)",
            },
          },
          error: {
            style: {
              background: "var(--destructive)",
              color: "var(--primary-foreground)",
            },
            iconTheme: {
              primary: "var(--primary-foreground)",
              secondary: "var(--destructive)",
            },
          },
        }}
      />
      <div className="flex flex-col mb-8 max-w-4xl mx-auto">
        <span className="text-secondary opacity-50 text-sm sm:text-base">
          the yearly
        </span>
        <h1 className="text-primary text-4xl sm:text-5xl md:text-6xl font-semibold">
          Retro
        </h1>
        <p className="text-secondary text-lg sm:text-xl md:text-2xl mt-2">
          Every year, I share my progress both in career and personal life. Here's
          last 3 years of them.
        </p>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {retrospectives.length > 0 ? (
          retrospectives.map((retro) => (
            <RetroCard key={retro.id} {...retro} />
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            No retrospectives available.
          </p>
        )}
      </div>
    </section>
  );
}