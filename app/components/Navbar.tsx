"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";
import { FcTodoList } from "react-icons/fc";

export function NavbarMenu() {
  const navItems = [
    {
      name: "My activities",
      link: "/myactivities",
    },
    {
      name: "Overdues",
      link: "/overdues",
    },
    {
      name: "Completed",
      link: "/completed",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-neutral-700 shadow-md">
      <Navbar>
        {/* Desktop Nav */}
        <NavBody className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-white hover:text-indigo-400 transition"
          >
            <FcTodoList size={'28px'} />
            <span className="text-base font-semibold">Plan your activities</span>
          </Link>

          <NavItems items={navItems}/>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader className="flex items-center justify-between px-4 py-2">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-indigo-400 transition"
            >
              <FcTodoList size={'28px'} />
              <span className="text-base font-semibold">Plan your activities</span>
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-black/80 backdrop-blur-md border-t border-neutral-700"
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-white hover:text-indigo-400 transition"
              >
                {item.name}
              </Link>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
