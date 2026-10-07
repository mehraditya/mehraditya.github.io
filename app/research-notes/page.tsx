import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Crumb from "@/components/editorial/Crumb";
import SectionTitle from "@/components/editorial/SectionTitle";
import ChapterList from "@/components/editorial/ChapterList";
import { archiveMeta, getNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Notes from papers and technical research.",
};

export default function ResearchNotesPage() {
  const notes = getNotes();

  return (
    <Container className="page-top section-notes">
      <Crumb href="/" label="Home" />
      <div className="research-index">
        <SectionTitle
          title="Research Notes"
          lede="Notes from papers and technical research."
        />
        {notes.length === 0 ? (
          <p className="empty">No notes published yet.</p>
        ) : (
          <ChapterList
            items={notes.map((note, i) => ({
              index: i + 1,
              href: `/research-notes/${note.slug}`,
              title: note.meta.title,
              description: note.meta.description,
              meta: archiveMeta(note),
            }))}
          />
        )}
      </div>
    </Container>
  );
}
