import {
    Timeline,
    TimelineConnectItem,
    TimelineItem,
} from '@/components/timeline';
import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data/resume';

export default function HackathonsSection() {
    const hackathons = DATA.hackathons;

    return (
        <section id="hackathons" className="mt-16 overflow-hidden">
            <div className="flex min-h-0 w-full flex-col gap-y-8">
                {/* HEADER */}
                <div className="flex flex-col items-center justify-center gap-y-4">
                    <div className="flex w-full items-center">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

                        <div className="z-10 rounded-xl border bg-orange-400 px-4 py-1 text-white dark:bg-orange-200 dark:text-black">
                            <span className="text-sm font-medium">
                                Hackathons
                            </span>
                        </div>

                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-3 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter text-orange-800 sm:text-4xl">
                            Check out my last hackathon
                        </h2>
                    </div>
                </div>

                {/* TIMELINE */}
                <Timeline>
                    {hackathons.map((hackathon) => (
                        <TimelineItem
                            key={hackathon.title + hackathon.dates}
                            className="flex w-full items-start justify-between gap-10"
                        >
                            <TimelineConnectItem className="flex items-start justify-center">
                                {hackathon.image ? (
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="z-10 size-10 shrink-0 overflow-hidden rounded-full border bg-card object-contain p-1 shadow ring-2 ring-border"
                                    />
                                ) : (
                                    <div className="z-10 size-10 shrink-0 rounded-full border bg-card shadow ring-2 ring-border" />
                                )}
                            </TimelineConnectItem>

                            {/* CONTENT */}
                            <div className="flex min-w-0 flex-1 flex-col gap-2">
                                {hackathon.dates && (
                                    <time className="text-xs text-muted-foreground">
                                        {hackathon.dates}
                                    </time>
                                )}

                                {hackathon.title && (
                                    <h3 className="leading-none font-semibold text-orange-900 dark:text-orange-300">
                                        {hackathon.title}
                                    </h3>
                                )}

                                {hackathon.location && (
                                    <p className="text-sm text-muted-foreground">
                                        {hackathon.location}
                                    </p>
                                )}

                                {hackathon.description && (
                                    <p className="text-sm leading-relaxed text-muted-foreground">
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
                                                <Badge className="flex items-center gap-1.5 border-orange-500 bg-orange-200 text-xs text-orange-500 hover:bg-orange-300/90 dark:bg-orange-200 dark:text-black hover:dark:bg-orange-300/90">
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
