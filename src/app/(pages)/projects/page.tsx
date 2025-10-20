'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '@/app/actions/project';
import ProjectCard from '@/components/projects/ProjectCard';
import { FaFolder } from 'react-icons/fa';
import IconWrapper from '@/components/shared/IconWrapper';

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


export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const projectsResult = await getProjects();
    if (
      projectsResult.success &&
      projectsResult.data &&
      projectsResult.data.length > 0
    ) {
      setProjects(
        projectsResult.data.map((project: any) => ({
          ...project,
          createdAt:
            typeof project.createdAt === 'string'
              ? project.createdAt
              : (project.createdAt?.toISOString?.() ?? ''),
          updatedAt:
            typeof project.updatedAt === 'string'
              ? project.updatedAt
              : (project.updatedAt?.toISOString?.() ?? ''),
        }))
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center  pb-40">
        <div className="flex justify-center relative z-10  flex-col gap-4 mt-40">
          <span className="flex justify-center">
            <IconWrapper>
              <FaFolder
                size={50}
                color="#07db00"
                className="relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </IconWrapper>
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
            <ProjectCard
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
