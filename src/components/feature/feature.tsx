"use client";

import React from 'react';
import FeatureCard from './featureCard';

export default function Feature() {
  return (
    <section className="my-12 sm:my-24 md:my-48 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-20">
      {/* Image and Text Container */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
        {/* Image Container */}
        <div className="flex flex-col items-center md:items-start pb-5">
          <div className="relative flex-shrink-0 pb-8 sm:pb-10">
            <img
              src="./makeitsimple.svg"
              alt="Feature illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
            />
            {/* Glassmorphic Icon Overlay */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 sm:translate-x-1/2 sm:translate-y-1/2">
              <div
                className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-muted/10 backdrop-blur-md rounded-full border border-border shadow-lg"
                style={{
                  background: `linear-gradient(135deg, var(--background) 0%, var(--muted) 62%, var(--background) 100%)`,
                  borderWidth: '1px',
                }}
              >
                <img
                  src="./bulb.svg"
                  alt="Idea bulb"
                  className="w-10 sm:w-12 h-10 sm:h-12 object-contain text-primary"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="max-w-md text-center md:text-left">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light transition-all duration-300 ease-in-out">
            I’m exploring how design, technology, and storytelling intersect — experimenting with ideas that make digital experiences more intuitive and human.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          <FeatureCard title='🧩 Creative Development' description='Building interactive experiences that blend motion, design, and code to tell meaningful stories.' key="card-1" rotateDeg={12} />
          <FeatureCard  title='⚙️ Learning by Experimenting' description='Testing small projects and prototypes to understand how users engage with design details.' key="card-2" />
          <FeatureCard title='💬 Sharing the Process' description='Writing and reflecting on what I learn — from creative challenges to technical problem-solving.' key="card-3" rotateDeg={12} />
        </div>
      </div>
    </section>
  );
}