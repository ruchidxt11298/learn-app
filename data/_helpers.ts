import type { ImageAsset } from "@/types";

export function img(seed: string, width = 800, height = 600, alt = ""): ImageAsset {
  return {
    url: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    alt,
    publicId: `roshijourneys/${seed}`,
    width,
    height,
  };
}

export function avatar(seed: string, alt = ""): ImageAsset {
  return {
    url: `https://i.pravatar.cc/150?u=${seed}`,
    alt,
    publicId: `roshijourneys/avatars/${seed}`,
    width: 150,
    height: 150,
  };
}
