import {
    Timeline,
    TimelineConnectItem,
    TimelineItem,
} from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

export default function HackathonsSection() {
  const hackathons = DATA.hackathons;

  return (
    <section id="hackathons" className="overflow-hidden mt-16">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">

        {/* HEADER */}
        <div className="flex flex-col gap-y-4 items-center justify-center">

          <div className="flex items-center w-full">
            <div
  className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
/>

            <div className="border bg-orange-400 text-white dark:bg-orange-200 dark:text-black z-10 rounded-xl px-4 py-1">
              <span className=" text-sm font-medium">
                Hackathons
              </span>
            </div>

            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          </div>

          <div className="flex flex-col gap-y-3 items-center justify-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-orange-800">
              Check out my last hackathon
            </h2>
          </div>

        </div>

        {/* TIMELINE */}
        <Timeline>
          {hackathons.map((hackathon) => (
            <TimelineItem
              key={hackathon.title + hackathon.dates}
              className="w-full flex items-start justify-between gap-10"
            >

              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain"
                  />
                ) : (
                  <div className="size-10 bg-card z-10 shrink-0 border rounded-full shadow ring-2 ring-border" />
                )}
              </TimelineConnectItem>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col gap-2 min-w-0">

                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">
                    {hackathon.dates}
                  </time>
                )}

                {hackathon.title && (
                  <h3 className="font-semibold leading-none dark:text-orange-300 text-orange-900">
                    {hackathon.title}
                  </h3>
                )}

                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">
                    {hackathon.location}
                  </p>
                )}

                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hackathon.description}
                  </p>
                )}

                {hackathon.links?.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {hackathon.links.map((link, idx) => (
                      <a
                        href={link.href}
                        key={idx}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground dark:bg-orange-200 bg-orange-200 dark:text-black text-orange-500 hover:dark:bg-orange-300/90 hover:bg-orange-300/90 border-orange-500">
                          {link.icon}
                          {link.title}
                        </Badge>
                      </a>
                    ))}
                  </div>
                )}

              </div>
            </TimelineItem>
          ))}
        </Timeline>

      </div>
    </section>
  );
}
