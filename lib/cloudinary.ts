import { cloudinaryCloudName, hasCloudinary } from "./config";

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: string;
}

export function getImageUrl(publicId: string | undefined, fallbackUrl: string, opts: CloudinaryOptions = {}) {
  if (!hasCloudinary || !publicId) return fallbackUrl;
  const { width, height, quality = "auto" } = opts;
  const transforms = ["f_auto", `q_${quality}`, width && `w_${width}`, height && `h_${height}`, width && height && "c_fill"]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${transforms}/${publicId}`;
}
