'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getAboutMe } from '@/app/actions/aboutMe';
import Loading from '../loading';
import SkillWrapper from '@/components/shared/SkillWarapper';

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
  skills?: Array<{
    id: string;
    name: string;
    level: number | null;
    imageUrl: string | null;
  }>;
}

/** Reveal-on-scroll wrapper that respects prefers-reduced-motion. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

/** Small monospace section label, e.g. "// NOW". */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}

/** A single node on the timeline spine. */
function TimelineEntry({
  marker,
  first,
  children,
}: {
  marker: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative pl-8 sm:pl-10">
      <span
        aria-hidden
        className={`absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary ${
          first ? 'bg-primary' : 'bg-white'
        }`}
      />
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
        {marker}
      </span>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const monthYear = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

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
          skills: aboutResult.data.skills || [],
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
    return <Loading />;
  }

  const skills = aboutMe.skills ?? [];
  const activities = aboutMe.currentActivities ?? [];
  const experiences = aboutMe.experiences ?? [];
  const retrospectives = aboutMe.retrospectives ?? [];
  const techStack = aboutMe.techStack ?? [];

  return (
    <div className="relative z-10 mx-auto min-h-screen max-w-5xl border-x border-border/40 bg-white px-5 pt-32 pb-24 shadow-sm sm:px-10">
      {/* ── Intro hero: image + introduction ── */}
      <Reveal>
        <Eyebrow>// About me</Eyebrow>
        <section className="mt-6 flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
          {/* Profile image */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1.5 rounded-3xl bg-primary/20 blur-md" aria-hidden />
            <img
              src={aboutMe.profileImage || 'https://via.placeholder.com/300'}
              alt={`${aboutMe.name}, ${aboutMe.title}`}
              className="relative h-48 w-48 rounded-3xl border-2 border-primary/40 object-cover shadow-xl sm:h-56 sm:w-56"
            />
          </div>

          {/* Introduction */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              {aboutMe.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-primary sm:text-base">
              {aboutMe.title}
            </p>
            <div
              className="prose prose-sm mt-5 max-w-none leading-relaxed text-muted-foreground marker:text-primary"
              dangerouslySetInnerHTML={{ __html: aboutMe.bio }}
            />
            {techStack.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 font-mono text-xs text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {/* Now panel */}
        {activities.length > 0 && (
          <Reveal>
            <section className="rounded-2xl border border-border/50 bg-primary/[0.03] p-6 sm:p-8">
              <Eyebrow>// Now</Eyebrow>
              <h2 className="mt-2 text-xl font-semibold text-secondary sm:text-2xl">
                What I&apos;m up to
              </h2>
              <ul className="mt-4 space-y-2.5">
                {activities.map((activity, index) => (
                  <li key={index} className="flex gap-3 text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{activity}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Reveal>
            <section>
              <Eyebrow>// Stack</Eyebrow>
              <h2 className="mt-2 text-xl font-semibold text-secondary sm:text-2xl">
                Tools I reach for
              </h2>
              <div className="mt-6 flex flex-wrap justify-center gap-5 sm:justify-start sm:gap-7">
                {skills.map((skill, index) => (
                  <SkillWrapper
                    key={index}
                    imageUrl={skill.imageUrl ?? ''}
                    name={skill.name}
                  />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Timeline: experiences + retrospectives on one spine */}
        {(experiences.length > 0 || retrospectives.length > 0) && (
          <Reveal>
            <section>
              <Eyebrow>// Timeline</Eyebrow>
              <h2 className="mt-2 text-xl font-semibold text-secondary sm:text-2xl">
                The path so far
              </h2>

              <div className="relative mt-8 ml-2 space-y-12 border-l-2 border-border/60 py-2">
                {experiences.map((exp, index) => (
                  <TimelineEntry
                    key={`exp-${index}`}
                    first={index === 0}
                    marker={`${monthYear(exp.startDate)} — ${
                      exp.endDate ? monthYear(exp.endDate) : 'Present'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-secondary sm:text-xl">
                      {exp.title}
                      {exp.company && (
                        <span className="text-muted-foreground"> · {exp.company}</span>
                      )}
                    </h3>
                    {exp.description && (
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex gap-2.5 text-muted-foreground">
                            <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60" />
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </TimelineEntry>
                ))}

                {retrospectives.map((retro, index) => (
                  <TimelineEntry
                    key={`retro-${index}`}
                    first={experiences.length === 0 && index === 0}
                    marker={`${retro.year} · Retrospective`}
                  >
                    <h3 className="text-lg font-semibold text-secondary sm:text-xl">
                      {retro.title}
                    </h3>
                    <div
                      className="prose prose-sm mt-2 max-w-none leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: retro.description }}
                    />
                    <span className="mt-3 inline-block font-mono text-xs text-muted-foreground/70">
                      {retro.views} views
                    </span>
                  </TimelineEntry>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}
