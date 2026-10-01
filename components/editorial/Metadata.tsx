export default function Metadata({
  items,
  paper,
}: {
  items: string[];
  paper?: string;
}) {
  const visible = items.filter(Boolean);
  if (visible.length === 0 && !paper) return null;

  return (
    <div className="article-meta">
      {visible.map((item) => (
        <span key={item}>{item}</span>
      ))}
      {paper && (
        <a
          className="meta-link"
          href={paper}
          target="_blank"
          rel="noopener noreferrer"
        >
          Paper ↗
        </a>
      )}
    </div>
  );
}
