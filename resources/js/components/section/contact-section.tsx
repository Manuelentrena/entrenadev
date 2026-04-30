import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border border-orange-500/30 rounded-xl p-10 relative mt-16">

      {/* LABEL */}
        <div className="absolute -top-4 z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2 bg-orange-400 text-white dark:bg-orange-200 dark:text-black">
        <span className="text-sm font-medium">
            Contact
        </span>
        </div>

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
                  gridGap={4}
            color="#f97700"
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-col items-center gap-4 text-center">

        <h2 className="text-3xl font-bold  text-orange-800 tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>

        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just shoot me a dm{" "}

          <a
            href={DATA.contact.social.Instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4"
          >
            with a direct question on instagram
          </a>{" "}

          and I&apos;ll respond whenever I can. I will ignore all soliciting.
        </p>

      </div>
    </div>
  );
}
