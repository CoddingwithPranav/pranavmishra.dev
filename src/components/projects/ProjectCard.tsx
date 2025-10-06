import { FaJs, FaLink, FaNodeJs } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function ProjectCard({reverse}: {reverse?: boolean}) {
    return (
        <div className={cn(
            "flex  pb-1  justify-between pt-3 gap-5",
            reverse ? "flex-row-reverse " : "flex-row"
        )}>
            <div>
                <h1 className="text-secondary font-semibold text-3xl pb-1">Hexcap</h1>
                <p className="text-secondary pb-1">A game that combines ISO and physical puzzel game, using 3D. 360 world view and AR</p>
                <span className="text-muted-foreground flex items-center gap-2 pb-10">
                    Tools: 
                    <FaNodeJs></FaNodeJs>
                    <FaJs></FaJs>
                </span>
                <div className="flex justify-between ">
                    <Button variant="outline">View Project</Button>
                    <Button variant="link"> <FaLink></FaLink> View Code</Button>
                </div>
            </div>
            <div className="flex justify-center items-center ">
                <img src="https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-applify.png" alt="Project Image" className="w-48 h-48 object-cover rounded-lg"/>
            </div>
        </div>
    )
}