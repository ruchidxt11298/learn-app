import Image, { type ImageProps } from "next/image";
import { getImageUrl } from "@/lib/cloudinary";
import type { ImageAsset } from "@/types";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  image: ImageAsset;
  width?: number;
  height?: number;
}

export default function ImageWithFallback({ image, width, height, fill, ...props }: ImageWithFallbackProps) {
  const src = getImageUrl(image.publicId, image.url, { width, height });

  if (fill) {
    return <Image src={src} alt={image.alt} fill {...props} />;
  }

  return <Image src={src} alt={image.alt} width={width ?? image.width ?? 800} height={height ?? image.height ?? 600} {...props} />;
}
