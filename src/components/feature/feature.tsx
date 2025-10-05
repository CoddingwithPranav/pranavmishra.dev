"use client";
import React from 'react';
import { LampContainer } from '../ui/lamp';
import { motion } from "motion/react";

export default function Feature() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-20 ">
      {/* Image Container */}
      <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=""
      >
        <div className="relative flex-shrink-0 ">
        <img 
          src="./makeitsimple.svg" 
          alt="Feature illustration" 

          className="w-full max-w-md h-auto object-contain"
        />
        {/* Glassmorphic Icon Overlay */}
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 sm:translate-x-1/2 sm:translate-y-1/2">
          <div 
            className="relative w-20 h-20 flex items-center justify-center bg-muted/10 backdrop-blur-md rounded-full border border-border shadow-lg"
            style={{
              background: `linear-gradient(135deg, var(--background) 0%, var(--muted) 62%, var(--background) 100%)`,
              borderWidth: '1px',
            }}
          >
            <img 
              src="./bulb.svg" 
              alt="Idea bulb" 
              className="w-12 h-12 object-contain text-primary"
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md text-center md:text-left">
        <p className="text-lg text-muted-foreground leading-relaxed font-light transition-all duration-300 ease-in-out">
          I'm sharing how I approach something and how my mental model affects my learning about a certain topic.
        </p>
      </div>
      </motion.h1>
    </LampContainer>
     
    </section>
  );
}