"use client";

import { FaFacebook, FaGithub } from "react-icons/fa";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="w-full mt-12 sm:mt-16 md:mt-20 py-6 sm:py-8 px-4 sm:px-6 md:px-12">
      <div className="fade_rule w-full max-w-6xl mx-auto"></div>
      <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto pt-8 sm:pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 md:gap-12">
          {/* Personal Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary dark:text-foreground mb-2">
              Pranav Mishra
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-xs mx-auto md:mx-0">
              Help you rebuild and redefine fundamental concepts through mental models.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-primary">
              <a href="https://github.com" aria-label="GitHub">
                <FaGithub className="text-lg sm:text-xl hover:text-foreground transition-colors" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebook className="text-lg sm:text-xl hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 justify-center md:justify-start">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-primary mb-3 text-center sm:text-left">
                General
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-primary mb-3 text-center sm:text-left">
                The Website
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    Bucket List
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    Uses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                    Side Quests
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-medium text-secondary dark:text-foreground mb-3">
              Subscribe to Clarence's blog newsletter
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xs mx-auto md:mx-0">
              Don't miss out 😉. Get an email whenever I post, no spam.
            </p>
            <div className="max-w-xs mx-auto md:mx-0">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 dark:bg-black/10 backdrop-blur-sm border-white/10 dark:border-black/10 text-foreground focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="fade_rule w-full max-w-6xl mx-auto"></div>
        <div className="text-center text-sm sm:text-base text-muted-foreground">
          © 2025 Pranav Mishra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}