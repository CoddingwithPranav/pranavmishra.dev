import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/CoddingwithPranav", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pranavmishra2101/", Icon: FaLinkedin },
  { label: "Email", href: "mailto:pranavmishra632@gmail.com", Icon: FaEnvelope },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Me", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full mt-12 relative z-100 bg-background sm:mt-16 md:mt-20 py-6 sm:py-8 px-4 sm:px-6 md:px-12">
      <div className="fade_rule w-full max-w-6xl mx-auto"></div>
      <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 max-w-6xl mx-auto pt-8 sm:pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12">
          {/* Personal Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-secondary dark:text-foreground mb-2">
              Pranav Mishra
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-xs mx-auto md:mx-0">
              Full Stack TypeScript developer in Kathmandu, building scalable web applications —
              and agentic AI on the side.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-primary">
              {socials.map(({ label, href, Icon }) => {
                const external = !href.startsWith("mailto:");
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <Icon className="text-lg sm:text-xl hover:text-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-primary mb-3 text-center md:text-left">
                Explore
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg font-medium text-secondary dark:text-foreground mb-3">
              Get in touch
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-2 max-w-xs mx-auto md:mx-0">
              Open to work and always happy to talk about a project.
            </p>
            <a
              href="mailto:pranavmishra632@gmail.com"
              className="text-sm sm:text-base text-primary hover:underline"
            >
              pranavmishra632@gmail.com
            </a>
            <p className="mt-2 text-sm text-muted-foreground">Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="fade_rule w-full max-w-6xl mx-auto"></div>
        <div className="text-center text-sm sm:text-base text-muted-foreground">
          © {new Date().getFullYear()} Pranav Mishra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
