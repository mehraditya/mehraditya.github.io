import Figure from "./Figure";
import MarkdownImage from "./MarkdownImage";
import Source from "./Source";
import { H1, H2, H3 } from "./Heading";

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  img: MarkdownImage,
  Figure,
  Source,
};

export { Figure, MarkdownImage, Source };
