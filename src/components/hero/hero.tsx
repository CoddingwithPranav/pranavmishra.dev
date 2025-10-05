"use client";
import { CometCardDemo } from "./card";
import { FaGithub, FaTwitter, FaLinkedin, FaFile } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com" },
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://linkedin.com" },
    { name: "Resume", icon: <FaFile />, href: "/resume.pdf" },
  ];

  return (
    <section className="min-h-screen flex flex-col md:flex-row gap-8 justify-center items-center  px-6 md:px-20 py-10">
      <div className="p-8 md:p-12 max-w-lg  transition-all duration-300">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary dark:text-primary mt-4 tracking-tight">
          I'm Pranav
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-md leading-relaxed">
          I work with the React Ecosystem, crafting solutions and writing to teach people how to rebuild and redefine fundamental concepts through mental models.
        </p>
        <div className="flex gap-4 mt-6">
          <Button
            asChild
            variant="outline"
            className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-primary/30 rounded-xl transition-all duration-300"
          >
            <Link href="/projects">Projects</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20 rounded-xl transition-all duration-300"
          >
            <Link href="/about">About Me</Link>
          </Button>
        </div>
        <div className="flex gap-4 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-md">
        <CometCardDemo />
      </div>
    </section>
  );
}