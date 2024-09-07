import clsx from "clsx";

const links = [
  { href: "/", text: "about" },
  { href: "/writings", text: "writings" },
  { href: "/projects", text: "projects" },
];

export default function Navbar() {
  const currentUrl = window.location.href;

  const pathname = currentUrl.split("/")[3];

  return (
    <header className="border-b py-2 md:py-4">
      <nav className="flex items-center justify-between px-2.5">
        <ul className="flex items-center gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={clsx([
                  "text-sm underline-offset-2 decoration-dashed md:text-base",
                  {
                    underline: "/" + pathname === link.href,
                    "text-muted-foreground": "/" + pathname === link.href,
                  },
                ])}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <a
              className={clsx([
                "text-sm underline-offset-2 decoration-dashed md:text-base",
                {
                  underline: "/" + pathname === "/chat",
                  "text-muted-foreground": "/" + pathname === "/chat",
                },
              ])}
              href="/chat"
            >
              chat
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
