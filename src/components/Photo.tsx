import { asset } from "../asset";

type PhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function Photo({ src, alt, width, height, className, priority = false }: PhotoProps) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
    />
  );
}
