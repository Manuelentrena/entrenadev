import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';

function LogoImage({ src, alt }: { src: string; alt: string }) {
    const [imageError, setImageError] = useState(false);

    if (!src || imageError) {
        return (
            <div className="size-8 flex-none rounded-full border border-orange-500/30 bg-muted p-1 shadow-[0_0_10px_rgba(249,115,22,0.15)] ring-2 ring-orange-500/30 md:size-10" />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="size-8 flex-none rounded-full border border-orange-500/30 object-contain p-1 shadow-[0_0_10px_rgba(249,115,22,0.15)] ring-2 ring-orange-500/40 md:size-10"
            onError={() => setImageError(true)}
        />
    );
}

export default function WorkSection() {
    const work = DATA.work;

    return (
        <Accordion type="single" collapsible className="grid w-full gap-6">
            {work.map((item) => (
                <AccordionItem
                    key={item.company}
                    value={item.company}
                    className="grid w-full gap-2 border-b-0"
                >
                    {/* HEADER */}
                    <AccordionTrigger className="group cursor-pointer p-0 hover:no-underline [&>svg]:hidden">
                        <div className="flex w-full items-center justify-between gap-x-3 text-left">
                            <div className="flex min-w-0 flex-1 items-center gap-x-3">
                                <LogoImage
                                    src={item.logoUrl}
                                    alt={item.company}
                                />

                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <div className="flex items-center gap-2 leading-none font-semibold">
                                        {item.company}

                                        <span className="relative inline-flex h-3.5 w-3.5 items-center">
                                            <ChevronRight
                                                className={cn(
                                                    'absolute h-3.5 w-3.5 text-muted-foreground transition-all',
                                                    'translate-x-0 opacity-0',
                                                    'group-hover:translate-x-1 group-hover:opacity-100',
                                                    'group-data-[state=open]:opacity-0',
                                                )}
                                            />

                                            <ChevronDown
                                                className={cn(
                                                    'absolute h-3.5 w-3.5 text-muted-foreground transition-all',
                                                    'rotate-0 opacity-0',
                                                    'group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100',
                                                )}
                                            />
                                        </span>
                                    </div>

                                    <div className="text-sm text-muted-foreground">
                                        {item.title}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-none text-xs text-muted-foreground">
                                {item.start} - {item.end ?? 'Present'}
                            </div>
                        </div>
                    </AccordionTrigger>

                    {/* CONTENT */}
                    <AccordionContent className="ml-10 text-sm text-muted-foreground">
                        {item.description}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
