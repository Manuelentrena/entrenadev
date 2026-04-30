import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";


function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border border-orange-500/30 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.15)] ring-2 ring-orange-500/30 bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border border-orange-500/30 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.15)] ring-2 ring-orange-500/40 object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  const work = DATA.work;

  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {work.map((item) => (
        <AccordionItem
          key={item.company}
          value={item.company}
          className="w-full border-b-0 grid gap-2"
        >

          {/* HEADER */}
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer group [&>svg]:hidden">

            <div className="flex items-center gap-x-3 justify-between w-full text-left">

              <div className="flex items-center gap-x-3 flex-1 min-w-0">

                <LogoImage src={item.logoUrl} alt={item.company} />

                <div className="flex-1 min-w-0 flex flex-col gap-0.5">

                  <div className="font-semibold leading-none flex items-center gap-2 ">
                    {item.company}

                    <span className="relative inline-flex items-center w-3.5 h-3.5">

                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 text-muted-foreground transition-all",
                          "opacity-0 translate-x-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0"
                        )}
                      />

                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 text-muted-foreground transition-all",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />

                    </span>

                  </div>

                  <div className="text-sm text-muted-foreground">
                    {item.title}
                  </div>

                </div>

              </div>

              <div className="text-xs text-muted-foreground flex-none">
                {item.start} - {item.end ?? "Present"}
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
