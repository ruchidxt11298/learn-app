import Link from "next/link";
import { Compass, Facebook, Instagram, Mail, MapPin, Phone, Clock } from "lucide-react";
import Container from "./Container";
import MapEmbed from "@/components/media/MapEmbed";
import { siteConfig } from "@/lib/site-config";
import { destinationsMock } from "@/data/destinations.mock";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Tour Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/legal/cancellation-policy", label: "Cancellation Policy" },
];

const SOCIAL_LINKS = [
  { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  const topDestinations = destinationsMock.slice(0, 6);

  return (
    <footer className="border-t border-slate-200 bg-dark text-slate-300 dark:border-slate-800">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-white">
            <Compass className="h-6 w-6 text-secondary" aria-hidden />
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-secondary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-secondary-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">Top Destinations</h3>
          <ul className="space-y-2 text-sm">
            {topDestinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="transition-colors hover:text-secondary-light">
                  {d.name}, {d.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-secondary" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-secondary-light">
                {siteConfig.contact.phone} (Roshan Pawar)
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-secondary" />
              <a href={`tel:${siteConfig.contact.phoneSecondary}`} className="hover:text-secondary-light">
                {siteConfig.contact.phoneSecondary} (Aashi Luniya)
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-secondary" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-secondary-light">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-secondary" />
              <span>{siteConfig.contact.businessHours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="pb-16">
        <MapEmbed location={siteConfig.location} className="h-64" title="Roshi Journeys office location" />
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-secondary-light">
                {l.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
