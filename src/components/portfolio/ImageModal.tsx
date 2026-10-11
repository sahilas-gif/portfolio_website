import { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { assetUrl, type ProjectImage } from "../../data/projectMedia";

type Props = {
  images: ProjectImage[];
  initialIndex?: number;
  onClose: () => void;
};
type View = { x: number; y: number; scale: number };
const initialView: View = { x: 0, y: 0, scale: 1 };

/** Native dialog provides modal focus containment and makes the page beneath inert. */
export default function ImageModal({
  images,
  initialIndex = 0,
  onClose,
}: Props) {
  const [index, setIndex] = useState(
    Math.min(Math.max(initialIndex, 0), images.length - 1),
  );
  const [zoom, setZoom] = useState(1);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLImageElement>(null);
  const view = useRef<View>({ ...initialView });
  const frame = useRef(0);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    distance: 0,
    scale: 1,
    multi: false,
  });
  const titleId = useId();
  const helpId = useId();
  const image = images[index];

  const apply = useCallback((next: View) => {
    const surface = stage.current,
      img = picture.current;
    const scale = Math.max(1, Math.min(4, next.scale));
    const maxX =
      surface && img
        ? Math.max(0, (img.clientWidth * scale - surface.clientWidth + 32) / 2)
        : 0;
    const maxY =
      surface && img
        ? Math.max(
            0,
            (img.clientHeight * scale - surface.clientHeight + 32) / 2,
          )
        : 0;
    view.current = {
      scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
    setZoom(scale);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (picture.current) {
        const { x, y, scale: s } = view.current;
        picture.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
      }
    });
  }, []);
  const reset = useCallback(() => apply({ ...initialView }), [apply]);
  const changeZoom = (amount: number) =>
    apply({ ...view.current, scale: view.current.scale + amount });
  const navigate = (direction: number) => {
    reset();
    setFailed(false);
    pointers.current.clear();
    setIndex((value) => (value + direction + images.length) % images.length);
  };

  useEffect(() => {
    const node = dialog.current;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node?.showModal();
    return () => {
      cancelAnimationFrame(frame.current);
      node?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    const surface = stage.current;
    if (!surface) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      apply({
        ...view.current,
        scale: view.current.scale * Math.exp(-event.deltaY * 0.0015),
      });
    };
    surface.addEventListener("wheel", wheel, { passive: false });
    const resize = new ResizeObserver(() => apply(view.current));
    resize.observe(surface);
    return () => {
      surface.removeEventListener("wheel", wheel);
      resize.disconnect();
    };
  }, [apply]);

  const down = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (pointers.current.size === 1) {
      gesture.current = {
        x: event.clientX,
        y: event.clientY,
        originX: view.current.x,
        originY: view.current.y,
        distance: 0,
        scale: view.current.scale,
        multi: false,
      };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current.distance = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.scale = view.current.scale;
      gesture.current.multi = true;
    }
    event.currentTarget.dataset.dragging = "true";
  };
  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const ratio =
        Math.hypot(a.x - b.x, a.y - b.y) /
        Math.max(1, gesture.current.distance);
      apply({ ...view.current, scale: gesture.current.scale * ratio });
    } else if (view.current.scale > 1 && !gesture.current.multi) {
      apply({
        ...view.current,
        x: gesture.current.originX + event.clientX - gesture.current.x,
        y: gesture.current.originY + event.clientY - gesture.current.y,
      });
    }
  };
  const up = (event: ReactPointerEvent<HTMLDivElement>) => {
    const recognized = pointers.current.delete(event.pointerId);
    if (!recognized) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (pointers.current.size === 0) {
      event.currentTarget.dataset.dragging = "false";
      const dx = event.clientX - gesture.current.x,
        dy = event.clientY - gesture.current.y;
      if (
        event.pointerType === "touch" &&
        !gesture.current.multi &&
        view.current.scale === 1
      ) {
        if (dy > 95 && Math.abs(dx) < 75) onClose();
        else if (Math.abs(dx) > 80 && Math.abs(dy) < 75 && images.length > 1)
          navigate(dx < 0 ? 1 : -1);
      }
    }
  };
  const key = (event: ReactKeyboardEvent<HTMLDialogElement>) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (
      [
        "+",
        "=",
        "-",
        "0",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(event.key)
    )
      event.preventDefault();
    if (event.key === "+" || event.key === "=") changeZoom(0.5);
    if (event.key === "-") changeZoom(-0.5);
    if (event.key === "0") reset();
    if (view.current.scale > 1 && event.key.startsWith("Arrow")) {
      const step = 60;
      apply({
        ...view.current,
        x:
          view.current.x +
          (event.key === "ArrowLeft"
            ? step
            : event.key === "ArrowRight"
              ? -step
              : 0),
        y:
          view.current.y +
          (event.key === "ArrowUp"
            ? step
            : event.key === "ArrowDown"
              ? -step
              : 0),
      });
    } else if (event.key === "ArrowRight") navigate(1);
    else if (event.key === "ArrowLeft") navigate(-1);
  };
  if (!image) return null;
  return createPortal(
    <dialog
      ref={dialog}
      className="image-modal"
      aria-labelledby={titleId}
      aria-describedby={helpId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={key}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-shell">
        <header className="lightbox-header">
          <div>
            <span className="micro-label">
              PROJECT GALLERY · {index + 1} / {images.length}
            </span>
            <h2 id={titleId}>{image.caption}</h2>
          </div>
          <button
            className="lightbox-icon"
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            autoFocus
          >
            <X size={23} />
          </button>
        </header>
        <div
          ref={stage}
          className="image-stage"
          data-zoomed={zoom > 1}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={() => {
            pointers.current.clear();
            if (stage.current) stage.current.dataset.dragging = "false";
          }}
          onDoubleClick={() =>
            apply({ ...initialView, scale: view.current.scale > 1 ? 1 : 2 })
          }
        >
          <img
            ref={picture}
            key={image.src}
            src={assetUrl(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            draggable={false}
            onLoad={reset}
            onError={() => setFailed(true)}
          />
          {failed && (
            <p className="image-load-error" role="alert">
              This image could not load.{" "}
              <a href={assetUrl(image.src)} target="_blank" rel="noreferrer">
                Open the original image
              </a>
              .
            </p>
          )}
        </div>
        <footer className="lightbox-footer">
          <div className="lightbox-controls">
            <button
              className="lightbox-icon"
              type="button"
              onClick={() => changeZoom(-0.5)}
              disabled={zoom <= 1}
              aria-label="Zoom out"
            >
              <ZoomOut size={19} />
            </button>
            <output aria-label="Image zoom">{Math.round(zoom * 100)}%</output>
            <button
              className="lightbox-icon"
              type="button"
              onClick={() => changeZoom(0.5)}
              disabled={zoom >= 4}
              aria-label="Zoom in"
            >
              <ZoomIn size={19} />
            </button>
            <button
              className="lightbox-icon"
              type="button"
              onClick={reset}
              aria-label="Reset image view"
            >
              <RotateCcw size={18} />
            </button>
            <a
              className="lightbox-icon"
              href={assetUrl(image.src)}
              download
              aria-label="Download original image"
            >
              <Download size={18} />
            </a>
          </div>
          <div className="lightbox-controls">
            <button
              className="lightbox-icon"
              type="button"
              onClick={() => navigate(-1)}
              disabled={images.length < 2}
              aria-label="Previous image"
            >
              <ArrowLeft size={20} />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              className="lightbox-icon"
              type="button"
              onClick={() => navigate(1)}
              disabled={images.length < 2}
              aria-label="Next image"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </footer>
        <p id={helpId} className="lightbox-help">
          Scroll or pinch to zoom · Drag to pan · + / − / 0 controls · Arrow
          keys browse or pan · Escape or swipe down at 100% to close
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
