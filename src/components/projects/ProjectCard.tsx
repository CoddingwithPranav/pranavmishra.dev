import { FaLink } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
        "flex pb-1 justify-between pt-3 gap-5",
        reverse ? "flex-row-reverse" : "flex-row",
        "bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-xl p-4 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
      )}
    >
      <div className="flex-1">
        <h1 className="text-secondary font-semibold text-3xl pb-1">{project.name}</h1>
        <p className="text-secondary pb-1">{project.description || "No description available."}</p>
        {project.featured && (
          <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded-full shadow-sm mb-4">
            Featured
          </span>
        )}
        <div className="flex gap-4">
          {project.liveLink && (
            <Button variant="outline" asChild>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button variant="link" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary"
              >
                <FaLink /> View Code
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={project.thubnail || "https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-applify.png"}
          alt={`${project.name} thumbnail`}
          className="w-48 h-48 object-cover rounded-lg border border-border"
        />
      </div>
    </div>
  );
}