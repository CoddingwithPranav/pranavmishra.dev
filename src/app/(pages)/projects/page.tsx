"use client";
import { useState, useEffect } from "react";
import { getProjects } from "@/app/actions/actions";
import ProjectCard from "@/components/projects/ProjectCard";
import { FaFolder } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
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

// Static fallback data
const fallbackProjects = [
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

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const projectsResult = await getProjects();
    if (projectsResult.success && projectsResult.data && projectsResult.data.length > 0) {
      setProjects(
        projectsResult.data.map((project: any) => ({
          ...project,
          createdAt: typeof project.createdAt === "string" ? project.createdAt : project.createdAt?.toISOString?.() ?? "",
          updatedAt: typeof project.updatedAt === "string" ? project.updatedAt : project.updatedAt?.toISOString?.() ?? "",
        }))
      );
    } else {
      toast.error("Failed to load projects. Displaying sample projects.");
      setProjects(fallbackProjects);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '12px',
            boxShadow: 'var(--shadow-lg)',
          },
          success: {
            style: {
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            },
            iconTheme: {
              primary: 'var(--primary-foreground)',
              secondary: 'var(--primary)',
            },
          },
          error: {
            style: {
              background: 'var(--destructive)',
              color: 'var(--primary-foreground)',
            },
            iconTheme: {
              primary: 'var(--primary-foreground)',
              secondary: 'var(--destructive)',
            },
          },
        }}
      />
      <div className="min-h-screen flex flex-col items-center">
        <div className="flex justify-center flex-col gap-4 mt-40">
          <span className="flex justify-center">
            <FaFolder size={50} color="var(--secondary)" />
          </span>
          <h1 className="text-5xl text-center font-bold text-secondary">
            Curated <span className="text-primary">Projects</span>
          </h1>
          <p className="text-secondary text-center opacity-50">
            Showcase of my projects that I&apos;m proud of.
          </p>
        </div>
        <div className="flex flex-col gap-10 mt-20 w-full max-w-4xl px-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </>
  );
}