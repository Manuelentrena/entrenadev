import { Dock, DockIcon } from '@/components/magicui/dock';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { DATA } from '@/data/resume';

export default function Navbar() {
    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
            <Dock className="pointer-events-auto relative z-50 mx-auto flex h-14 w-fit gap-2 border border-orange-500/30 bg-orange-500/10 p-2 shadow-[0_0_20px_4px] shadow-orange-500/20 backdrop-blur-3xl">
                {DATA.navbar.map((item) => {
                    const isExternal = item.href.startsWith('http');

                    return (
                        <Tooltip key={item.href}>
                            <TooltipTrigger asChild>
                                <a
                                    href={item.href}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={
                                        isExternal
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                >
                                    <DockIcon className="size-full cursor-pointer rounded-3xl border border-orange-500/30 bg-orange-500/10 p-0 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white">
                                        <item.icon className="size-full overflow-hidden rounded-sm object-contain" />
                                    </DockIcon>
                                </a>
                            </TooltipTrigger>

                            <TooltipContent
                                side="top"
                                sideOffset={8}
                                className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white shadow-lg"
                            >
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}

                <Separator
                    orientation="vertical"
                    className="m-auto h-2/3 w-px bg-orange-500/40"
                />

                {Object.entries(DATA.contact.social)
                    .filter(([, social]) => social.navbar)
                    .map(([name, social], index) => {
                        const isExternal = social.url.startsWith('http');
                        const IconComponent = social.icon;

                        return (
                            <Tooltip key={`social-${name}-${index}`}>
                                <TooltipTrigger asChild>
                                    <a
                                        href={social.url}
                                        target={
                                            isExternal ? '_blank' : undefined
                                        }
                                        rel={
                                            isExternal
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                    >
                                        <DockIcon className="size-full cursor-pointer rounded-3xl border border-orange-500/30 bg-orange-500/10 p-0 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white">
                                            <IconComponent className="size-full overflow-hidden rounded-sm object-contain" />
                                        </DockIcon>
                                    </a>
                                </TooltipTrigger>

                                <TooltipContent
                                    side="top"
                                    sideOffset={8}
                                    className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white shadow-lg"
                                >
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}

                <Separator
                    orientation="vertical"
                    className="m-auto h-2/3 w-px bg-orange-500/40"
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <DockIcon className="size-full cursor-pointer rounded-3xl border border-orange-500/30 bg-orange-500/10 p-0 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white">
                            <ModeToggle className="size-full cursor-pointer" />
                        </DockIcon>
                    </TooltipTrigger>

                    <TooltipContent
                        side="top"
                        sideOffset={8}
                        className="rounded-xl bg-orange-500 px-4 py-2 text-sm text-white shadow-lg"
                    >
                        <p>Theme</p>
                    </TooltipContent>
                </Tooltip>
            </Dock>
        </div>
    );
}
