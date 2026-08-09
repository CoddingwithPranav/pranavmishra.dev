/**
 * Seeds the portfolio's content from Pranav's CV.
 *
 * Idempotent by design -- running it twice produces identical data:
 *  - `aboutMe` is a singleton: found via findFirst, created only if absent.
 *  - Child collections (skills, experiences, ...) are wiped and rewritten.
 *  - `projects` are matched by a normalized name and UPDATED IN PLACE. They are
 *    never deleted, because `/notion/<projectId>` links are keyed off their ids.
 */
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

const simpleicon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const ABOUT = {
  name: 'Pranav Mishra',
  title: 'Senior Full Stack TypeScript Developer',
  email: 'pranavmishra632@gmail.com',
  // Stored for the admin panel only -- deliberately not rendered publicly.
  phone: '+977-9813393593',
  address: 'Kathmandu, Nepal',
  bio: [
    '<p>Full Stack Developer building scalable, end-to-end web applications in TypeScript. ',
    'I architect dynamic frontends with Angular, React and Next.js, and back them with ',
    'Node.js and Express APIs over PostgreSQL and MongoDB. Day to day that means ',
    'monorepo architectures, CI/CD, and containerised deployments with Docker.</p>',
    '<p>Alongside the traditional stack I go deep on agentic AI in my own time: building ',
    'Model Context Protocol servers, LLM-driven features and prompt-engineered workflows ',
    'across side projects and a self-hosted home lab, and bringing what I learn back into ',
    'the team as AI-assisted development tooling.</p>',
  ].join(''),
  techStack: [
    'TypeScript',
    'React',
    'Next.js',
    'Angular',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Prisma',
    'Docker',
  ],
  // No emoji: the About page renders its own bullet marker for each entry.
  currentActivities: [
    'Building Copilot-driven developer tooling and AI-assisted workflows for the team at Proshore.',
    'Exploring agentic AI in side projects — Model Context Protocol servers, local models with Ollama and prompt-engineered workflows.',
    'Running a self-hosted Ubuntu home lab on Docker, Cloudflare Tunnels and nginx, teaching myself observability with Prometheus and Grafana.',
    'Finishing a Bachelor of Computer Applications at Yeti International College.',
  ],
};

const SKILLS = [
  // The first five keep their existing ImageKit uploads -- SkillWrapper renders a
  // bare <img>, so a skill without a logo shows as a broken image.
  { name: 'Next.js', imageUrl: 'https://ik.imagekit.io/ewym4bqyz/uploads/cropped-image_6lhGn-xjt.jpg' },
  { name: 'React', imageUrl: 'https://ik.imagekit.io/ewym4bqyz/uploads/cropped-image_KQ_9zNCut.jpg' },
  { name: 'Angular', imageUrl: 'https://ik.imagekit.io/ewym4bqyz/uploads/cropped-image_9gw2L8Hfe.jpg' },
  { name: 'Node.js', imageUrl: 'https://ik.imagekit.io/ewym4bqyz/uploads/cropped-image_6StVkurEm.jpg' },
  { name: 'Tailwind CSS', imageUrl: 'https://ik.imagekit.io/ewym4bqyz/uploads/cropped-image_yS8y_p0gM.jpg' },
  { name: 'TypeScript', imageUrl: devicon('typescript') },
  { name: 'Express', imageUrl: devicon('express') },
  { name: 'PostgreSQL', imageUrl: devicon('postgresql') },
  { name: 'Prisma', imageUrl: devicon('prisma') },
  { name: 'Docker', imageUrl: devicon('docker') },
  // AI tooling, in brand colours via the Simple Icons CDN.
  { name: 'Claude', imageUrl: simpleicon('claude') },
  { name: 'Claude Code', imageUrl: simpleicon('anthropic') },
  { name: 'GitHub Copilot', imageUrl: simpleicon('githubcopilot') },
  { name: 'MCP', imageUrl: simpleicon('modelcontextprotocol') },
  { name: 'Ollama', imageUrl: simpleicon('ollama') },
  // Home lab observability -- self-taught, not used professionally.
  { name: 'Prometheus', imageUrl: simpleicon('prometheus') },
  { name: 'Grafana', imageUrl: simpleicon('grafana') },
];

