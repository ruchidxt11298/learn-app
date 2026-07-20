"use client";

import { Facebook, Twitter, Linkedin, Link2, Share2 } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const show = useToastStore((s) => s.show);

  const links = [
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ];

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    show("Link copied to clipboard", "success");
  }

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
        <Share2 className="h-3.5 w-3.5" /> Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-text-muted transition-colors hover:bg-primary hover:text-white dark:bg-slate-700"
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-text-muted transition-colors hover:bg-primary hover:text-white dark:bg-slate-700"
      >
        <Link2 className="h-4 w-4" />
      </button>
    </div>
  );
}
