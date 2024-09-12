import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const links = [
  { href: "/", text: "about" },
  { href: "/writings", text: "writings" },
  { href: "/projects", text: "projects" },
];

export default function Navbar() {
  const currentUrl = window.location.href;
  const pathname = `/${currentUrl.split("/")[3]}`;
  const [hoveredIndex, setHoveredIndex] = React.useState<
    number | string | null
  >(null);

  return (
    <header className="border-b py-2 md:py-4">
      <nav className="flex items-center justify-between px-2.5">
        <ul className="flex items-center gap-4 md:gap-6">
          {links.map((link, index) => {
            const isActive = link.href === pathname;

            return (
              <li
                key={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isActive ? (
                  <span className="text-muted-foreground">*</span>
                ) : (
                  <span className="text-muted-foreground">+</span>
                )}
                <motion.a
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, staggerChildren: 0.15 }}
                  href={link.href}
                  className={cn([
                    "text-sm md:text-base relative transition duration-300",
                    {
                      "text-muted-foreground": isActive,
                    },
                  ])}
                  style={{
                    filter:
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "blur(1.5px)"
                        : "none", // Framer Motion will handle blur here
                  }}
                >
                  {link.text}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-[1.5px] w-full h-[2px] bg-muted-foreground rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: hoveredIndex === index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </li>
            );
          })}
        </ul>
        <ul>
          {(() => {
            const isActive = pathname === "/chat";

            return (
              <li
                onMouseEnter={() => setHoveredIndex("chat")}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isActive ? (
                  <span className="text-muted-foreground">*</span>
                ) : (
                  <span className="text-muted-foreground">+</span>
                )}
                <motion.a
                  className={cn([
                    "text-sm md:text-base relative transition duration-300",
                    {
                      "text-muted-foreground": isActive,
                    },
                  ])}
                  href="/chat"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, staggerChildren: 0.15 }}
                  style={{
                    filter:
                      hoveredIndex !== null && hoveredIndex !== "chat"
                        ? "blur(1.5px)"
                        : "none",
                  }}
                >
                  chat
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-[1.5px] w-full h-[2px] bg-muted-foreground rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: hoveredIndex === "chat" ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </li>
            );
          })()}
        </ul>
      </nav>
    </header>
  );
}
