import RetroCard from "./RetroCard";

export default function Retro() {
    return (
        <section  className="min-h-screen  flex flex-col">
            <div className="flex flex-col mb-5">
                <span className="text-secondary opacity-50">the yearly</span>
                <h1 className="text-primary text-6xl font-semibold">Retro</h1>
                <p className="text-secondary text-2xl">Every year, I share my progress both in career and personal life. Here's last 3 years of them.</p>
            </div>
            <div className="flex justify-between gap-3">
            <RetroCard></RetroCard>
            <RetroCard></RetroCard>
            <RetroCard></RetroCard>

            </div>
        </section>
    )
} 