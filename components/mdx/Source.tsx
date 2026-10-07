type SourceProps = {
  title: string;
  author?: string;
  href?: string;
  venue?: string;
  year?: string | number;
};

function joinMeta(parts: (string | number | undefined)[]): string | undefined {
  const visible = parts
    .map((part) => (part === undefined ? "" : String(part).trim()))
    .filter(Boolean);
  return visible.length > 0 ? visible.join(" · ") : undefined;
}

export default function Source({
  title,
  author,
  href,
  venue,
  year,
}: SourceProps) {
  const meta = joinMeta([author, joinMeta([venue, year])]);

  const body = (
    <span className="source-body">
      <span className="source-title">{title}</span>
      {meta && <span className="source-meta">{meta}</span>}
    </span>
  );

  if (!href) {
    return <div className="source">{body}</div>;
  }

  return (
    <a
      className="source"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {body}
      <span className="source-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
