import { ArrowUpRight } from 'lucide-react';
import Markdown from 'react-markdown';

import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import ContactSection from '@/components/section/contact-section';
import HackathonsSection from '@/components/section/hackathons-section';
import ProjectsSection from '@/components/section/projects-section';
import WorkSection from '@/components/section/work-section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { DATA } from '@/data/resume';

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
    return (
        <main className="relative flex min-h-dvh flex-col gap-14">
            {/* HERO */}
            <section id="hero">
                <div className="mx-auto w-full max-w-2xl space-y-8">
                    <div className="flex flex-col justify-between gap-2 gap-y-6 md:flex-row">
                        <div className="order-2 flex flex-col gap-2 md:order-1">
                            <BlurFadeText
                                delay={BLUR_FADE_DELAY}
                                className="text-3xl font-semibold tracking-tighter text-orange-800 sm:text-4xl lg:text-5xl"
                                yOffset={8}
                                text={`Hi, I'm ${DATA.name.split(' ')[0]}`}
                            />
                            <BlurFadeText
                                className="max-w-[600px] text-muted-foreground md:text-lg lg:text-xl"
                                delay={BLUR_FADE_DELAY}
                                text={DATA.description}
                            />
                        </div>
                        <BlurFade
                            delay={BLUR_FADE_DELAY}
                            className="order-1 md:order-2"
                        >
                            <Avatar className="size-24 rounded-full border shadow-lg ring-4 shadow-orange-500/20 ring-orange-300/30 md:size-32 dark:shadow-orange-500/30 dark:ring-orange-500/40">
                                <AvatarImage
                                    alt={DATA.name}
                                    src={DATA.avatarUrl}
                                />
                                <AvatarFallback>{DATA.initials}</AvatarFallback>
                            </Avatar>
                        </BlurFade>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about">
                <div className="flex min-h-0 flex-col gap-y-2">
                    <BlurFade delay={BLUR_FADE_DELAY * 3}>
                        <h2 className="mt-8 mb-0 text-xl font-bold text-orange-800">
                            About Me
                        </h2>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 4}>
                        <div className="prose max-w-full font-sans leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
                            <Markdown>{DATA.summary}</Markdown>
                        </div>
                    </BlurFade>
                </div>
            </section>

            {/* WORK */}
            <section id="work">
                <div className="flex min-h-0 flex-col gap-y-4">
                    <BlurFade delay={BLUR_FADE_DELAY * 5}>
                        <h2 className="mt-8 text-xl font-bold text-orange-800">
                            Work Experience
                        </h2>
                    </BlurFade>
                    <BlurFade delay={BLUR_FADE_DELAY * 6}>
                        <WorkSection />
                    </BlurFade>
                </div>
            </section>

            {/* EDUCATION */}
            <section id="education">
                <div className="flex min-h-0 flex-col gap-y-4">
                    <BlurFade delay={BLUR_FADE_DELAY * 5}>
                        <h2 className="mt-8 text-xl font-bold text-orange-800">
                            Education
                        </h2>
                    </BlurFade>

                    <div className="flex flex-col gap-8">
                        {DATA.education.map((edu, index) => (
                            <BlurFade
                                key={edu.school}
                                delay={BLUR_FADE_DELAY * 6 + index * 0.05}
                            >
                                <a
                                    href={edu.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between gap-x-3"
                                >
                                    <div className="flex min-w-0 flex-1 items-center gap-x-3">
                                        {edu.logoUrl ? (
                                            <img
                                                src={edu.logoUrl}
                                                alt={edu.school}
                                                className="size-8 flex-none overflow-hidden rounded-full border border-orange-500/30 object-contain p-1 shadow ring-2 ring-orange-500/40 md:size-10"
                                            />
                                        ) : (
                                            <div className="size-8 flex-none rounded-full border border-orange-500/30 bg-muted p-1 shadow ring-2 ring-orange-500/40 md:size-10" />
                                        )}

                                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <div className="flex items-center gap-2 font-semibold">
                                                {edu.school}
                                                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {edu.degree}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs text-muted-foreground tabular-nums">
                                        {edu.start} - {edu.end}
                                    </div>
                                </a>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills">
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="mt-8 mb-4 text-xl font-bold text-orange-800">
                        Skills
                    </h2>
                </BlurFade>
                <div className="flex flex-wrap gap-2">
                    {DATA.skills.map((skill, i) => (
                        <BlurFade
                            key={i}
                            delay={BLUR_FADE_DELAY * 6 + i * 0.05}
                        >
                            <div className="flex h-8 w-fit items-center gap-2 rounded-xl border border-orange-500/40 bg-background px-4 shadow-[0_0_10px_rgba(249,115,22,0.15)] transition-shadow hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]">
                                {skill.icon && (
                                    <skill.icon className="size-4" />
                                )}
                                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
                                    {skill.name}
                                </span>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </section>

            {/* SECTIONS */}
            <ProjectsSection />
            <HackathonsSection />
            <ContactSection />
        </main>
    );
}
