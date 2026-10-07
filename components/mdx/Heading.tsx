import { isValidElement } from "react";

type HeadingProps = {
  children?: React.ReactNode;
  id?: string;
};

function text(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (isValidElement(node)) {
    return text((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingId(children: React.ReactNode, id?: string): string {
  return id || slug(text(children)) || "section";
}

export function H1({ children, id }: HeadingProps) {
  return <h1 id={headingId(children, id)}>{children}</h1>;
}

export function H2({ children, id }: HeadingProps) {
  return <h2 id={headingId(children, id)}>{children}</h2>;
}

export function H3({ children, id }: HeadingProps) {
  return <h3 id={headingId(children, id)}>{children}</h3>;
}
