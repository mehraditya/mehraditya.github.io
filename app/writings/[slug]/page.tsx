import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import Article from "@/components/editorial/Article";
import { formatDate, getWritings, getWriting, resolveRelated } from "@/lib/content";

export const dynamicParams = false;

const EMPTY_SLUG = "__empty__";

export function generateStaticParams() {
  const writings = getWritings();
  if (writings.length > 0) return writings.map((writing) => ({ slug: writing.slug }));
  return [{ slug: EMPTY_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWriting(slug);
  if (!writing) return {};
  return {
    title: writing.meta.title,
    description: writing.meta.description,
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = getWriting(slug);

  if (!writing) {
    return (
      <Container className="page-top">
        <Crumb href="/writings" label="Writings" />
        <div className="article">
          <p className="empty">Nothing published here.</p>
        </div>
      </Container>
    );
  }

  const { content } = await compileMDX({ source: writing.content });

  const items = writing.meta.date ? [formatDate(writing.meta.date)] : [];

  return (
    <Container className="page-top">
      <Crumb href="/writings" label="Writings" />
      <Article
        title={writing.meta.title}
        meta={{ items }}
        related={resolveRelated(writing.meta.related)}
        tags={writing.meta.tags}
      >
        {content}
      </Article>
    </Container>
  );
}
