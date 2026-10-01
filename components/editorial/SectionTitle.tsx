export default function SectionTitle({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) {
  return (
    <header className="section-head">
      <h1>{title}</h1>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}
