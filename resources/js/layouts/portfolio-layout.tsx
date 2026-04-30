import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider delayDuration={0}>

        <div className="min-h-screen bg-background font-sans antialiased relative">

          {/* GRID */}
          <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={4}
              gridGap={4}
              color="#f97700"
              style={{
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black, transparent)",
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
            {children}
          </div>

          {/* NAVBAR */}
          <Navbar />
        </div>

      </TooltipProvider>
    </ThemeProvider>
  );
}
