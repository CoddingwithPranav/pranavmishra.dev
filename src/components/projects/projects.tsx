"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions/actions";
import ProjectCard from "./ProjectCard";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";

interface Project {
  id: string;
  name: string;
  description?: string;
  thubnail?: string;
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
          thubnail: project.thubnail || "",
          notionLink: project.notionLink || "",
          githubLink: project.githubLink || "",
          liveLink: project.liveLink || "",
          featured: project.featured || false,
          createdAt: typeof project.createdAt === "string" ? project.createdAt : project.createdAt?.toISOString?.() || new Date().toISOString(),
          updatedAt: typeof project.updatedAt === "string" ? project.updatedAt : project.updatedAt?.toISOString?.() || new Date().toISOString(),
        }));
        // Prioritize featured projects and limit to 3
        const featured = mappedProjects.filter((p) => p.featured).slice(0, 3);
        const nonFeatured = mappedProjects.filter((p) => !p.featured).slice(0, 3 - featured.length);
        setProjects([...featured, ...nonFeatured].slice(0, 3));
      } else {
        toast.error("Failed to load projects.", {
          id: "projects-error",
        });
      }
    };
    loadData();
  }, []);

  return (
    <section className="min-h-screen flex flex-col px-4 sm:px-6 md:px-12 py-8 sm:py-12">
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
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary pb-3 font-semibold">
        Featured <span className="text-primary">Projects</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-secondary pb-6 sm:pb-10 max-w-2xl">
        A selection of projects that I&apos;ve worked on.
      </p>
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} reverse={index % 2 === 1} />
          ))
        ) : (
          <p className="text-center text-muted-foreground text-base sm:text-lg">
            No projects available.
          </p>
        )}
      </div>
      <div className="flex justify-end mt-6 sm:mt-8 md:mt-10">
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