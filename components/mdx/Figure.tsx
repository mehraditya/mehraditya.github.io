import { readImageSize } from "@/lib/imageSize";

export type FigureVariant = "default" | "small" | "wide" | "full";

type FigureProps = {
  src: string;
  alt?: string;
  caption?: React.ReactNode;
  label?: string;
  variant?: FigureVariant;
  width?: number;
  height?: number;
};

export default function Figure({
  src,
  alt = "",
  caption,
  label,
  variant = "default",
  width,
  height,
}: FigureProps) {
  const size =
    width && height ? { width, height } : readImageSize(src);

  const className =
    variant === "default" ? "figure" : `figure figure--${variant}`;

  return (
    <figure className={className}>
      <img
        className="figure-img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...(size ? { width: size.width, height: size.height } : {})}
      />
      {(caption || label) && (
        <figcaption className="figure-cap">
          {label && <span className="figure-cap-label">{label}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
