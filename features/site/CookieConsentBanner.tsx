"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "roshijourneys_cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-900/10 sm:flex-row dark:bg-slate-800"
        >
          <Cookie className="h-8 w-8 shrink-0 text-accent" aria-hidden />
          <p className="text-sm text-text-muted dark:text-slate-300">
            We use cookies to enhance your browsing experience and analyze site traffic. By continuing, you agree to our use of cookies.
          </p>
          <Button size="sm" onClick={accept} className="w-full shrink-0 sm:w-auto">
            Accept
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
