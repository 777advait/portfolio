import { cn } from "@/lib/utils";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Timer from "./Timer";
import SpotifyNowListening from "./SpotifyNowListening";

const links = [
  {
    href: "/wne3",
    label: "wne3",
  },
  {
    href: "/grass-labs",
    label: "grass labs",
  },
  {
    href: "/dream-skrin",
    label: "dream skrin",
  },
  {
    href: "/sanity-gaming",
    label: "sanity gaming",
  },
  {
    href: "/indielettr",
    label: "indielettr",
  },
  {
    href: "/salad-and-tartine",
    label: "salad & tartine",
  },
];

const socials = [
  {
    href: "https://github.com/777advait",
    label: "github",
  },
  {
    href: "https://x.com/777advait",
    label: "twitter",
  },
  {
    href: "mailto:advait.nsj@proton.me",
    label: "email",
  },
];

function SidebarContent() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const allLinks = [
    ...links,
    {
      href: "/works",
      label: "other works",
    },
    {
      href: "/music",
      label: "music",
    },
    {
      href: "/thoughts",
      label: "thoughts",
    },
    {
      href: "/archive",
      label: "archive",
    },
  ];

  return (
    <div className="p-4 w-fit">
      <nav className="pl-4 space-y-6">
        <a href="/">
          <h1 className="font-pangaia text-6xl ">astro</h1>
        </a>

        <ol className="pl-12 list-decimal font-pangaia font-extralight text-2xl">
          {allLinks.map((link, index) => (
            <li
              className={cn("transition-opacity duration-150 ease-linear", {
                "opacity-45": hoveredIndex !== index && hoveredIndex !== null,
              })}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={link.href}
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ol>

        <div className="space-y-2">
          <ul className="text-4xl font-pangaia space-y-0.5">
            {socials.map((social) => (
              <li
                className="hover:translate-x-2 transition-all duration-150 ease-linear"
                key={social.href}
              >
                <a
                  target="_blank"
                  className="flex items-baseline gap-1"
                  href={social.href}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-1.5 px-1.5 ">
          <Timer />
        </div>
      </nav>
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {!isDesktop && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-7 left-7 z-50 "
        >
          <div className="w-6 h-0.5 bg-foreground mb-1"></div>
          <div className="w-6 h-0.5 bg-foreground mb-1"></div>
        </button>
      )}
      <AnimatePresence>
        {(isDesktop || isOpen) && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-3/4 border-r border-border/65 bg-background z-[999] overflow-y-hidden lg:w-72"
          >
            {!isDesktop && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4"
              >
                <Cross2Icon />
              </button>
            )}
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
