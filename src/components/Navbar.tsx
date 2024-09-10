import { cn } from "@/lib/utils";

const links = [
  { href: "/", text: "about" },
  { href: "/writings", text: "writings" },
  { href: "/projects", text: "projects" },
];

export default function Navbar() {
  const currentUrl = window.location.href;
  const pathname = `/${currentUrl.split("/")[3]}`;

  return (
    <header className="border-b py-2 md:py-4">
      <nav className="flex items-center justify-between px-2.5">
        <ul className="flex items-center gap-4 md:gap-6">
          {links.map((link) => {
            const isActive = link.href === pathname;

            return (
              <li key={link.href}>
                {isActive ? (
                  <span className="text-muted-foreground">*</span>
                ) : (
                  <span className="text-muted-foreground">+</span>
                )}
                <a
                  href={link.href}
                  className={cn([
                    "text-sm md:text-base",
                    {
                      "text-muted-foreground": isActive,
                    },
                  ])}
                >
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
        <ul>
          {(() => {
            const isActive = pathname === "/chat";

            return (
              <li>
                {isActive ? (
                  <span className="text-muted-foreground">*</span>
                ) : (
                  <span className="text-muted-foreground">+</span>
                )}
                <a
                  className={cn([
                    "text-sm md:text-base",
                    {
                      "text-muted-foreground": isActive,
                    },
                  ])}
                  href="/chat"
                >
                  chat
                </a>
              </li>
            );
          })()}
        </ul>
      </nav>
    </header>
  );
}
