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

// Static fallback data
const fallbackProjects: Project[] = [
  {
    id: "static-1",
    name: "Hexcap",
    description: "A game that combines ISO and physical puzzle game, using 3D, 360 world view, and AR",
    thubnail: "https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-applify.png",
    githubLink: "https://github.com/example/hexcap",
    liveLink: "https://hexcap.example.com",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "static-2",
    name: "Portfolio",
    description: "A personal portfolio showcasing my projects and skills",
    thubnail: "https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-applify.png",
    githubLink: "https://github.com/example/portfolio",
    liveLink: "https://portfolio.example.com",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "static-3",
    name: "Task Manager",
    description: "A task management app with real-time collaboration features",
    thubnail: "https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-applify.png",
    githubLink: "https://github.com/example/task-manager",
    liveLink: "https://taskmanager.example.com",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

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
        toast.error("Failed to load projects. Displaying sample projects.", {
          id: "projects-error",
        });
        setProjects(fallbackProjects);
      }
    };
    loadData();
  }, []);

  return (
    <section className="min-h-screen flex flex-col">
      <h1 className="text-6xl text-secondary pb-3 font-semibold">
        Featured <span className="text-primary">Projects</span>
      </h1>
      <p className="text-2xl text-secondary pb-10">A selection of projects that I&apos;ve worked on.</p>
      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} reverse={index % 2 === 1} />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          className="mt-10"
          variant="link"
          asChild
        >
          <a href="/projects" className="text-primary">
            View All Projects...
          </a>
        </Button>
      </div>
    </section>
  );
}