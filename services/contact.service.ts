import { simulateNetwork } from "@/lib/mockDelay";
import type { ContactMessage } from "@/types";

const STORAGE_KEY = "roshijourneys_contact_messages";

export async function submitContactMessage(payload: ContactMessage): Promise<{ success: true }> {
  // MOCK now: persist to localStorage. REAL later:
  // await api.post('/contact', payload); return { success: true };
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ ...payload, submittedAt: new Date().toISOString() }, ...existing]));
  }
  return simulateNetwork({ success: true as const }, 700);
}
