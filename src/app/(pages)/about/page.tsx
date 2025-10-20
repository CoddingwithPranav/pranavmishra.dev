'use client';

import { useState, useEffect } from 'react';
import { getAboutMe } from '@/app/actions/aboutMe';
import { MdAccountCircle } from 'react-icons/md';
import { CiCircleQuestion } from 'react-icons/ci';
import { AiOutlineStock } from 'react-icons/ai';
import { IoBagRemoveSharp } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import IconWrapper from '@/components/shared/IconWrapper';

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

export default function AboutPage() {
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const aboutResult = await getAboutMe();
      if (aboutResult.success && aboutResult.data) {
        setAboutMe({
          id: aboutResult.data.id,
          name: aboutResult.data.name || 'Unknown',
          title: aboutResult.data.title || 'No Title',
          bio: aboutResult.data.bio || '',
          profileImage: aboutResult.data.profileImage || '',
          techStack: aboutResult.data.techStack || [],
          currentActivities: aboutResult.data.currentActivities || [],
          retrospectives: aboutResult.data.retrospectives || [],
          experiences: (aboutResult.data.experiences || []).map((exp: any) => ({
            title: exp.title,
            company: exp.company,
            startDate:
              exp.startDate instanceof Date
                ? exp.startDate.toISOString()
                : String(exp.startDate),
            endDate: exp.endDate
              ? exp.endDate instanceof Date
                ? exp.endDate.toISOString()
                : String(exp.endDate)
              : undefined,
            description: exp.description ?? '',
            achievements: exp.achievements || [],
          })),
        });
      }
    };
    loadData();
  }, []);

  if (!aboutMe) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-36">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center   justify-center px-6 md:px-12 pt-36">
      <div className="text-center  relative z-10 max-w-2xl mb-16">
        <span className="flex justify-center mb-4">
          <IconWrapper>
            <MdAccountCircle
              size={60}
              className="text-primary dark:text-foreground"
              aria-label="Profile icon"
            />
          </IconWrapper>
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed font-light">
          A story of growth and discovery.
        </p>
      </div>

      <div className="flex flex-col bg-background shadow-xl/20 rounded-2xl p-10  relative z-10 md:flex-row gap-20 max-w-4xl w-full">
        <div className="flex-shrink-0">
          <div className="featured-img ">
            <img
              src={aboutMe.profileImage || 'https://via.placeholder.com/150'}
              alt={`${aboutMe.name} profile`}
              className="w-48 object-cover rounded-[var(--radius-lg)] shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-secondary dark:text-foreground mb-4">
            {aboutMe.name}
          </h1>
          <span className="text-muted-foreground mb-4 block">
            {aboutMe.title}
          </span>
          <div
            className="prose prose-sm max-w-none text-muted-foreground leading-relaxed mb-4 dark:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: aboutMe.bio }}
          />
          <div className="flex gap-4 text-primary flex-wrap">
            {(aboutMe.techStack ?? []).map((tech, index) => (
              <span key={index} className="text-lg">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex mt-10 bg-background shadow-xl/20  mb-10 p-10 relative z-10 flex-col md:flex-row items-start justify-between gap-8 mx-auto py-10 px-6 rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30 shadow-md transition-all">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <span className="text-2xl text-primary">
            <CiCircleQuestion aria-label="Current activities icon" />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">
            What I'm up to now
          </h2>
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

      <div className="flex flex-col bg-background shadow-xl/20 rounded-2xl p-10 relative z-10 md:flex-row gap-12 py-20">
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <span className="text-3xl text-primary">
            <AiOutlineStock aria-label="Growth icon" />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">
            Learn about my growth
          </h2>
          <p className="text-muted-foreground leading-relaxed font-light">
            Every year, I share my progress both in career and personal life.
            Here's how it's going
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {(aboutMe.retrospectives ?? []).map((retro, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 hover:shadow-md transition-shadow p-4 rounded-[var(--radius-lg)] border border-border/20 dark:border-border/30"
            >
              <span className="flex items-center gap-2 text-primary">
                <FaEye className="text-lg" aria-label="Views icon" />{' '}
                {retro.views.toLocaleString()} views
              </span>
              <h3 className="text-xl font-medium text-secondary">
                {retro.title}
              </h3>
              <div
                className="prose prose-sm max-w-none text-muted-foreground dark:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: retro.description }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-background shadow-xl/20 rounded-2xl p-10 relative z-10 gap-8 max-w-5xl mx-auto px-6 mt-10">
        <div className="w-full text-center">
          <span className="flex justify-center mb-2">
            <IoBagRemoveSharp
              className="text-3xl text-primary"
              aria-label="Experiences icon"
            />
          </span>
          <h2 className="text-2xl font-semibold text-secondary">Experiences</h2>
        </div>
        <div className="flex flex-col gap-6">
          {(aboutMe.experiences ?? []).map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-muted-foreground">
                {new Date(exp.startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                -{' '}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'PRESENT'}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-secondary mb-2">
                  {exp.title}
                </h1>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
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
