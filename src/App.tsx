import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layout } from './Layout';
import { Onboarding } from './components/Onboarding';
import { SplashScreen } from './components/SplashScreen';
import { useLocalStorage } from './hooks/useLocalStorage';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickExit = () => {
    setIsExiting(true);
    // Redirect to a neutral page
    window.location.href = settings.quickExitRedirect;
  };

  if (isExiting) {
    return <div className="fixed inset-0 bg-white z-[1000] flex items-center justify-center text-slate-400">Redirecting...</div>;
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!settings.onboarded ? (
        <Onboarding onComplete={(newSettings) => setSettings(newSettings)} />
      ) : (
        <Router>
          <div className={cn(
            "min-h-screen transition-all duration-300 bg-white",
            settings.largeText && "large-text",
            settings.highContrast && "high-contrast"
          )}>
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
                <Route path="/profile" element={<Profile settings={settings} setSettings={setSettings} contacts={contacts} setContacts={setContacts} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      )}
    </>
  );
}
