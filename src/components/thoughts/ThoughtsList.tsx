import type { Writings } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function ThoughtsList({ writings }: { writings: Writings[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <ul className="space-y-1.5">
      {writings.map((writing, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              hoveredIndex === index || expandedIndex === index
                ? 1
                : hoveredIndex !== null || expandedIndex !== null
                  ? 0.25
                  : 1,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() =>
            setExpandedIndex(expandedIndex === index ? null : index)
          }
          key={index}
          className="border-t p-1.5"
        >
          <a
            href={`/thoughts/${writing.slug.current}`}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5"
          >
            <p className="font-medium truncate md:max-w-[calc(100%-5rem)] max-w-[70%]">
              {writing.title}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              {new Date(writing._createdAt).toLocaleDateString("en-GB")}
            </p>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}