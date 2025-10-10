import Feature from "@/components/feature/feature";
import Hero from "@/components/hero/hero";
import ProjectSection from "@/components/projects/projects";
import Retro from "@/components/Retro/Retro";
import './globals.css'
import { Toaster } from "react-hot-toast";
import "react-notion-x/src/styles.css";


export default function Home() {
  return (
     <div>
          <Hero></Hero>
          <Feature></Feature>
          <Retro></Retro>
          <ProjectSection></ProjectSection>
     </div>
  );
}


