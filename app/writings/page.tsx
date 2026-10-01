import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import SectionTitle from "@/components/editorial/SectionTitle";
import Entry from "@/components/editorial/Entry";
import { formatDate, getWritings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writings",
  description: "Essays and observations.",
};

export default function WritingsPage() {
  const writings = getWritings();

  return (
    <Container className="page-top">
      <Crumb href="/" label="Home" />
      <SectionTitle title="Writings" lede="Essays and observations." />
      {writings.length === 0 ? (
        <p className="empty">No writings published yet.</p>
      ) : (
        <ol className="archive">
          {writings.map((writing, i) => (
            <Entry
              key={writing.slug}
              index={i + 1}
              href={`/writings/${writing.slug}`}
              title={writing.meta.title}
              description={writing.meta.description}
              meta={writing.meta.date ? formatDate(writing.meta.date) : undefined}
            />
          ))}
        </ol>
      )}
    </Container>
  );
}
