import Link from "next/link";
import Metadata from "./Metadata";

export type RelatedLink = { title: string; href: string };

export default function Article({
  title,
  meta,
  related,
  tags,
  children,
}: {
  title: string;
  meta?: { items: string[]; paper?: string };
  related?: RelatedLink[];
  tags?: string[];
  children: React.ReactNode;
}) {
  return (
    <article className="article">
      <h1 className="article-title">{title}</h1>
      {meta && <Metadata items={meta.items} paper={meta.paper} />}
      <hr className="article-rule" />
      <div className="prose">{children}</div>
      {related && related.length > 0 && (
        <section className="related" aria-label="Related">
          <h2 className="related-label">Related</h2>
          <ul>
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {tags && tags.length > 0 && (
        <ul className="tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