const EXPERIENCES = [
  {
    title: 'Software Developer',
    company: 'Proshore',
    location: 'Kathmandu',
    startDate: new Date('2024-08-01'),
    endDate: null,
    description:
      'Shipping production Angular frontends, and building AI-assisted developer tooling for the team alongside them.',
    achievements: [
      'Streamlined frontend development with an AI-assisted workflow built on structured repositories and custom Copilot skills, granular instructions and optimized prompts.',
      'Developed Upfront Designer, a self-contained Chrome/Firefox extension for real-time DOM manipulation, whose background service worker calls the GitHub Copilot HTTP API directly — no external server hosting required.',
      'Implemented predictable state management with NgRx and a WebSocket-based real-time notification system.',
      'Architected Model Context Protocol (MCP) server integrations for Chrome and Azure, extending agentic systems through a standardized communication layer.',
    ],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Logiclync',
    location: 'Kathmandu',
    startDate: new Date('2022-02-01'),
    endDate: new Date('2024-08-01'),
    description:
      'Delivered end-to-end web applications, from Figma handoff through to deployed Node.js APIs.',
    achievements: [
      'Translated complex Figma designs into responsive, production-ready Angular and React frontends.',
      'Developed, maintained and tested scalable applications in Angular, React and Next.js.',
      'Designed scalable backend services with Node.js and Express, using Prisma ORM and PostgreSQL for data integrity and performance.',
      'Integrated WebSocket functionality to power interactive real-time analytics dashboards.',
      'Wrote comprehensive Angular unit tests to keep the codebase reliable as it grew.',
    ],
  },
];

const EDUCATIONS = [
  {
    school: 'Yeti International College',
    degree: 'Bachelor of Computer Applications',
    fieldOfStudy: 'Computer Applications',
    startDate: new Date('2023-01-01'),
    endDate: null,
    grade: '',
    description: '',
  },
  {
    school: 'Baylor International Academy',
    degree: '+2 Science Stream',
    fieldOfStudy: 'Science (Computer Science)',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2022-12-31'),
    grade: '3.6',
    description: '',
  },
  {
    school: 'Baylor International Academy',
    degree: 'SLC / SEE',
    fieldOfStudy: 'Secondary Education',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2020-12-31'),
    grade: '3.8',
    description: '',
  },
];

const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com/CoddingwithPranav', icon: 'FaGithub' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/pranavmishra2101/', icon: 'FaLinkedin' },
  { platform: 'Email', url: `mailto:${ABOUT.email}`, icon: 'FaEnvelope' },
  {
    platform: 'Resume',
    url: 'https://app.sajilocv.com/cv/578fb001-eac0-4c0a-b2a2-e1acd93be130',
    icon: 'FaFile',
  },
];

const RETROSPECTIVES = [
  {
    year: '2023',
    title: 'Foundations',
    description:
      '<p>Started the Bachelor of Computer Applications while working full-stack at Logiclync. Most of the year went into turning Figma handoffs into production Angular and React frontends, and learning to design a backend that holds up — Prisma, PostgreSQL, and the first real-time dashboards over WebSockets.</p>',
  },
  {
    year: '2024',
    title: 'Moving up the stack',
    description:
      '<p>Joined Proshore in August. The work shifted from delivering features to shaping how features get built: AI-assisted workflows, structured repositories, and custom Copilot instructions. Also the year NgRx and disciplined state management stopped being a nice-to-have.</p>',
  },
  {
    year: '2025',
    title: 'Agents and infrastructure',
    description:
      '<p>Built Upfront Designer — a browser extension calling the Copilot API straight from a service worker — and integrated Model Context Protocol servers for Chrome and Azure. Off the clock, stood up a self-hosted home lab on Docker, Cloudflare Tunnels and nginx, which taught me more about production than any tutorial.</p>',
  },
];

/**
 * Projects are matched on a normalized name. `aliases` holds the messy names
 * currently in the database so the first run finds them; the canonical `name`
 * normalizes into the same set, which keeps later runs idempotent.
 */
