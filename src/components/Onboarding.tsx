import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Heart, Lock, Bell, ChevronLeft } from 'lucide-react';
import { UserSettings } from '../types';

interface OnboardingProps {
  onComplete: (settings: UserSettings) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [language, setLanguage] = useState('English');
  const [country, setCountry] = useState('Nigeria');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onComplete({
        nickname,
        language,
        country,
        onboarded: true,
        highContrast: false,
        largeText: false,
        notificationsEnabled: true,
        quickExitRedirect: 'https://www.google.com',
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col p-6 overflow-y-auto">
      {step > 1 && (
        <button 
          onClick={handleBack}
          className="absolute top-6 left-6 p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all active:scale-90"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center text-center space-y-6"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <img src="/logo.png" alt="Mauntra Haven Logo" className="w-20 h-20 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome to MAUNTRA Haven</h1>
            <p className="text-slate-600 leading-relaxed">
              A safe, private space designed for your protection and support.
            </p>
            <div className="bg-indigo-50 p-4 rounded-xl text-sm text-indigo-800 flex items-start gap-3 text-left">
              <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Your privacy is our priority. No data is shared without your explicit consent.</p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <h2 className="text-2xl font-bold text-slate-900">Let's set up your safe space</h2>
            
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Choose a nickname (for your safety)</span>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Hope, Friend"
                  className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Preferred Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Your Country (for emergency numbers)</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                >
                  <option>Nigeria</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Global</option>
                </select>
              </label>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
                <Bell className="w-8 h-8 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Safety First</h2>
              <p className="text-slate-600">
                Remember the <strong>Quick Exit</strong> button at the top. It instantly hides the app if you feel unsafe.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-amber-800 space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" /> Disclaimer
              </p>
              <p>
                This app supports you but does not replace emergency services or professional care. In immediate danger, please call emergency services.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleNext}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-8"
      >
        {step === 3 ? "Start My Journey" : "Continue"}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
