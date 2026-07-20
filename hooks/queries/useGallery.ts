import { useQuery } from "@tanstack/react-query";
import { getGalleryCategories, getGalleryItems } from "@/services/gallery.service";

export function useGalleryItems(category?: string) {
  return useQuery({ queryKey: ["gallery", category], queryFn: () => getGalleryItems(category) });
}

export function useGalleryCategories() {
  return useQuery({ queryKey: ["gallery-categories"], queryFn: getGalleryCategories, staleTime: Infinity });
}
