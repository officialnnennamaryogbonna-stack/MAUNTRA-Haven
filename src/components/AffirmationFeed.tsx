import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Play, Loader2, Volume2, RotateCcw } from 'lucide-react';
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
  { id: '14', tiktokId: '7581482353617325334' },
  { id: '15', tiktokId: '7375586328135634181' },
  { id: '16', tiktokId: '7478389608812662058' }
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
    </div>
  );
}

function VideoItem({ tiktokId, isActive, isFirst }: { tiktokId: string; isActive: boolean; isFirst: boolean }) {
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  const [showMuteHint, setShowMuteHint] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (isActive && hasInitialLoaded) {
      // Show hint briefly when video starts/becomes active
      setShowMuteHint(true);
      const timer = setTimeout(() => setShowMuteHint(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isActive, hasInitialLoaded]);

  // The URL includes muted=0 and autoplay=1 to ensure the video starts talking immediately.
  // We include replayKey in the URL to force a fresh embed reload on replay.
  const videoUrl = `https://www.tiktok.com/embed/v2/${tiktokId}?muted=0&autoplay=1&r=${replayKey}`;

  const handleReplay = () => {
    setHasInitialLoaded(false);
    setReplayKey(prev => prev + 1);
  };

  return (
    <div className="h-full w-full relative flex items-center justify-center bg-black overflow-hidden group">
      {/* TikTok Player Iframe */}
      <iframe
        src={isActive ? videoUrl : null}
        className={cn(
          "w-full h-full border-none transition-opacity duration-700",
          !hasInitialLoaded ? "opacity-0" : "opacity-100"
        )}
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => setHasInitialLoaded(true)}
        loading="eager"
        title={`TikTok Video ${tiktokId}`}
      />

      {/* Swipe Protection Gutters (Invisible) */}
      {/* These handle vertical swipes even if the iframe is unresponsive to gestures */}
      <div className="absolute inset-y-0 left-0 w-16 z-20" />
      <div className="absolute inset-y-0 right-0 w-20 z-20" />

      {/* Sidebar Actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-6 z-40">
        <button 
          onClick={handleReplay}
          className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
        >
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-lg group-hover:bg-white/20 transition-colors">
            <RotateCcw className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-white font-bold uppercase tracking-wider shadow-sm">Replay</span>
        </button>
      </div>
      
      {/* Unmute Hint "Pop" */}
      <AnimatePresence>
        {showMuteHint && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-40 pointer-events-none"
          >
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-[2rem] border border-white/20 shadow-2xl flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white text-xs font-bold tracking-tight">Unmute for sound</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Hint for first video */}
      {isFirst && !isActive && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 pointer-events-none z-10"
        >
          <span className="text-[8px] font-bold uppercase tracking-widest mb-3">Swipe Up</span>
          <div className="w-px h-10 bg-gradient-to-t from-white/30 to-transparent" />
        </motion.div>
      )}
      
      {/* Loading State Overlay - Only shows once per video lifecycle */}
      <AnimatePresence>
        {!hasInitialLoaded && isActive && (
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
