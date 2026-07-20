import { useQuery } from "@tanstack/react-query";
import { getFaqCategories, getFaqs } from "@/services/faqs.service";

export function useFaqs(filters: { category?: string; search?: string } = {}) {
  return useQuery({ queryKey: ["faqs", filters], queryFn: () => getFaqs(filters) });
}

export function useFaqCategories() {
  return useQuery({ queryKey: ["faq-categories"], queryFn: getFaqCategories, staleTime: Infinity });
}
