import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import SectionTitle from "@/components/editorial/SectionTitle";
import Entry from "@/components/editorial/Entry";
import { archiveMeta, getNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Notes from papers and technical research.",
};

export default function ResearchNotesPage() {
  const notes = getNotes();

  return (
    <Container className="page-top">
      <Crumb href="/" label="Home" />
      <SectionTitle
        title="Research Notes"
        lede="Notes from papers and technical research."
      />
      {notes.length === 0 ? (
        <p className="empty">No notes published yet.</p>
      ) : (
        <ol className="archive">
          {notes.map((note, i) => (
            <Entry
              key={note.slug}
              index={i + 1}
              href={`/research-notes/${note.slug}`}
              title={note.meta.title}
              description={note.meta.description}
              meta={archiveMeta(note)}
            />
          ))}
        </ol>
      )}
    </Container>
  );
}
