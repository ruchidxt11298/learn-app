/**
 * Single source of truth for optional 3rd-party integrations.
 * The site must work end-to-end with none of these configured —
 * every consumer below falls back to a static/mock experience.
 */
export const hasGoogleMaps = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
export const hasCloudinary = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
export const hasPaymentProvider = Boolean(process.env.NEXT_PUBLIC_PAYMENT_PROVIDER_KEY);

export const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
