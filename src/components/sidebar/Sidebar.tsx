"use client";

import Link from "next/link";
import { Icons } from "../icons/Icons";
import styles from "./Sidebar.module.scss";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", icon: Icons.NavOverview, label: "Overview" },
  { href: "/transactions", icon: Icons.NavTransactions, label: "Transactions" },
  { href: "/budgets", icon: Icons.NavBudgets, label: "Budgets" },
  { href: "/pots", icon: Icons.NavPots, label: "Pots" },
  {
    href: "/recurring-bills",
    icon: Icons.NavRecurringBills,
    label: "Recurring Bills",
  },
];

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreload, setIsPreload] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sidebarRef) {
      timer = setTimeout(() => {
        setIsPreload(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isMenuOpen);
    document.body.classList.toggle("sidebar-closed", !isMenuOpen);
  }, [isMenuOpen]);

  return (
    <aside
      className={`${styles.sidebar} ${isMenuOpen ? styles.sidebar_open : ""} ${
        isPreload ? styles.preload : ""
      }`}
      ref={sidebarRef}
    >
      <div className={styles.logo}>
        <Icons.LogoLarge
          className={`${styles.logo__large} ${
            isMenuOpen ? styles.logo__large_open : ""
          }`}
        />
        <Icons.LogoSmall
          className={`${styles.logo__small} ${
            isMenuOpen ? styles.logo__small_open : ""
          }`}
        />
      </div>
      <nav className={styles.nav}>
        <ul
          className={`${styles.nav__links} ${
            isMenuOpen ? styles.nav__links_open : ""
          }`}
        >
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`${styles.nav__linkEl} ${
                isMenuOpen ? styles.nav__linkEl_open : styles.nav__linkEl_closed
              } ${pathname === link.href ? styles.nav__linkEl_active : ""}`}
              aria-label={`Navigate to ${link.label}`}
            >
              <Link href={link.href} className={`${styles.nav__linkEl__link} `}>
                <link.icon className={styles.icon} />
                <span
                  className={`${styles.nav__linkEl_name} ${
                    isMenuOpen ? styles.nav__linkEl_name_open : ""
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`${styles.displayMenu} ${
          isMenuOpen ? styles.open : styles.close
        }`}
        aria-label={isMenuOpen ? "Minimize Menu" : "Expand Menu"}
        aria-expanded={isMenuOpen}
        role="button"
        tabIndex={0}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setIsMenuOpen(!isMenuOpen);
        }}
      >
        <Icons.MinimizeMenu />
        <span
          className={`${styles.displayMenu__text} ${
            isMenuOpen ? styles.display : styles.hide
          }`}
        >
          Minimize Menu
        </span>
      </div>
    </aside>
  );
}
