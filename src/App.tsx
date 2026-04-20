import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from './Layout';
import { Onboarding } from './components/Onboarding';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import { AffirmationFeed } from './components/AffirmationFeed';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { UserSettings, Contact, Note } from './types';
import { cn } from './lib/utils';

// Screens
import { Home } from './screens/Home';
import { Support } from './screens/Support';
import { Emergency } from './screens/Emergency';
import { Resources } from './screens/Resources';
import { Assistant } from './screens/Assistant';
import { Profile } from './screens/Profile';
import { ReportIncident } from './screens/ReportIncident';
import { SavedIncidents } from './screens/SavedIncidents';
import { Community } from './screens/Community';
import { About } from './screens/About';

const DEFAULT_SETTINGS: UserSettings = {
  nickname: '',
  language: 'English',
  country: 'Nigeria',
  onboarded: false,
  highContrast: false,
  largeText: false,
  notificationsEnabled: true,
  quickExitRedirect: 'https://www.google.com',
  theme: 'default',
};

export default function App() {
  const [settings, setSettings] = useLocalStorage<UserSettings>('mauntra_settings', DEFAULT_SETTINGS);
  const [contacts, setContacts] = useLocalStorage<Contact[]>('mauntra_contacts', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('mauntra_notes', []);
  const [isExiting, setIsExiting] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('mauntra_is_authenticated', false);
  const [isSafeMode, setIsSafeMode] = useLocalStorage<boolean>('mauntra_is_safe_mode', true);
  const [hasSeenHint, setHasSeenHint] = useLocalStorage<boolean>('mauntra_seen_hint', false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && !hasSeenHint) {
      setShowHint(true);
      const timer = setTimeout(() => {
        setShowHint(false);
        setHasSeenHint(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, hasSeenHint, setHasSeenHint]);

  useEffect(() => {
    if (showHint) {
      const handleTap = () => {
        setShowHint(false);
        setHasSeenHint(true);
      };
      window.addEventListener('click', handleTap);
      window.addEventListener('touchstart', handleTap);
      return () => {
        window.removeEventListener('click', handleTap);
        window.removeEventListener('touchstart', handleTap);
      };
    }
  }, [showHint, setHasSeenHint]);

  const handleQuickExit = () => {
    setIsExiting(true);
    // Use replace to prevent back-button trace and ensure immediate navigation
    window.location.replace(settings.quickExitRedirect || 'https://www.google.com');
  };

  if (isExiting) {
    // Show an empty white screen immediately to "hide" the app content
    return <div className="fixed inset-0 bg-white z-[9999]" />;
  }

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setIsSafeMode(true); // Always start in safe mode after login
    if (!settings.nickname) {
      // Use the part before @ as a temporary nickname
      const defaultNickname = email.split('@')[0];
      setSettings(prev => ({ ...prev, nickname: defaultNickname }));
    }
  };

  const toggleSafeMode = () => {
    setIsSafeMode(!isSafeMode);
    if (showHint) {
      setShowHint(false);
      setHasSeenHint(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!isAuthenticated ? (
        <Login 
          onLogin={handleLogin} 
          isFirstTime={!settings.onboarded} 
        />
      ) : !settings.onboarded ? (
        <Onboarding onComplete={(newSettings) => setSettings(newSettings)} />
      ) : (
        <Router>
          <div className={cn(
            "min-h-screen transition-all duration-300 bg-white relative overflow-hidden",
            settings.largeText && "large-text",
            settings.highContrast && "high-contrast"
          )}>
            <div className="relative h-full w-full">
              {/* Affirmation Feed (Safe Mode) */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isSafeMode ? 1 : 0,
                  pointerEvents: isSafeMode ? 'auto' : 'none'
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-10"
              >
                <AffirmationFeed />
              </motion.div>

              {/* Real MAUNTRA Haven Content */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isSafeMode ? 0 : 1,
                  pointerEvents: isSafeMode ? 'none' : 'auto',
                  scale: isSafeMode ? 0.98 : 1
                }}
                transition={{ duration: 0.2 }}
                className="h-full relative z-0"
              >
                <Layout onQuickExit={handleQuickExit}>
                  <Routes>
                    <Route path="/" element={<Home nickname={settings.nickname} contacts={contacts} settings={settings} />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/emergency" element={<Emergency contacts={contacts} settings={settings} />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/assistant" element={<Assistant />} />
                    <Route path="/report-incident" element={<ReportIncident />} />
                    <Route path="/saved-incidents" element={<SavedIncidents />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile settings={settings} setSettings={setSettings} contacts={contacts} setContacts={setContacts} onLogout={handleLogout} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </motion.div>
            </div>

            {/* Discreet MH Toggle Button - Vertically Centered Left (Shifted slightly down to avoid nav buttons) */}
            <div className="fixed left-3 top-[60%] -translate-y-1/2 z-[100] flex items-center">
              <button
                onClick={toggleSafeMode}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-[8px] font-black tracking-tighter transition-all active:scale-90",
                  isSafeMode 
                    ? "bg-white/5 text-white/70 hover:bg-white/10 opacity-70" 
                    : "bg-primary/20 text-primary border border-primary/30 shadow-md"
                )}
                aria-label="Toggle Mode"
              >
                MH
              </button>
              <AnimatePresence>
                {showHint && isSafeMode && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="ml-3 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-bold text-white/90 pointer-events-none whitespace-nowrap border border-white/5 shadow-2xl"
                  >
                    Tap MH
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Router>
      )}
    </>
  );
}
