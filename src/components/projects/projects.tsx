"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions/project";
import ProjectCard from "./ProjectCard";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  notionLink?: string;
  githubLink?: string;
  liveLink?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const projectsResult = await getProjects();
      if (projectsResult.success && projectsResult.data?.length) {
        const mappedProjects = projectsResult.data.map((project: any) => ({
          id: project.id,
          name: project.name,
          description: project.description || "",
          thumbnail: project.thumbnail || "",
          notionLink: project.notionLink || "",
          githubLink: project.githubLink || "",
          liveLink: project.liveLink || "",
          featured: project.featured || false,
          createdAt:
            typeof project.createdAt === "string"
              ? project.createdAt
              : project.createdAt?.toISOString?.() || new Date().toISOString(),
          updatedAt:
            typeof project.updatedAt === "string"
              ? project.updatedAt
              : project.updatedAt?.toISOString?.() || new Date().toISOString(),
        }));
        const featured = mappedProjects.filter((p) => p.featured).slice(0, 3);
        const nonFeatured = mappedProjects.filter((p) => !p.featured).slice(0, 3 - featured.length);
        setProjects([...featured, ...nonFeatured].slice(0, 3));
      }
    };
    loadData();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-12 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl text-center sm:text-left"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary font-semibold pb-3">
          Featured <span className="text-primary">Projects</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary pb-6 sm:pb-10 max-w-3xl mx-auto sm:mx-0">
          A selection of projects that I&apos;ve worked on.
        </p>
      </motion.div>

      {/* Project Cards */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full max-w-5xl">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
            >
              <ProjectCard project={project} reverse={index % 2 === 1} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-muted-foreground text-sm sm:text-base md:text-lg">
            No projects available.
          </p>
        )}
      </div>

      {/* See more button */}
      <div className="flex justify-center sm:justify-end mt-6 sm:mt-8 md:mt-10 w-full max-w-5xl">
        <Button
          variant="link"
          asChild
          className="text-base sm:text-lg text-primary hover:text-primary/80"
        >
          <a href="/projects">See More Projects...</a>
        </Button>
      </div>
    </section>
  );
}
