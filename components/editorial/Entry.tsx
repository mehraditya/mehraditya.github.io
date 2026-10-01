import Link from "next/link";

type EntryProps = {
  index: number;
  title: string;
  href: string;
  meta?: string;
  description?: string;
};

export default function Entry({ index, title, href, meta, description }: EntryProps) {
  return (
    <li className="entry">
      <Link href={href} className="entry-link">
        <span className="entry-index">{String(index).padStart(2, "0")}</span>
        <span className="entry-body">
          <span className="entry-title">{title}</span>
          {description && <span className="entry-desc">{description}</span>}
        </span>
        {meta && <span className="entry-meta">{meta}</span>}
      </Link>
    </li>
  );
}
