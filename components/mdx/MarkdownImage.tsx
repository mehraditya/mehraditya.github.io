import { readImageSize } from "@/lib/imageSize";

type MarkdownImageProps = {
  src?: string;
  alt?: string;
};

export default function MarkdownImage({
  src = "",
  alt = "",
}: MarkdownImageProps) {
  const size = readImageSize(src);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...(size ? { width: size.width, height: size.height } : {})}
    />
  );
}
