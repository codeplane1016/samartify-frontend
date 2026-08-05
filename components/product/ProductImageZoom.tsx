"use client";

import Image from "next/image";
import { Minus, Plus, X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductImageZoom({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setZoom(1);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl bg-white"
        aria-label={`Zoom ${alt}`}
      >
        <Image src={src} alt={alt} fill priority className="object-contain p-8 transition duration-300 group-hover:scale-[1.03]" />
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold shadow-sm">
          <ZoomIn className="h-4 w-4" /> Zoom image
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-foreground/90 p-4" role="dialog" aria-modal="true" aria-label={`${alt} zoomed preview`} onClick={close}>
          <div className="mb-4 flex items-center justify-between text-white" onClick={(event) => event.stopPropagation()}>
            <p className="truncate pr-4 font-semibold">{alt}</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.5))} disabled={zoom <= 1} className="rounded-full bg-white/15 p-2 hover:bg-white/25 disabled:opacity-40" aria-label="Zoom out"><Minus className="h-5 w-5" /></button>
              <span className="w-14 text-center text-sm">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.5))} disabled={zoom >= 3} className="rounded-full bg-white/15 p-2 hover:bg-white/25 disabled:opacity-40" aria-label="Zoom in"><Plus className="h-5 w-5" /></button>
              <button type="button" onClick={close} className="ml-2 rounded-full bg-white/15 p-2 hover:bg-white/25" aria-label="Close image preview"><X className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="relative min-h-0 flex-1 overflow-auto rounded-2xl bg-white" onClick={(event) => event.stopPropagation()}>
            <div className="relative mx-auto h-full min-h-[70vh] origin-center transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain p-8" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
