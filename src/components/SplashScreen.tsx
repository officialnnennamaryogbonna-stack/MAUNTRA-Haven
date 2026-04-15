import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2
        }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
          />
          <div className="relative bg-white p-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <img 
              src="/logo.png" 
              alt="MAUNTRA Haven Logo" 
              className="w-24 h-24 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-slate-900"
          >
            MAUNTRA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm font-medium tracking-[0.2em] uppercase text-slate-500"
          >
            Haven
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-1/2 h-full bg-primary/40"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
          Secure & Private
        </span>
      </motion.div>
    </motion.div>
  );
};
