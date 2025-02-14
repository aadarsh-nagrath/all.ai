import { Typewriter } from "@/components/ui/typewriter"

export default function Subheadline() {
  return (
    <div className="text-xs sm:text-sm md:text-base flex items-start justify-center bg-background font-normal overflow-hidden p-1 w-fit mx-auto">
      <span className="whitespace-nowrap flex-shrink-0">EXPLORE</span>
      
      <div className="ml-1 inline-flex">
        <Typewriter
          text={[
            "30+ THEMES",
            "20+ PLUGINS",
            "100+ AI AGENTS",
            "100+ PROMPTS IN LIBRARY",
            "10 DIFFERENT AI MODELS",
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar=""
        />
      </div>
    </div>
  );
}