const PROJECTS = [
  {
    name: 'Home Lab',
    aliases: ['home lab'],
    description:
      'A self-hosted Ubuntu Server home lab built on retired hardware, running Docker, Cloudflare Tunnels, nginx and SSH automation, with Prometheus and Grafana for monitoring.',
    liveLink: null,
  },
  {
    name: 'Bulk Email Platform',
    aliases: ['bulk email', 'bulk email platform'],
    description:
      'An enterprise campaign system for high-volume email. Uploads contacts via CSV/XLSX, organizes them into categories, schedules targeted campaigns, and processes sends asynchronously with delivery tracking and payment processing.',
    liveLink: null,
  },
  {
    name: 'CodeXVibe',
    aliases: ['code x vibe', 'codexvibe'],
    description:
      'An autonomous code generation platform built with Next.js 15, tRPC and Inngest, executing generated code safely inside E2B sandboxes.',
    liveLink: 'https://codexvibe-two.vercel.app',
  },
  {
    name: 'Video Calling Platform',
    aliases: ['1 to 1 call', 'video calling platform'],
    description:
      'Peer-to-peer video calling over WebRTC, with a Node.js signaling server and a React client built to hold up under concurrent sessions.',
    liveLink: null,
  },
  {
    name: '2D Pixel Metaverse',
    aliases: ['2d metaverse multiple player', '2d pixel metaverse'],
    description:
      'A multiplayer virtual world built with React, Express, Prisma and PostgreSQL. Players create maps and avatars and move around together over WebSockets, deployed in Docker containers.',
    liveLink: null,
  },
];

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ');

async function main() {
  // ---- aboutMe singleton -------------------------------------------------
  const existing = await prisma.aboutMe.findFirst();
  const aboutMe = existing
    ? await prisma.aboutMe.update({ where: { id: existing.id }, data: ABOUT })
    : await prisma.aboutMe.create({ data: ABOUT });
  const aboutMeId = aboutMe.id;
  console.log(`aboutMe ${existing ? 'updated' : 'created'}: ${aboutMeId}`);

  // ---- child collections: replace wholesale ------------------------------
  await prisma.skills.deleteMany({ where: { aboutMeId } });
  await prisma.skills.createMany({ data: SKILLS.map((s) => ({ ...s, aboutMeId })) });

  await prisma.experiences.deleteMany({ where: { aboutMeId } });
  await prisma.experiences.createMany({
    data: EXPERIENCES.map((e) => ({ ...e, aboutMeId })),
  });

  await prisma.educations.deleteMany({ where: { aboutMeId } });
  await prisma.educations.createMany({
    data: EDUCATIONS.map((e) => ({ ...e, aboutMeId })),
  });

  await prisma.socialLinks.deleteMany({ where: { aboutMeId } });
  await prisma.socialLinks.createMany({
    data: SOCIAL_LINKS.map((s) => ({ ...s, aboutMeId })),
  });

  await prisma.retrospectives.deleteMany({ where: { aboutMeId } });
  await prisma.retrospectives.createMany({
    data: RETROSPECTIVES.map((r) => ({ ...r, aboutMeId })),
  });

  console.log(
    `skills: ${SKILLS.length}, experiences: ${EXPERIENCES.length}, ` +
      `educations: ${EDUCATIONS.length}, socialLinks: ${SOCIAL_LINKS.length}, ` +
      `retrospectives: ${RETROSPECTIVES.length}`,
  );

  // ---- projects: update in place, never delete ---------------------------
  const current = await prisma.projects.findMany();

  for (const seed of PROJECTS) {
    const keys = new Set([...seed.aliases, normalize(seed.name)]);
    const match = current.find((p) => keys.has(normalize(p.name)));
    const data = {
      name: seed.name,
      description: seed.description,
      liveLink: seed.liveLink,
    };

    if (match) {
      await prisma.projects.update({ where: { id: match.id }, data });
      console.log(`project updated (id preserved): ${seed.name} -> ${match.id}`);
    } else {
      const created = await prisma.projects.create({ data });
      console.log(`project created: ${seed.name} -> ${created.id}`);
    }
  }

  const unmatched = current.filter(
    (p) => !PROJECTS.some((s) => new Set([...s.aliases, normalize(s.name)]).has(normalize(p.name))),
  );
  if (unmatched.length) {
    console.log(`left untouched (not in seed): ${unmatched.map((p) => p.name).join(', ')}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
