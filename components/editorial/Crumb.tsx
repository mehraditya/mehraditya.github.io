import Link from "next/link";

export default function Crumb({ href, label }: { href: string; label: string }) {
  return (
    <p className="crumb">
      <Link href={href}>← {label}</Link>
    </p>
  );
}
