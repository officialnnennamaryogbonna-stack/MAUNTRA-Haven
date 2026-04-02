import React, { useState } from 'react';
import { BookOpen, Shield, Scale, Heart, Info, ChevronRight, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Resources() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const resourceCategories = [
    {
      title: "Your Legal Rights",
      icon: <Scale className="w-6 h-6 text-indigo-600" />,
      items: [
        "Understanding Protection Orders",
        "Custody and Visitation Rights",
        "Housing Rights for Survivors",
        "Employment Protections"
      ]
    },
    {
      title: "Safety Planning",
      icon: <Shield className="w-6 h-6 text-rose-600" />,
      items: [
        "Creating a Safety Plan",
        "Digital Safety & Privacy",
        "Safety at Work or School",
        "Packing an Emergency Bag"
      ]
    },
    {
      title: "Emotional Support",
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      items: [
        "Grounding Techniques",
        "Managing Trauma Triggers",
        "Self-Care for Survivors",
        "Supporting Children"
      ]
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Resource Library</h2>
        <p className="text-slate-500 text-sm">Clear, simple information to help you navigate your journey.</p>
      </header>

      {/* Resource Categories */}
      <div className="space-y-6">
        {resourceCategories.map((category, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm">
                {category.icon}
              </div>
              <h3 className="font-bold text-slate-800">{category.title}</h3>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              {category.items.map((item, itemIdx) => (
                <motion.button
                  key={itemIdx}
                  whileTap={{ backgroundColor: '#f8fafc' }}
                  onClick={() => setSelectedItem(item)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left border-b border-slate-50 last:border-0 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </motion.button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Resource Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">{selectedItem}</h3>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  This resource provides detailed information about <strong>{selectedItem}</strong>. 
                  In a real application, this would contain specific legal advice, safety steps, or support techniques tailored to your situation.
                </p>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                  <p className="text-xs text-indigo-700 font-medium">
                    Always remember to browse in private mode and clear your history if you feel your device is being monitored.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Tips */}
      <div className="bg-indigo-600 p-6 rounded-3xl text-white space-y-4 shadow-lg shadow-indigo-100">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-200" />
          <h4 className="font-bold">Did you know?</h4>
        </div>
        <p className="text-sm text-indigo-100 leading-relaxed">
          You have the right to live free from violence. Many states have laws that protect your housing and employment if you are experiencing domestic abuse.
        </p>
        <a 
          href="https://www.thehotline.org/resources/legal-help-for-survivors/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
        >
          Learn More <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Footer Attribution */}
      <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold pb-4">
        Created by Team MAUNTRA
      </p>
    </div>
  );
}
