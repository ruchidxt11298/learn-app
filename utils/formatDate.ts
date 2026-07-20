export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }): string {
  return new Date(iso).toLocaleDateString("en-US", options);
}

export function formatShortDate(iso: string): string {
  return formatDate(iso, { year: "numeric", month: "short", day: "numeric" });
}
