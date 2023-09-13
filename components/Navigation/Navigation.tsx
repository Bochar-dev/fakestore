"use client";

import "./style.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLink = {
  label: string;
  href: string;
};

type NavigationProps = {
  navLinks: NavigationLink[];
};

const Navigation = ({ navLinks }: NavigationProps) => {
  const pathName = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathName === link.href;

        return (
          <Link
            className={`nav-link ${isActive ? "active" : ""}`}
            key={link.label}
            href={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
