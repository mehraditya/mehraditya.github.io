import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Frontmatter = {
  title?: string;
  authors?: string[];
  venue?: string;
  year?: number;
  paper?: string;
  date?: string;
  description?: string;
  tags?: string[];
  related?: string[];
};

export type Doc = {
  slug: string;
  meta: Frontmatter & { title: string };
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function readDocs(kind: "research-notes" | "writings"): Doc[] {
  const dir = path.join(CONTENT_DIR, kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      const meta = data as Frontmatter;
      return {
        slug,
        meta: { ...meta, title: meta.title ?? slug },
        content,
      };
    })
    .sort((a, b) => {
      const da = a.meta.date ?? "";
      const db = b.meta.date ?? "";
      return db.localeCompare(da);
    });
}

export function getNotes(): Doc[] {
  return readDocs("research-notes");
}

export function getNote(slug: string): Doc | undefined {
  return getNotes().find((doc) => doc.slug === slug);
}

export function getWritings(): Doc[] {
  return readDocs("writings");
}

export function getWriting(slug: string): Doc | undefined {
  return getWritings().find((doc) => doc.slug === slug);
}

export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const year = match[1];
  const month = MONTHS[Number(match[2]) - 1] ?? match[2];
  const day = Number(match[3]);
  return `${day} ${month} ${year}`;
}

export function archiveMeta(doc: Doc): string | undefined {
  if (doc.meta.year) return String(doc.meta.year);
  if (doc.meta.date) return formatDate(doc.meta.date);
  return undefined;
}

export function resolveRelated(slugs: string[] = []): { title: string; href: string }[] {
  return slugs.flatMap((slug) => {
    const note = getNote(slug);
    if (note) return [{ title: note.meta.title, href: `/research-notes/${slug}` }];
    const writing = getWriting(slug);
    if (writing) return [{ title: writing.meta.title, href: `/writings/${slug}` }];
    return [];
  });
}
