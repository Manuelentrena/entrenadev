import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full border  border-orange-500 rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
        className
      )}
    >

      {/* MEDIA */}
      <div className="relative shrink-0">

        <Link
          href={href || "#"}
          className="block"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </Link>

        {/* LINKS BADGES */}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((l, idx) => (
              <a
                href={l.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge className="flex items-center gap-1.5 text-xs dark:bg-orange-200 bg-orange-400 dark:text-black text-white hover:dark:bg-orange-300/90 hover:bg-orange-600/90">
                  {l.icon}
                  {l.type}
                </Badge>
              </a>
            ))}
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col gap-3 flex-1">

        <div className="flex items-start justify-between gap-2">

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-orange-900 dark:text-orange-300">{title}</h3>
            <time className="text-xs text-muted-foreground">
              {dates}
            </time>
          </div>

          <Link
            href={href || "#"}
            className="text-muted-foreground hover:text-foreground"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4 text-orange-900 dark:text-orange-300" />
          </Link>

        </div>

        {/* DESCRIPTION */}
        <div className="text-xs flex-1 prose max-w-full text-muted-foreground">
          <Markdown>{description}</Markdown>
        </div>

        {/* TAGS */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border h-6 px-2 border-orange-800/40 bg-background text-orange-400 dark:text-orange-300"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
