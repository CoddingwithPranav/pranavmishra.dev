"use client";

import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./featureCard";

export default function Feature() {
  return (
    <section className="my-12 sm:my-24 md:my-48 flex flex-col items-center justify-center gap-6 sm:gap-8 sm:px-6 md:px-20">
      {/* Image and Text Container */}
      <motion.div
        className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Image Container */}
        <motion.div
          className="flex flex-col items-center md:items-start pb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative flex-shrink-0 pb-8 sm:pb-10">
            <img
              src="/greenmakeitsimple.svg"
              alt="Feature illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
            />
            {/* Glassmorphic Icon Overlay */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 sm:translate-x-1/2 sm:translate-y-1/2">
              <div
                className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-muted/10 backdrop-blur-md rounded-full border border-border shadow-lg"
                style={{
                  background: `linear-gradient(135deg, var(--background) 0%, var(--muted) 62%, var(--background) 100%)`,
                  borderWidth: "1px",
                }}
              >
                <img
                  src="/bulb.svg"
                  alt="Idea bulb"
                  className="w-10 sm:w-12 h-10 sm:h-12 object-contain text-primary"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            className="max-w-md text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light transition-all duration-300 ease-in-out">
              Four years of shipping production web applications — from Figma handoff to a
              containerised deployment. I care about the parts users never see: predictable state,
              typed contracts, and infrastructure that stays up.
            </p>
          </motion.div>
        </motion.div>

        {/* Section heading */}
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
            What I <span className="text-primary">work on</span>
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <FeatureCard
              title="Full-Stack TypeScript"
              description="End-to-end applications in Angular, React and Next.js, backed by Node.js and Express APIs over PostgreSQL and Prisma."
              rotateDeg={12}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
          >
            <FeatureCard
              title="Agentic AI & MCP"
              description="Model Context Protocol servers, LLM-driven features and prompt-engineered workflows built into real products, not demos."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          >
            <FeatureCard
              title="Real-Time & Infrastructure"
              description="WebSocket and WebRTC systems, containerised with Docker and self-hosted behind nginx and Cloudflare Tunnels."
              rotateDeg={12}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
