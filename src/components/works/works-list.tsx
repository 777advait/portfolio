import { format } from "date-fns";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "~/lib/utils";

export default function WorksList({ works }: { works: TWork[] }) {
  const [hoveredItem, setHoveredItem] = React.useState<TWork | null>(null);
  const [tappedItem, setTappedItem] = React.useState<TWork | null>(null);

  const isMobile = useMediaQuery("(max-width: 1023px)");

  const handleClick = (e: React.MouseEvent, work: TWork) => {
    if (isMobile) {
      if (tappedItem?._id !== work._id) {
        e.preventDefault(); // stop navigation on first tap
        setTappedItem(work);
        setHoveredItem(work);
      } else {
        // second tap → allow navigation
        setTappedItem(null);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
      <ul className="flex flex-1 flex-col gap-y-1.5 lg:max-w-[40%]">
        {works.map((work) => (
          <li
            key={work._id}
            onMouseEnter={() => !isMobile && setHoveredItem(work)}
            onMouseLeave={() => !isMobile && setHoveredItem(null)}
            className="group relative flex items-center gap-y-2"
          >
            {work.url ? (
              <a
                target="_blank"
                href={work.url}
                onClick={(e) => handleClick(e, work)}
                className={cn("px-1 text-left text-lg", {
                  "bg-muted text-muted-foreground":
                    (hoveredItem && hoveredItem._id) === work._id,
                })}
              >
                {work._title}
              </a>
            ) : (
              <p
                onClick={(e) => handleClick(e, work)}
                className={cn("px-1 text-left text-lg", {
                  "bg-muted text-muted-foreground":
                    (hoveredItem && hoveredItem._id) === work._id,
                })}
              >
                {work._title}
              </p>
            )}

            <span className="mx-1.5 flex-1 border-t" />

            <p className="text-muted-foreground text-right text-sm">
              {work.date ? format(new Date(work.date), "MM/yyyy") : "N/A"}
            </p>
          </li>
        ))}
      </ul>

      {hoveredItem && (
        <div className="flex-1 lg:max-w-[40%]">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <h2 className="text-muted-foreground font-medium">Role</h2>
                <p>{hoveredItem.role}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <h2 className="text-muted-foreground font-medium">Year</h2>
                <p>
                  {hoveredItem.date
                    ? format(new Date(hoveredItem.date), "MM/yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>
            <p>{hoveredItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
