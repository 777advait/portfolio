import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { TWork } from "~/types/works.types";
import { RichText } from "basehub/react-rich-text";

// Helper function to format date as MM/yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${year}`;
};

export default function WorksList({ works }: { works: TWork[] }) {
  const [hoveredItem, setHoveredItem] = React.useState<TWork | null>(null);
  const [lockedItem, setLockedItem] = React.useState<TWork | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside to release lock
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setLockedItem(null);
        setHoveredItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent, work: TWork) => {
    if (lockedItem?._id === work._id) {
      // Second click - allow navigation if URL exists
      if (work.url) {
        // Let the default anchor behavior happen
        setLockedItem(null);
      }
    } else {
      // First click - lock the item
      e.preventDefault();
      setLockedItem(work);
      setHoveredItem(work);
    }
  };

  const handleMouseEnter = (work: TWork) => {
    // Only show on hover if nothing is locked
    if (!lockedItem) {
      setHoveredItem(work);
    }
  };

  const handleMouseLeave = () => {
    // Only clear hover if nothing is locked
    if (!lockedItem) {
      setHoveredItem(null);
    }
  };

  const displayedItem = lockedItem || hoveredItem;

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-8 lg:flex-row lg:items-start lg:justify-between lg:space-y-0"
    >
      <ul className="flex flex-1 flex-col gap-y-1.5 lg:max-w-[45%]">
        {works.map((work) => (
          <li
            key={work._id}
            onMouseEnter={() => handleMouseEnter(work)}
            onMouseLeave={handleMouseLeave}
            className="group relative flex items-center gap-y-2"
          >
            {work.url ? (
              <a
                target="_blank"
                href={work.url}
                onClick={(e) => handleClick(e, work)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-x-1 px-1 text-left text-lg",
                  {
                    "bg-muted text-muted-foreground":
                      displayedItem?._id === work._id,
                  },
                )}
              >
                {work._title}
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <p
                onClick={(e) => handleClick(e, work)}
                className={cn("cursor-pointer px-1 text-left text-lg", {
                  "bg-muted text-muted-foreground":
                    displayedItem?._id === work._id,
                })}
              >
                {work._title}
              </p>
            )}

            <span className="mx-1.5 flex-1 border-t" />

            <p className="text-muted-foreground text-right text-sm">
              {work.date ? formatDate(work.date) : "N/A"}
            </p>
          </li>
        ))}
      </ul>

      {displayedItem && (
        <div className="flex-1 lg:max-w-[45%]">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <h2 className="text-muted-foreground font-medium">Role</h2>
                <p>{displayedItem.role}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <h2 className="text-muted-foreground font-medium">Year</h2>
                <p>
                  {displayedItem.date ? formatDate(displayedItem.date) : "N/A"}
                </p>
              </div>
            </div>
            <div
              className={cn(
                "[&_a]:bg-muted [&_a]:text-muted-foreground [&_a]:px-1 [&_a]:font-medium",
              )}
            >
              <RichText content={displayedItem.description.json.content} />
            </div>
            {lockedItem && displayedItem.url && (
              <p className="text-muted-foreground flex items-center text-sm font-medium">
                Click again to open link{" "}
                <ArrowUpRight className="ml-1 size-4 font-medium" />
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
