"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const links = [
  { href: "/", text: "about" },
  { href: "/writings", text: "writings" },
  { href: "/projects", text: "projects" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = React.useState<
    number | string | null
  >(null);

  return (
    <header className="border-b py-2 md:py-4">
      <nav className="flex items-center justify-between px-2.5">
        <ul className="flex items-center gap-4 md:gap-6">
          {links.map((link, index) => {
            const isActive =
              link.href === `/${window.location.pathname.split("/")[1]}`;

            return (
              <li
                key={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center"
              >
                <span className="text-muted-foreground w-4 inline-block text-center">
                  {isActive ? "*" : "+"}
                </span>
                <motion.a
                  href={link.href}
                  className={cn(
                    "text-sm md:text-base relative overflow-hidden inline-block",
                    {
                      "text-muted-foreground": isActive,
                    }
                  )}
                  style={{
                    filter:
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "blur(1.5px)"
                        : "none",
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      y: hoveredIndex === index ? "-100%" : "0%",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {link.text}
                  </motion.span>
                  <motion.span
                    className="inline-block absolute left-0"
                    animate={{
                      y: hoveredIndex === index ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {link.text}
                  </motion.span>
                </motion.a>
              </li>
            );
          })}
        </ul>
        <ul>
          {(() => {
            const isActive =
              `/${window.location.pathname.split("/")[1]}` === "/chat";

            return (
              <li
                onMouseEnter={() => setHoveredIndex("chat")}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center"
              >
                <span className="text-muted-foreground w-4 inline-block text-center">
                  {isActive ? "*" : "+"}
                </span>
                <motion.a
                  className={cn(
                    "text-sm md:text-base relative overflow-hidden inline-block",
                    {
                      "text-muted-foreground": isActive,
                    }
                  )}
                  href="/chat"
                  style={{
                    filter:
                      hoveredIndex !== null && hoveredIndex !== "chat"
                        ? "blur(1.5px)"
                        : "none",
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      y: hoveredIndex === "chat" ? "-100%" : "0%",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    chat
                  </motion.span>
                  <motion.span
                    className="inline-block absolute left-0"
                    animate={{
                      y: hoveredIndex === "chat" ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    chat
                  </motion.span>
                </motion.a>
              </li>
            );
          })()}
        </ul>
      </nav>
    </header>
  );
}
