"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import Container from "./Container";
import { buttonVariants } from "@/components/ui/Button";
import DarkModeToggle from "@/features/site/DarkModeToggle";
import GlobalSearchBar from "@/features/search/GlobalSearchBar";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-white/95 shadow-sm backdrop-blur dark:bg-dark/95"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-heading text-xl font-bold text-primary dark:text-white">
          <Image src="/logo-travel.jpeg" width={40} height={40} alt={`${siteConfig.name} logo`} className="rounded-full object-cover" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                pathname === link.href ? "text-primary dark:text-secondary-light" : "text-text dark:text-slate-200",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <GlobalSearchBar />
          <DarkModeToggle />
          <Link
            href="/wishlist"
            aria-label={`Wishlist (${wishlistCount} saved)`}
            className="relative rounded-full p-2 text-text hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/booking" className={buttonVariants({ size: "sm" })}>
            Book Now
          </Link>
        </div>

        <button
          className="p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 lg:hidden dark:border-slate-700 dark:bg-dark">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href ? "bg-primary/10 text-primary" : "text-text dark:text-slate-200",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <GlobalSearchBar />
            <div className="flex items-center justify-between gap-3">
              <DarkModeToggle />
              <Link href="/wishlist" className="flex items-center gap-1 text-sm font-medium text-text dark:text-slate-200">
                <Heart className="h-5 w-5" /> {wishlistCount}
              </Link>
            </div>
          </div>
          <Link href="/booking" className={buttonVariants({ className: "mt-4 w-full" })}>
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
