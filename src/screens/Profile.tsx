import React, { useState } from 'react';
import { User, Shield, Bell, Eye, Phone, Plus, Trash2, ChevronRight, Globe, Heart, Palette, Info, Gamepad2, Star, LogOut, AlertCircle } from 'lucide-react';
import { UserSettings, Contact } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface ProfileProps {
  settings: UserSettings;
  setSettings: (settings: UserSettings) => void;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  onLogout: () => void;
}

export function Profile({ settings, setSettings, contacts, setContacts, onLogout }: ProfileProps) {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

  const handleLogout = () => {
    // Call the logout handler from props to return to login screen without reload
    onLogout();
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString(), isFavorite: false }]);
      setNewContact({ name: '', phone: '', relation: '' });
      setIsAddingContact(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const toggleSetting = (key: keyof UserSettings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const setTheme = (theme: UserSettings['theme']) => {
    setSettings({ ...settings, theme });
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{settings.nickname}</h2>
          <p className="text-slate-500 text-sm">Your private profile</p>
        </div>
      </header>

      {/* App Info & Games */}
      <section className="grid grid-cols-2 gap-4">
        <Link 
          to="/about"
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-bold text-slate-800">About App</span>
        </Link>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 relative opacity-80">
          <div className="w-10 h-10 bg-secondary-light rounded-xl flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-sm font-bold text-slate-800">Games</span>
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-sm">SOON</span>
        </div>
      </section>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Privacy & Safety */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" /> Privacy & Safety
          </h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <SettingToggle 
              label="Notifications" 
              description="Receive safety check-ins"
              enabled={settings.notificationsEnabled}
              onToggle={() => toggleSetting('notificationsEnabled')}
            />
            <div className="px-5 py-4 flex items-center justify-between text-left border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-bold text-slate-700">Country</p>
                  <p className="text-xs text-slate-400">For emergency numbers</p>
                </div>
              </div>
              <select 
                value={settings.country}
                onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                className="text-sm font-bold text-primary bg-transparent outline-none"
              >
                <option>Nigeria</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Global</option>
              </select>
            </div>
          </div>
        </section>

        {/* Trusted Contacts */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" /> Trusted Contacts
            </h3>
            <button 
              onClick={() => setIsAddingContact(true)}
              className="text-primary text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          <AnimatePresence>
            {isAddingContact && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3 overflow-hidden"
              >
                <input
                  placeholder="Name"
                  value={newContact.name}
                  onChange={e => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={e => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  placeholder="Relation (e.g. Sister, Friend)"
                  value={newContact.relation}
                  onChange={e => setNewContact({...newContact, relation: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddContact}
                    className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-bold"
                  >
                    Save Contact
                  </button>
                  <button 
                    onClick={() => setIsAddingContact(false)}
                    className="px-4 py-2 text-slate-500 text-sm font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {contacts.map(contact => (
              <div key={contact.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {contact.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                      {contact.name}
                      {contact.isFavorite && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">{contact.relation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => toggleFavorite(contact.id)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      contact.isFavorite ? "text-amber-400 bg-amber-50" : "text-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <Star className={cn("w-4 h-4", contact.isFavorite && "fill-amber-400")} />
                  </button>
                  <button 
                    onClick={() => removeContact(contact.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Eye className="w-5 h-5 text-tertiary" /> Accessibility
          </h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <SettingToggle 
              label="Large Text Mode" 
              description="Increase font size"
              enabled={settings.largeText}
              onToggle={() => toggleSetting('largeText')}
            />
            <SettingToggle 
              label="High Contrast" 
              description="Better visibility"
              enabled={settings.highContrast}
              onToggle={() => toggleSetting('highContrast')}
            />
          </div>
        </section>
      </div>

      <div className="pt-4">
        <button 
          onClick={() => setConfirmLogout(true)}
          className="w-full bg-rose-50 p-5 rounded-3xl border border-rose-100 flex items-center justify-center gap-3 text-rose-600 font-bold hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold pb-4">
        Created by Team MAUNTRA
      </p>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {confirmLogout && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmLogout(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl space-y-6"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Log Out?</h3>
                  <p className="text-slate-500 text-sm">
                    Logging out will lock your vault. You will need your password to access your data again.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 active:scale-95 transition-transform"
                >
                  Yes, Log Me Out
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingToggle({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="px-5 py-4 flex items-center justify-between text-left border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm font-bold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full transition-all relative",
          enabled ? "bg-primary" : "bg-slate-200"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
          enabled ? "left-7" : "left-1"
        )} />
      </button>
    </div>
  );
}
