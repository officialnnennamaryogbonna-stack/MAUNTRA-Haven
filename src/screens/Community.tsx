import React, { useState } from 'react';
import { MessageSquare, Users, Play, Heart, Share2, Send, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SURVIVOR_STORIES, POSITIVE_VIDEOS } from '../constants';
import { cn } from '../lib/utils';

export function Community() {
  const [activeTab, setActiveTab] = useState<'stories' | 'chat' | 'inspiration'>('stories');
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="p-6 space-y-6 pb-24">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Community & Inspiration</h2>
        <p className="text-slate-500 text-sm">You are not alone. Connect and find strength.</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
        {(['stories', 'chat', 'inspiration'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all",
              activeTab === tab 
                ? "bg-indigo-600 text-white shadow-md" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            {tab === 'stories' ? 'Survivor Stories' : tab === 'chat' ? 'Chatspace' : 'Positive Vibes'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stories' && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {SURVIVOR_STORIES.map((story) => (
              <div key={story.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {story.author[0]}
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{story.author}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{story.timestamp}</span>
                </div>
                
                {story.type === 'written' ? (
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{story.content}"</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 leading-relaxed italic">"{story.content}"</p>
                    <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group">
                      <iframe 
                        src={story.videoUrl} 
                        className="w-full h-full" 
                        title="Survivor Story"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" /> Support
                  </button>
                  <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-500 transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-indigo-50 p-4 rounded-3xl border border-indigo-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-800 leading-relaxed">
                Welcome to Chatspace. This is a safe, moderated space for survivors to connect. 
                Please be respectful and avoid sharing personal contact details.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm h-[400px] flex flex-col">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-1 max-w-[80%]">
                  <span className="text-[10px] text-slate-400 ml-2">Moderator</span>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700">
                    Hello everyone! How is your day going? Remember, we are here for each other.
                  </div>
                </div>
                <div className="flex flex-col gap-1 max-w-[80%] self-end">
                  <span className="text-[10px] text-slate-400 mr-2 text-right">You</span>
                  <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-sm text-white">
                    Feeling a bit anxious today, but taking deep breaths.
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-50 flex gap-2">
                <input 
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="p-2 bg-indigo-600 text-white rounded-xl shadow-md active:scale-95 transition-all">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'inspiration' && (
          <motion.div
            key="inspiration"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 gap-4"
          >
            {POSITIVE_VIDEOS.map((video) => (
              <div key={video.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
                <div className="aspect-video relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-indigo-600 fill-indigo-600" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 text-sm">{video.title}</h4>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
