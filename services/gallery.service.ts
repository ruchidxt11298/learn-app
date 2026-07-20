import { galleryMock } from "@/data/gallery.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { GalleryItem } from "@/types";

export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  const items = category ? galleryMock.filter((g) => g.category === category) : galleryMock;
  return simulateNetwork(items);
}

export async function getGalleryCategories(): Promise<string[]> {
  return simulateNetwork(Array.from(new Set(galleryMock.map((g) => g.category))), 0);
}
