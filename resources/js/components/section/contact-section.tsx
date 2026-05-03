import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { DATA } from '@/data/resume';

export default function ContactSection() {
    return (
        <div className="relative mt-16 rounded-xl border border-orange-500/30 p-10">
            {/* LABEL */}
            <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 rounded-xl bg-orange-400 px-4 py-1 text-white dark:bg-orange-200 dark:text-black">
                <span className="text-sm font-medium">Contact</span>
            </div>

            {/* BACKGROUND GRID */}
            <div className="absolute inset-0 top-0 right-0 left-0 h-1/2 overflow-hidden rounded-xl">
                <FlickeringGrid
                    className="h-full w-full"
                    squareSize={4}
                    gridGap={4}
                    color="#f97700"
                    style={{
                        maskImage:
                            'linear-gradient(to bottom, black, transparent)',
                        WebkitMaskImage:
                            'linear-gradient(to bottom, black, transparent)',
                    }}
                />
            </div>

            {/* FOOTER IMAGE - Behind content */}
            <div className="absolute bottom-0 left-0 z-0">
                <div className="relative overflow-hidden">
                    <img
                        src={DATA.contact.image}
                        alt="Footer decoration"
                        className="h-40 w-auto opacity-90 md:h-40 lg:h-40"
                        style={{
                            transform: 'translate(-20%, 20%)',
                            clipPath:
                                'polygon(20% 0%, 100% 0%, 100% 80%, 0% 80%, 0% 20%)',
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-orange-500/40 mix-blend-overlay"
                        style={{
                            clipPath:
                                'polygon(60% 0%, 60% 65%, 5% 100%, 3% 99%, 2% 98%, 0% 95%, 0% 40%)',
                        }}
                    />
                </div>
            </div>

            {/* CONTENT - Above image */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter text-orange-800 sm:text-5xl">
                    Get in Touch
                </h2>

                <p className="mx-auto max-w-lg text-balance text-muted-foreground">
                    DM me on{' '}
                    <a
                        href={DATA.contact.social.Instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline-offset-4 hover:underline"
                    >
                        Instagram
                    </a>{' '}
                    for a quick chat.
                </p>
            </div>
        </div>
    );
}
