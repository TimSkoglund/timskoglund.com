import { useEffect, useRef } from 'react';
import type { WorkItem } from '@/content/site-content';

type WorkCardProps = {
  work: WorkItem;
  onOpen: () => void;
};

export function WorkCard({ work, onOpen }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const getThumbnailTime = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return 0.15;
      }

      return Math.max(video.duration - 3, 0);
    };

    const handleLoadedMetadata = () => {
      video.currentTime = getThumbnailTime();
    };

    const handleSeeked = () => {
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  const playPreview = async () => {
    try {
      await videoRef.current?.play();
    } catch {
      // Ignore autoplay restrictions in the preview cards.
    }
  };

  const stopPreview = () => {
    const video = videoRef.current;
    if (!video) return;

    const thumbnailTime =
      Number.isFinite(video.duration) && video.duration > 0 ? Math.max(video.duration - 3, 0) : 0.15;

    video.pause();
    video.currentTime = thumbnailTime;
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={playPreview}
      onFocus={playPreview}
      onMouseLeave={stopPreview}
      onBlur={stopPreview}
      aria-label={`${work.title} - ${work.category}`}
      className="group relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.03] text-left shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1"
    >
      <video
        ref={videoRef}
        src={work.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-[26rem] w-full object-cover object-center saturate-[0.55] sepia-[0.36] contrast-[1.08] brightness-[0.88] transition duration-500 group-hover:saturate-[0.75] group-hover:sepia-[0.18]"
      />
    </button>
  );
}
