import React, { useState } from 'react';
import { Phone, Zap, Shield, MessageSquare, AlertTriangle, ArrowRight, ShieldAlert, Info, Heart, Plus, Trash2, Save } from 'lucide-react';
import { Contact, UserSettings, CustomEmergencyNumber } from '../types';
import { EMERGENCY_INFO } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

interface EmergencyProps {
  contacts: Contact[];
  settings: UserSettings;
}

export function Emergency({ contacts, settings }: EmergencyProps) {
  const currentEmergency = EMERGENCY_INFO[settings.country] || EMERGENCY_INFO['Global'];
  const [customNumbers, setCustomNumbers] = useLocalStorage<CustomEmergencyNumber[]>('mauntra_custom_emergency', []);
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState({ label: '', number: '' });

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNumber.label && newNumber.number) {
      const custom: CustomEmergencyNumber = {
        id: Date.now().toString(),
        label: newNumber.label,
        number: newNumber.number,
      };
      setCustomNumbers([...customNumbers, custom]);
      setNewNumber({ label: '', number: '' });
      setIsAdding(false);
    }
  };

  const removeCustom = (id: string) => {
    setCustomNumbers(customNumbers.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="space-y-2 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Emergency Help</h2>
        <p className="text-slate-500 text-sm">Quick access to life-saving support.</p>
      </header>

      {/* Primary Emergency Button */}
      <motion.a
        whileTap={{ scale: 0.95 }}
        href={`tel:${currentEmergency.hotline}`}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 rounded-3xl font-bold text-xl shadow-xl shadow-rose-200 flex flex-col items-center gap-2 transition-all active:scale-95"
      >
        <Phone className="w-8 h-8" />
        Call Emergency ({currentEmergency.hotline})
      </motion.a>

      {/* National Hotline */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-800">National DV Hotline</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Confidential support available 24/7 in more than 200 languages.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={`tel:${currentEmergency.nationalHotline}`}
            className="bg-indigo-600 text-white py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
          >
            Call Hotline
          </a>
          <a 
            href={`sms:${currentEmergency.textHotline.split(' ').pop()}?body=START`}
            className="bg-white text-indigo-600 border border-indigo-200 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors flex items-center justify-center"
          >
            Text START
          </a>
        </div>
      </div>

      {/* Custom Emergency Numbers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" /> Custom Numbers
          </h3>
          <button 
            onClick={() => setIsAdding(true)}
            className="text-indigo-600 text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddCustom}
              className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3 overflow-hidden"
            >
              <input
                placeholder="Label (e.g. Local Police)"
                required
                value={newNumber.label}
                onChange={e => setNewNumber({...newNumber, label: e.target.value})}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="Phone Number"
                required
                type="tel"
                value={newNumber.number}
                onChange={e => setNewNumber({...newNumber, number: e.target.value})}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Number
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-slate-500 text-sm font-bold"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {customNumbers.map(custom => (
            <motion.div
              key={custom.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-indigo-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{custom.label}</h4>
                  <p className="text-xs text-slate-500 font-medium">{custom.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={`tel:${custom.number}`}
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => removeCustom(custom.id)}
                  className="p-3 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trusted Contacts */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400" /> Trusted Contacts
        </h3>
        
        {contacts.length > 0 ? (
          <div className="space-y-3">
            {contacts.map(contact => (
              <motion.div
                key={contact.id}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-indigo-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center font-bold text-slate-400">
                    {contact.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{contact.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">{contact.relation}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${contact.phone}`}
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300 text-center space-y-2">
            <p className="text-sm text-slate-500">No trusted contacts added yet.</p>
            <Link to="/profile" className="text-indigo-600 text-sm font-bold flex items-center gap-1 mx-auto w-fit">
              Add Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Safety Instructions */}
      <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 space-y-3">
        <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
          <Zap className="w-4 h-4" /> Safety Instructions
        </h4>
        <ul className="text-xs text-amber-800/80 space-y-2 list-disc pl-4">
          <li>Find a safe, quiet place to make your call.</li>
          <li>If you can't talk, use the text hotline.</li>
          <li>Remember to clear your call history afterward.</li>
          <li>Use the Quick Exit button if you are interrupted.</li>
        </ul>
      </div>
    </div>
  );
}
