"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-semibold text-xl text-white hover:text-white flex items-center gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Kiran's Fitness Club Logo" className="w-12 h-12 object-contain" />
          <span className="hidden sm:inline">Kiran&apos;s Fitness Club</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="btn-secondary text-sm !py-2 !px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm !py-2 !px-4">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-background ${
          mobileOpen ? "max-h-96 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="container-custom py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.href
                  ? "text-accent"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-text-secondary hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="btn-secondary text-sm !py-2 !px-4 w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-primary text-sm !py-2 !px-4 w-fit"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
