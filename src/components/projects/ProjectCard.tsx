"use client";

import { FaLink } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:gap-4 md:gap-5 py-3 sm:py-4",
        reverse ? "sm:flex-row-reverse" : "sm:flex-row",
        "bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
      )}
    >
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-secondary font-semibold pb-2">
          {project.name}
        </h1>
        <div
          className="prose prose-sm text-base sm:text-lg text-secondary pb-2 dark:text-secondary"
          dangerouslySetInnerHTML={{ __html: project.description || "No description available." }}
        />
        {project.featured && (
          <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs sm:text-sm rounded-full shadow-sm mb-3 sm:mb-4">
            Featured
          </span>
        )}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {(project.notionLink || project.liveLink) && (
            <Button
              variant="outline"
              asChild
              className="text-sm sm:text-base bg-white/5 dark:bg-black/10 hover:bg-primary/10"
            >
              {project.notionLink ? (
                <Link href={`/notion/${project.id}`}>View Project</Link>
              ) : (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="link"
              asChild
              className="text-sm sm:text-base text-primary hover:text-primary/80 flex items-center gap-2"
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <FaLink /> View Code
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 sm:mt-0">
        <img
          src={project.thubnail || "https://via.placeholder.com/150"}
          alt={`${project.name} thumbnail`}
          className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 object-cover rounded-lg border border-border"
        />
      </div>
    </div>
  );
}