import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { WorkItem } from '@/content/site-content';

type WorksLightboxProps = {
  works: readonly WorkItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function WorksLightbox({ works, activeIndex, onClose, onNavigate }: WorksLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % works.length);
      if (event.key === 'ArrowLeft') onNavigate((activeIndex - 1 + works.length) % works.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, onClose, onNavigate, works.length]);

  if (activeIndex === null) {
    return null;
  }

  const activeWork = works[activeIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/84 px-4 py-8 backdrop-blur-md">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Stäng lightbox" />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <button
          type="button"
          onClick={() => onNavigate((activeIndex - 1 + works.length) % works.length)}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <ChevronLeft />
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f10] shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[var(--color-accent)]">Tim Skoglund</p>
              <h3 className="mt-2 font-display text-4xl leading-none text-[var(--color-heading)]">{activeWork.title}</h3>
              <p className="mt-2 text-sm tracking-[0.18em] uppercase text-[var(--color-muted)]">{activeWork.category}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <X />
            </button>
          </div>
          <video
            key={activeWork.id}
            src={activeWork.videoSrc}
            controls
            autoPlay
            playsInline
            className="max-h-[75vh] w-full bg-black object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => onNavigate((activeIndex + 1) % works.length)}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
