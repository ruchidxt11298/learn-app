"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useThemeStore } from "@/store/useThemeStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { useRecentViewsStore } from "@/store/useRecentViewsStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import ToastViewport from "@/components/ui/Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
      }),
  );

  useEffect(() => {
    useThemeStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useCompareStore.persist.rehydrate();
    useRecentViewsStore.persist.rehydrate();
    useCurrencyStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const unsub = useThemeStore.subscribe((state) => {
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    });
    if (useThemeStore.getState().theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    return unsub;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastViewport />
    </QueryClientProvider>
  );
}
