import Link from "next/link";
import Metadata from "./Metadata";

export type RelatedLink = { title: string; href: string };

export type ArticleVariant = "writing" | "note";

export default function Article({
  variant = "writing",
  eyebrow,
  title,
  lede,
  meta,
  related,
  tags,
  children,
}: {
  variant?: ArticleVariant;
  eyebrow?: string;
  title: string;
  lede?: string;
  meta?: { items: string[]; paper?: string };
  related?: RelatedLink[];
  tags?: string[];
  children: React.ReactNode;
}) {
  return (
    <article className="article" data-variant={variant}>
      <header className="article-head">
        {eyebrow && <p className="article-eyebrow">{eyebrow}</p>}
        <h1 className="article-title">{title}</h1>
        {meta && <Metadata items={meta.items} paper={meta.paper} />}
        {lede && <p className="article-lede">{lede}</p>}
      </header>
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
