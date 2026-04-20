import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Play, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * TIKTOK-STYLE AFFIRMATION FEED
 * 
 * NOTE TO USER: To host these videos locally as requested:
 * 1. Download the MP4 files from the TikTok links.
 * 2. Place them in your project's `/public/assets/videos/` folder.
 * 3. Update the 'url' fields below to point to those paths (e.g., '/assets/videos/video1.mp4').
 */

interface Video {
  id: string;
  url: string;
  author: string;
  caption: string;
  music: string;
  likes: string;
  comments: string;
  thumbnail: string;
}

const AFFIRMATION_VIDEOS: { id: string; tiktokId: string }[] = [
  { id: '1', tiktokId: '7618479847895043350' },
  { id: '2', tiktokId: '7520176906478570774' },
  { id: '3', tiktokId: '7453292468520406277' },
  { id: '4', tiktokId: '7488863298629143816' },
  { id: '5', tiktokId: '7554318870673132811' },
  { id: '6', tiktokId: '7539443954492706055' },
  { id: '7', tiktokId: '7552536633489247518' },
  { id: '8', tiktokId: '7545266471602113810' },
  { id: '9', tiktokId: '7514741452727979294' },
  { id: '10', tiktokId: '7364872766148840746' },
  { id: '11', tiktokId: '7551850390761884942' },
  { id: '12', tiktokId: '7542956918936030471' },
  { id: '13', tiktokId: '7619537616039464206' },
  { id: '14', tiktokId: '7581482353617325334' }
];

export function AffirmationFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(AFFIRMATION_VIDEOS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute('data-id') || '');
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = containerRef.current?.querySelectorAll('.video-container');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    const currentIndex = AFFIRMATION_VIDEOS.findIndex(v => v.id === activeId);
    if (currentIndex < AFFIRMATION_VIDEOS.length - 1 && containerRef.current) {
      const nextElement = containerRef.current.children[currentIndex + 1] as HTMLElement;
      nextElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    const currentIndex = AFFIRMATION_VIDEOS.findIndex(v => v.id === activeId);
    if (currentIndex > 0 && containerRef.current) {
      const prevElement = containerRef.current.children[currentIndex - 1] as HTMLElement;
      prevElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-0 flex flex-col items-center overflow-hidden">
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide flex flex-col items-center"
      >
        {AFFIRMATION_VIDEOS.map((video, index) => (
          <div 
            key={video.id} 
            data-id={video.id} 
            className="video-container h-screen w-full flex-shrink-0 snap-start relative"
          >
            <VideoItem 
              tiktokId={video.tiktokId} 
              isActive={video.id === activeId}
              isFirst={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Indicators (Dots) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {AFFIRMATION_VIDEOS.map((video) => (
          <div 
            key={`dot-${video.id}`}
            className={cn(
              "w-1 h-1 rounded-full transition-all duration-300",
              activeId === video.id ? "bg-white h-4" : "bg-white/20"
            )}
          />
        ))}
      </div>

      {/* Manual Navigation Buttons */}
      <button 
        onClick={handlePrev}
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all active:scale-95",
          activeId === AFFIRMATION_VIDEOS[0].id ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-label="Previous Video"
      >
        <ChevronLeft className="w-6 h-6 text-white/50" />
      </button>

      <button 
        onClick={handleNext}
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all active:scale-95",
          activeId === AFFIRMATION_VIDEOS[AFFIRMATION_VIDEOS.length - 1].id ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-label="Next Video"
      >
        <ChevronRight className="w-6 h-6 text-white/50" />
      </button>
    </div>
  );
}

function VideoItem({ tiktokId, isActive, isFirst }: { tiktokId: string; isActive: boolean; isFirst: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  // Reset started state when the video is no longer active
  useEffect(() => {
    if (!isActive) {
      setIsStarted(false);
    }
  }, [isActive]);

  return (
    <div className="h-full w-full relative flex items-center justify-center bg-black overflow-hidden group">
      {/* TikTok Player Iframe */}
      <iframe
        src={`https://www.tiktok.com/embed/v2/${tiktokId}?autoplay=${isStarted ? 1 : 0}&muted=0`}
        className={cn(
          "w-full h-full border-none transition-opacity duration-700",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        title={`TikTok Video ${tiktokId}`}
      />

      {/* Scroll Protect Overlay (Always Present to capture swipes) */}
      {!isStarted && (
        <div 
          onClick={() => setIsStarted(true)}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
        >
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl"
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>
          <p className="mt-4 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] px-10 text-center drop-shadow-md">
            Tap to Play Affirmation
          </p>

          {isFirst && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              className="absolute bottom-24 flex flex-col items-center text-white/30"
            >
              <span className="text-[8px] font-bold uppercase tracking-widest mb-3">Swipe Up</span>
              <div className="w-px h-10 bg-gradient-to-t from-white/30 to-transparent" />
            </motion.div>
          )}
        </div>
      )}

      {/* Interaction Barrier (To allow scrolling even if user taps and drags over the iframe area) */}
      {isStarted && (
        <>
          <div className="absolute inset-y-0 left-0 w-16 z-10" />
          <div className="absolute inset-y-0 right-0 w-16 z-10" />
        </>
      )}
      
      {/* Loading State Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 gap-4 z-30"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white/5 border-t-white/40 animate-spin" />
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Preparing Affirmation</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
