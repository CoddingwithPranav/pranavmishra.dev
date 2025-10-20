"use client";

import { getAboutMe } from "@/app/actions/aboutMe";
import { getRetrospectives } from "@/app/actions/retrospective";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
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
      }
    };
    loadData();
  }, []);

  return (
    <section className="min-h-screen flex items-center flex-col md:px-12 py-12">
      {/* Header */}
      <motion.div
        className="flex flex-col mb-8 text-center md:text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.div>

      {/* Retrospective Cards */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {retrospectives.length > 0 ? (
          retrospectives.map((retro, index) => (
            <motion.div
              key={retro.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            >
              <RetroCard {...retro} />
            </motion.div>
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
