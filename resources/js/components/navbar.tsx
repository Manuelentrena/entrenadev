import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border border-orange-500/30 bg-orange-500/10 backdrop-blur-3xl shadow-[0_0_20px_4px] shadow-orange-500/20">

        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-3xl cursor-pointer size-full bg-orange-500/10 p-0 text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500/30 transition-colors">
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-orange-500 text-white px-4 py-2 text-sm shadow-lg"
              >
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-orange-500/40"
        />

        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;

            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <DockIcon className="rounded-3xl cursor-pointer size-full bg-orange-500/10 p-0 text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500/30 transition-colors">
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="rounded-xl bg-orange-500 text-white px-4 py-2 text-sm shadow-lg"
                >
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-orange-500/40"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="rounded-3xl cursor-pointer size-full bg-orange-500/10 p-0 text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500/30 transition-colors">
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>

          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-orange-500 text-white px-4 py-2 text-sm shadow-lg"
          >
            <p>Theme</p>
          </TooltipContent>
        </Tooltip>

      </Dock>
    </div>
  );
}
