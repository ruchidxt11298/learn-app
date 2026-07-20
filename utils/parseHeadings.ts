export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseHeadings(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];

  const withIds = html.replace(/<(h2|h3)>(.*?)<\/\1>/g, (_match, tag: "h2" | "h3", text: string) => {
    const id = slugify(text.replace(/<[^>]+>/g, ""));
    headings.push({ id, text: text.replace(/<[^>]+>/g, ""), level: tag === "h2" ? 2 : 3 });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { html: withIds, headings };
}
