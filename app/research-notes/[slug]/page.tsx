import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import Article from "@/components/editorial/Article";
import { getNote, getNotes, resolveRelated } from "@/lib/content";

export const dynamicParams = false;

const EMPTY_SLUG = "__empty__";

export function generateStaticParams() {
  const notes = getNotes();
  if (notes.length > 0) return notes.map((note) => ({ slug: note.slug }));
  return [{ slug: EMPTY_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.meta.title,
    description: note.meta.description,
  };
}

export default async function ResearchNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return (
      <Container className="page-top">
        <Crumb href="/research-notes" label="Research Notes" />
        <div className="article">
          <p className="empty">Nothing published here.</p>
        </div>
      </Container>
    );
  }

  const { content } = await compileMDX({ source: note.content });

  const items = [
    note.meta.authors?.join(", "),
    [note.meta.venue, note.meta.year].filter(Boolean).join(" · "),
  ].filter(Boolean) as string[];

  return (
    <Container className="page-top">
      <Crumb href="/research-notes" label="Research Notes" />
      <Article
        title={note.meta.title}
        meta={{ items, paper: note.meta.paper }}
        related={resolveRelated(note.meta.related)}
        tags={note.meta.tags}
      >
        {content}
      </Article>
    </Container>
  );
}
