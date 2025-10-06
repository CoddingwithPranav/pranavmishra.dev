import { Button } from "../ui/button";
import ProjectCard from "./ProjectCard";


export default function ProjectSection() {
    return (
        <section className="min-h-screen flex flex-col">
             <h1 className="text-6xl text-secondary pb-3 font-semibold">Featured <span className="text-primary">Projects</span></h1>
             <p className="text-2xl text-secondary pb-10">A selection of projects that I've worked on.</p>

             <div className="flex flex-col gap-10">
                <ProjectCard></ProjectCard>
                <ProjectCard reverse={true}></ProjectCard>
                <ProjectCard></ProjectCard>
             </div>
             <div className="flex justify-end">
                <Button className="mt-10 " variant="link">View All Projects...</Button>
             </div>
        </section>
    )
}