import Link from "next/link";

export type Chapter = {
  index: number;
  title: string;
  href: string;
  description?: string;
  meta?: string;
};

export default function ChapterList({ items }: { items: Chapter[] }) {
  return (
    <ol className="chapters">
      {items.map((item) => (
        <li key={item.href} className="chapter">
          <Link href={item.href} className="chapter-link">
            <span className="chapter-index">
              {String(item.index).padStart(2, "0")}
            </span>
            <span className="chapter-body">
              <span className="chapter-title">{item.title}</span>
              {item.description && (
                <span className="chapter-desc">{item.description}</span>
              )}
            </span>
            {item.meta && <span className="chapter-meta">{item.meta}</span>}
          </Link>
        </li>
      ))}
    </ol>
  );
}
