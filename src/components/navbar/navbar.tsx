"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-x-0 max-w-2xl mx-auto z-50 top-10 ",
        className
      )}
    >
      <nav
        className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl shadow-lg rounded-3xl px-8 py-4 flex justify-center border border-primary/20 dark:border-primary/30 transition-all duration-300"
      >
        <ul className="flex gap-12 font-medium text-white dark:text-gray-100">
          <li
            className="text-xl font-semibold cursor-pointer relative group"
          >
            <Link
              href="/"
              className={cn(
                "relative px-2 py-1 transition-all duration-300 group-hover:text-primary dark:group-hover:text-primary",
                pathname === "/" && "text-primary dark:text-primary"
              )}
            >
              Home
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  pathname === "/" && "scale-x-100"
                )}
              ></span>
            </Link>
          </li>
          <li
            className="text-xl font-semibold cursor-pointer relative group"
          >
            <Link
              href="/projects"
              className={cn(
                "relative px-2 py-1 transition-all duration-300 group-hover:text-primary dark:group-hover:text-primary",
                pathname === "/projects" && "text-primary dark:text-primary"
              )}
            >
              Projects
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  pathname === "/projects" && "scale-x-100"
                )}
              ></span>
            </Link>
          </li>
          <li
            className="text-xl font-semibold cursor-pointer relative group"
          >
            <Link
              href="/about"
              className={cn(
                "relative px-2 py-1 transition-all duration-300 group-hover:text-primary dark:group-hover:text-primary",
                pathname === "/about" && "text-primary dark:text-primary"
              )}
            >
              About Me
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                  pathname === "/about" && "scale-x-100"
                )}
              ></span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}