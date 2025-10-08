"use client";
import { useState, useEffect } from "react";
import { getAboutMe } from "@/app/actions/aboutMe";
import { MdAccountCircle } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { AiOutlineStock } from "react-icons/ai";
import { IoBagRemoveSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface AboutMe {
  id: string;
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
  techStack?: string[];
  currentActivities?: string[];
  retrospectives?: Array<{
    year: string;
    title: string;
    description: string;
    views: number;
  }>;
  experiences?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
  }>;
}

// Static fallback data
const fallbackAboutMe: AboutMe = {
  id: "static-1",
  name: "Pranav Mishra",
  title: "Founding Full-stack Engineer at Dimension",
  bio: "Hello! You can call me Clarence. I am a Software Engineer who works with the React ecosystem and writes to teach people how to rebuild and redefine fundamental concepts through mental models. I was born in 2001 in Jakarta, Indonesia. When the pandemic hit 5 years ago, my university was closed for a few weeks, and I started to learn web development, especially front-end development, out of boredom. As part of my learning journey, I started writing blog articles as a way to solidify my knowledge. When I posted them here as documentation, I discovered that many people found them valuable. Hopefully, it can help you too. I am also a full-stack engineer, here are my current favorite tech stack:",
  profileImage: "https://avatars.githubusercontent.com/u/22481268?v=4",
  techStack: ["Angular", "Next.js"],
  currentActivities: [
    "I'm a full-stack engineer at Dimension while working remotely from Jakarta, Indonesia",
    "I regularly solo travel, usually for 2 weeks at a time ✈️. I've been doing it for so far",
    "I'm currently building a portfolio curation platform for Indonesian software engineers on softwareengineer.id",
    "I'm a mentor! I do revision-style mentorship",
  ],
  retrospectives: [
    {
      year: "2024",
      title: "The 2024 Retrospective",
      description: "First Full-Time Year, Solo Travel while Working, Socializing, and more!",
      views: 2030,
    },
    {
      year: "2023",
      title: "The 2023 Retrospective",
      description: "Graduation, Tech Writing, First Job, Mentorship, and more!",
      views: 3020,
    },
  ],
  experiences: [
    {
      title: "Founding Full-Stack Engineer",
      company: "Dimension",
      startDate: "SEP 2023",
      endDate: "PRESENT",
      description:
        "Dimension is a collaboration platform for modern engineering teams. It bridges the gap between communication, cloud, code, projects, and more—with an incredible developer experience.",
      achievements: [
        "Led the rewrite from the MVP version, which was previously fragile with numerous bugs and technical debt. Convinced the team to transition to a new monorepo project with a solid foundation, ensuring code quality and developing conventions to maintain consistency and reliability across the team.",
        "Led the transition of the application to a local-first setup using IndexedDB, significantly improving speed by reducing query and update times from about 500ms to nearly instant (around 5ms).",
        "Developed a comprehensive front-end design system with well-structured and easy-to-use APIs, equipped with accessibility and keyboard navigation. This system has been praised by colleagues for enhancing the development experience and accelerating feature development.",
      ],
    },
  ],
};

export default function AboutPage() {
  const [aboutMe, setAboutMe] = useState<AboutMe>(fallbackAboutMe);

  useEffect(() => {
    const loadData = async () => {
      const aboutResult = await getAboutMe();
      if (aboutResult.success && aboutResult.data) {
        setAboutMe({
          id: aboutResult.data.id || fallbackAboutMe.id,
          name: aboutResult.data.name || fallbackAboutMe.name,
          title: fallbackAboutMe.title,
          bio: fallbackAboutMe.bio,
          profileImage: fallbackAboutMe.profileImage,
          techStack:  fallbackAboutMe.techStack,
          currentActivities: fallbackAboutMe.currentActivities,
          retrospectives: fallbackAboutMe.retrospectives,
          experiences: fallbackAboutMe.experiences,
        });
      } else {
        toast.error("Failed to load about me data. Displaying sample data.", {
          id: "about-error",
        });
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-36">
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

      <div className="text-center max-w-2xl mb-16">
        <span className="flex justify-center mb-4">
          <MdAccountCircle
            size={60}
            className="text-primary dark:text-foreground"
            aria-label="Profile icon"
          />
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed font-light">
          A story of growth and discovery.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-20 max-w-4xl w-full">
        <div className="flex-shrink-0">
          <div className="featured-img">
            <img
              src={aboutMe.profileImage}
              alt={`${aboutMe.name} profile`}
              className="w-48 object-cover rounded-[var(--radius-lg)] shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-secondary dark:text-foreground mb-4">
            {aboutMe.name}
          </h1>
          <span className="text-muted-foreground mb-4 block">{aboutMe.title}</span>
          <p className="text-muted-foreground leading-relaxed mb-4">{aboutMe.bio}</p>
          <div className="flex gap-4 text-primary">
            {(aboutMe.techStack ?? []).map((tech, index) => (
              <span key={index} className="text-lg">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex mt-10 flex-col md:flex-row items-start justify-between gap-8 mx-auto py-10 px-6 rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 shadow-md transition-all">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <span className="text-2xl text-primary">
            <CiCircleQuestion aria-label="Current activities icon" />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">What I'm up to now</h2>
        </div>
        <div className="w-full">
          <ul className="space-y-4 text-muted-foreground">
            {(aboutMe.currentActivities ?? []).map((activity, index) => (
              <li key={index} className="flex items-center gap-2">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 py-20">
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <span className="text-3xl text-primary">
            <AiOutlineStock aria-label="Growth icon" />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">Learn about my growth</h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            Every year, I share my progress both in career and personal life. Here's how it's going
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {(aboutMe.retrospectives ?? []).map((retro, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 hover:shadow-md transition-shadow p-4 rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30"
            >
              <span className="flex items-center gap-2 text-primary">
                <FaEye className="text-lg" aria-label="Views icon" /> {retro.views.toLocaleString()} views
              </span>
              <h3 className="text-xl font-medium text-secondary">{retro.title}</h3>
              <p className="text-muted-foreground font-light">{retro.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-5xl mx-auto px-6 mt-10">
        <div className="w-full text-center">
          <span className="flex justify-center mb-2">
            <IoBagRemoveSharp className="text-3xl text-primary" aria-label="Experiences icon" />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">Experiences</h2>
        </div>
        <div className="flex flex-col gap-6">
          {(aboutMe.experiences ?? []).map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-muted-foreground">
                {exp.startDate} - {exp.endDate || "PRESENT"}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-secondary mb-2">{exp.title}</h1>
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <ul className="space-y-3 text-muted-foreground">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}