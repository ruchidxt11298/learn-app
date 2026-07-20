import { faqsMock } from "@/data/faqs.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { Faq } from "@/types";

export async function getFaqs(filters: { category?: string; search?: string } = {}): Promise<Faq[]> {
  let items = [...faqsMock];
  if (filters.category) items = items.filter((f) => f.category === filters.category);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    items = items.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }
  return simulateNetwork(items);
}

export async function getFaqCategories(): Promise<string[]> {
  return simulateNetwork(Array.from(new Set(faqsMock.map((f) => f.category))), 0);
}
