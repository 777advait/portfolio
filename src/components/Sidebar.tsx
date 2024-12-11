import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import Timer from "./Timer";
import SpotifyNowListening from "./SpotifyNowListening";

const links = [
  {
    href: "/",
    label: "about",
  },
  {
    href: "/works",
    label: "works",
  },
  {
    href: "/thoughts",
    label: "thoughts",
  },
  {
    href: "/archive",
    label: "archive",
  },
  {
    href: "/connect",
    label: "connect",
  },
];

function SidebarContent() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const currentPath = `/${window.location.pathname.split("/")[1]}`;

  return (
    <nav className="flex flex-col h-full">
      <ul className="space-y-6 text-sm flex-grow">
        {links.map((link, index) => {
          const isActive = link.href === currentPath;
          return (
            <motion.li
              className={cn("border-t px-1.5 py-2", {"font-medium": isActive})}
              key={link.href}
              initial={{ opacity: isActive ? 1 : 0.65 }}
              animate={{
                opacity: isActive
                  ? 1
                  : hoveredIndex === null
                    ? 0.65
                    : hoveredIndex === index
                      ? 1
                      : 0.25,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a href={link.href} className="block">
                {link.label} {isActive ? "-" : "+"}
              </a>
            </motion.li>
          );
        })}
      </ul>
      <div className="mt-auto space-y-1.5 px-1.5">
        <Timer />
        <SpotifyNowListening />
      </div>
    </nav>
  );
}

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isOpen, setIsOpen] = React.useState(false);

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
            className="fixed top-0 left-0 h-full w-64 px-4 py-12 border-r border-border/65 bg-background z-[999] overflow-y-hidden"
          >
            {!isDesktop && (
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4"
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Cross2Icon />
              </motion.button>
            )}
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
