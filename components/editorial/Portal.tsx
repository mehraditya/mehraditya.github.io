import Link from "next/link";

export default function Portal({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <Link href={href} className="portal">
      <span className="portal-label">{label}</span>
      <span className="portal-desc">{description}</span>
    </Link>
  );
}
