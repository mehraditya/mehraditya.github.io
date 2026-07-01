import SectionTitle from "@/components/ui/SectionTitle";

const notes = [
  "Where Does Memory Live?",
  "Sparse Autoencoders",
  "Diffusion Models",
];

export default function RecentNotes() {
  return (
    <section className="section">
      <SectionTitle>Recent Notes</SectionTitle>

      {notes.map((note, index) => (
        <div
          key={note}
          className="note"
        >
          <span>{String(index + 1).padStart(2, "0")}</span>

          <h3>{note}</h3>
        </div>
      ))}
    </section>
  );
}