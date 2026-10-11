import { useState } from "react";
import { Expand } from "lucide-react";
import ImageModal from "./ImageModal";
import { assetUrl, type ProjectImage } from "../../data/projectMedia";

type Props = {
  images: ProjectImage[];
  title: string;
  className?: string;
  featuredIndex?: number;
  priority?: boolean;
};
export default function ProjectGallery({
  images,
  title,
  className = "",
  featuredIndex = 0,
  priority = false,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const first = images[featuredIndex];
  if (!first) return null;
  return (
    <div
      className={`project-gallery ${first.height > first.width * 1.3 ? "gallery-portrait" : "gallery-landscape"} ${className}`}
    >
      <button
        type="button"
        className="gallery-cover"
        onClick={() => setOpenIndex(featuredIndex)}
        aria-label={`Inspect image: ${first.caption}`}
        aria-haspopup="dialog"
      >
        <span className="gallery-matte js-depth-layer">
          <img
            src={assetUrl(first.src)}
            alt={first.alt}
            width={first.width}
            height={first.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="gallery-image"
          />
        </span>
        <span className="gallery-open">
          <Expand size={15} />
          <span>Inspect image</span>
        </span>
      </button>
      {images.length > 1 && (
        <div
          className="gallery-thumbnails"
          aria-label={`${title} additional images`}
        >
          {images.map((image, i) =>
            i === featuredIndex ? null : (
              <button
                key={image.src}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Enlarge ${image.caption}`}
                aria-haspopup="dialog"
              >
                <img
                  src={assetUrl(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                />
                <span>{image.caption}</span>
                <Expand size={12} />
              </button>
            ),
          )}
        </div>
      )}
      {openIndex !== null && (
        <ImageModal
          images={images}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
