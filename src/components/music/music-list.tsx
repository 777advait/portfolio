import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface Songs {
  title: string;
  artist: string;
  songUrl: string;
}

export default function MusicList({ songs }: { songs: Songs[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="">
      <ul className="space-y-1.5">
        {songs.map((song, index) => (
          <li
            className={cn(
              "transition-opacity duration-150 ease-linear border-t p-1.5",
              {
                "opacity-45": hoveredIndex !== index && hoveredIndex !== null,
              }
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={index}
          >
            <a href={song.songUrl} target="_blank" className="flex flex-col  gap-0.5">
              <p className="font-medium truncate md:max-w-[calc(100%-5rem)] max-w-[70%]">
                {song.title}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {song.artist}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
