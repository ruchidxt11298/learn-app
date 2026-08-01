import type { GalleryItem } from "@/types";
import { img } from "./_helpers";

const entries: [string, string, number, number][] = [
  ["gallery-1", "Religious Tour", 800, 1000],
  ["gallery-2", "Wildlife", 800, 600],
  ["gallery-3", "Trekking", 800, 1100],
  ["gallery-4", "Desert Safari", 800, 700],
  ["gallery-5", "Spiritual Journey", 800, 900],
  ["gallery-6", "Family Tour", 800, 650],
  ["gallery-7", "Religious Tour", 800, 950],
  ["gallery-8", "Luxury Tour", 800, 700],
  ["gallery-9", "Trekking", 800, 800],
  ["gallery-10", "Wildlife", 800, 1000],
  ["gallery-11", "Trekking", 800, 650],
  ["gallery-12", "Desert Safari", 800, 900],
  ["gallery-13", "Spiritual Journey", 800, 700],
  ["gallery-14", "Family Tour", 800, 1000],
  ["gallery-15", "Family Tour", 800, 800],
  ["gallery-16", "Luxury Tour", 800, 650],
  ["gallery-17", "Family Tour", 800, 950],
  ["gallery-18", "Religious Tour", 800, 700],
  ["gallery-19", "Wildlife", 800, 1050],
  ["gallery-20", "Wildlife", 800, 750],
];

export const galleryMock: GalleryItem[] = entries.map(([seed, category, w, h], i) => ({
  id: `gal-${i + 1}`,
  category,
  image: img(seed, w, h, `${category} travel photo`),
}));
