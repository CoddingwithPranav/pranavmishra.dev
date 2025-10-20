"use client";

import {
  motion,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaFile } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import OtherDesignerButtonMotionWrapper from "../shared/desiginerButttonWrapper";

export default function Hero() {
  const { scrollY } = useScroll();

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com/CoddingwithPranav" },
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/in/pranav-mishra-9416a6289" },
    { name: "Resume", icon: <FaFile />, href: "https://app.sajilocv.com/cv/578fb001-eac0-4c0a-b2a2-e1acd93be130" },
  ];

  const titleYRaw = useTransform(scrollY, [0, 500], [0, 200]); 
  const subtitleYRaw = useTransform(scrollY, [0, 500], [0, -100]);
  const titleY = useSpring(titleYRaw, { stiffness: 100, damping: 20 });
  const subtitleY = useSpring(subtitleYRaw, { stiffness: 100, damping: 20 });

  const bgYRaw = useTransform(scrollY, [0, 500], [0, -100]);
  const bgY = useSpring(bgYRaw, { stiffness: 100, damping: 30 });

  return (
    <>
      <div className="min-h-screen pt-36  sm:pt-48 w-full bg-white relative flex flex-col justify-between">
        {/* Grid background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
             
        
        {/* Titles */}
        <motion.div
          style={{ y: titleY }}
          className="w-full px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col relative z-10 font-bold"
        >
          <h2 className="text-xl sm:text-2xl text-gray-950">Hey I'm a</h2>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-primary">Software</h1>
        </motion.div>
          <div className="hidden sm:flex">
            <OtherDesignerButtonMotionWrapper x="10%" y="70%" direction="left" />
            <OtherDesignerButtonMotionWrapper x="80%" duration={5} y="30%" path="circle" direction="right" text="Open to work" />
          </div>
        <motion.div
          style={{ y: subtitleY }}
          className="w-full flex px-6 sm:px-12 md:px-20 lg:px-40 justify-end relative z-10 font-bold bottom-36 sm:bottom-52"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-gray-950 pb-16 sm:pb-32">
            Developer
          </h1>
        </motion.div>

        {/* Background image with parallax */}
        <div className="absolute z-20 inset-x-0 bottom-0 flex justify-center">
          <motion.div style={{ y: bgY }}>
            <img src="./background2.png" className="h-[30rem] sm:h-[45rem] md:h-[60rem] object-contain" />
          </motion.div>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                radial-gradient(125% 125% at 50% 10%, transparent 60%, #69e889 86%)
              `,
              backgroundSize: "100% 100%",
            }}
          />
        </div>
      </div>

      {/* Intro Section */}
      <section className="flex flex-col md:flex-row gap-10 justify-center items-center px-6 sm:px-12 md:px-20 py-10">
        <motion.div
          className="p-6 sm:p-8 md:p-12 max-w-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-4 tracking-tight">
            I'm Pranav
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
            I'm Full-Stack JavaScript Developer proficient in building scalable web applications using Angular, React, and Next.js for dynamic frontends, alongside Node.js and Express for robust APIs.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              asChild
              variant="outline"
              className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-primary/30 rounded-xl transition-all duration-300"
            >
              <Link href="/projects">Projects</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:text-primary-foreground hover:bg-primary/20 rounded-xl transition-all duration-300"
            >
              <Link href="/about">About Me</Link>
            </Button>
          </div>

          {/* Social links with stagger */}
          <motion.div
            className="flex gap-4 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-2xl sm:text-3xl text-muted-foreground hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img 
            src="./profile.png" 
            alt="Profile" 
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-primary object-contain shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105" 
          />
        </motion.div>
      </section>
    </>
  );
}




