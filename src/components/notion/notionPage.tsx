"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/app/actions/actions";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

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

export default function NotionPage() {

  
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const projectsResult = await getProjects();
      if (projectsResult.success && projectsResult.data?.length) {
        const foundProject = projectsResult.data.find((p: any) => p.id === projectId);
        if (foundProject) {
          setProject({
            id: foundProject.id,
            name: foundProject.name,
            description: foundProject.description || "",
            thubnail: foundProject.thumbnail || "",
            notionLink: foundProject.notionLink || "",
            githubLink: foundProject.githubLink || "",
            liveLink: foundProject.liveLink || "",
            featured: foundProject.featured || false,
            createdAt:
              typeof foundProject.createdAt === "string"
                ? foundProject.createdAt
                : foundProject.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt:
              typeof foundProject.updatedAt === "string"
                ? foundProject.updatedAt
                : foundProject.updatedAt?.toISOString?.() || new Date().toISOString(),
          });
        } else {
          toast.error("Project not found.", { id: "project-error" });
        }
      } else {
        toast.error("Failed to load project data.", { id: "projects-error" });
      }
    };
    loadData();
  }, [projectId]);

  if (!project || !project.notionLink) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-8 sm:py-12">
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
        <p className="text-center text-muted-foreground text-base sm:text-lg">
          {project ? "No Notion document available for this project." : "Loading..."}
        </p>
        <Button
          variant="link"
          asChild
          className="mt-4 text-base sm:text-lg text-primary hover:text-primary/80"
        >
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </section>
    );
  }

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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary font-semibold mb-4 sm:mb-6">
          {project.name}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          {project.githubLink && (
            <Button
              variant="link"
              asChild
              className="text-base sm:text-lg text-primary hover:text-primary/80 flex items-center gap-2"
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <FaLink /> View Code
              </a>
            </Button>
          )}
          <Button
            variant="link"
            asChild
            className="text-base sm:text-lg text-primary hover:text-primary/80"
          >
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
        <div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10 dark:border-black/10 rounded-xl overflow-hidden">
          <iframe
            src={project.notionLink}
            className="w-full h-full border-0"
            title={`${project.name} Notion Document`}
          />
        </div>
      </div>
    </section>
  );
}