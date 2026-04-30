import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DATA } from "@/data/resume";


const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">

      {/* HERO */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl text-orange-800"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
                <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-orange-300/30 dark:ring-orange-500/40 shadow-orange-500/20 dark:shadow-orange-500/30">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
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
            <h2 className="text-xl font-bold mt-8 mb-0 text-orange-800">About Me</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold mt-8 text-orange-800">Work Experience</h2>
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
            <h2 className="text-xl font-bold mt-8 text-orange-800">Education</h2>
            </BlurFade>

            <div className="flex flex-col gap-8">
            {DATA.education.map((edu, index) => (
                <BlurFade key={edu.school} delay={BLUR_FADE_DELAY * 6 + index * 0.05}>
                <a
                    href={edu.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group"
                >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                        {edu.logoUrl ? (
                        <img
                            src={edu.logoUrl}
                            alt={edu.school}
                            className="size-8 md:size-10 p-1 border border-orange-500/30 rounded-full shadow ring-2 ring-orange-500/40 overflow-hidden object-contain flex-none"
                        />
                        ) : (
                        <div className="size-8 md:size-10 p-1 border border-orange-500/30 rounded-full shadow ring-2 ring-orange-500/40 bg-muted flex-none" />
                        )}

                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold flex items-center gap-2">
                        {edu.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
            <h2 className="text-xl font-bold mt-8 mb-4 text-orange-800">Skills</h2>
            </BlurFade>
        <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, i) => (
            <BlurFade key={i} delay={BLUR_FADE_DELAY * 6 + i * 0.05}>
                <div className="border border-orange-500/40 bg-background rounded-xl h-8 w-fit px-4 flex items-center gap-2 shadow-[0_0_10px_rgba(249,115,22,0.15)] hover:shadow-[0_0_15px_rgba(249,115,22,0.25)] transition-shadow">
                {skill.icon && <skill.icon className="size-4" />}
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">{skill.name}</span>
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
