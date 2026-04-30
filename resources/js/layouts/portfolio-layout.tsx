import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider delayDuration={0}>
                <div className="relative min-h-screen bg-background font-sans antialiased">
                    {/* GRID */}
                    <div className="absolute inset-0 top-0 right-0 left-0 z-0 h-[100px] overflow-hidden">
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

                    {/* CONTENT */}
                    <div className="relative z-10 mx-auto max-w-2xl px-6 py-12 pb-24 sm:py-24">
                        {children}
                    </div>

                    {/* NAVBAR */}
                    <Navbar />
                </div>
            </TooltipProvider>
        </ThemeProvider>
    );
}
