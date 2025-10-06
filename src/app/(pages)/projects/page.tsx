import ProjectCard from "@/components/projects/ProjectCard";
import { FaFolder } from "react-icons/fa";

export default function ProjectPage() {
    return (
        <>
        <div className="min-h-screen flex flex-col  items-center">
            <div className="flex justify-center flex-col gap-4 mt-40">
                <span className="flex justify-center"> <FaFolder size={50} color="white"></FaFolder> </span>
                <h1 className="text-5xl text-center font-bold text-secondary">Curated <span className="text-primary ">Projects</span></h1>
                <p className="text-secondary text-center opacity-50" >Showcase of my projects that I'm proud of.</p>
            </div>
            <div className="flex flex-col gap-10 mt-20">
                <ProjectCard></ProjectCard>
                <ProjectCard reverse={true}></ProjectCard>
                <ProjectCard></ProjectCard>
            </div>
        </div>
        </>
    )
}