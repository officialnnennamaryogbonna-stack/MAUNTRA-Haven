import React from 'react';
import { motion } from 'motion/react';
import { Phone, Shield, MessageSquare, Heart, ArrowRight, UserPlus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Contact, UserSettings } from '../types';
import { cn } from '../lib/utils';
import { EMERGENCY_INFO } from '../constants';

interface HomeProps {
  nickname: string;
  contacts: Contact[];
  settings: UserSettings;
}

export function Home({ nickname, contacts, settings }: HomeProps) {
  const currentEmergency = EMERGENCY_INFO[settings.country] || EMERGENCY_INFO['Global'];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Hello, <span className="text-indigo-600">{nickname || 'Friend'}</span>
        </h2>
        <p className="text-slate-500 leading-relaxed">
          You are safe here. How can we support you today?
        </p>
      </header>

      {/* Emergency Quick Action */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-rose-50 border border-rose-100 p-5 rounded-3xl space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-rose-900">Emergency Help</h3>
          </div>
          <Link to="/emergency" className="text-rose-600 text-sm font-semibold flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-rose-800/80 text-sm">
          One-tap access to emergency services and your trusted contacts.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a 
            href={`tel:${currentEmergency.hotline}`}
            className="bg-rose-600 text-white py-3 rounded-2xl font-bold text-sm shadow-md active:bg-rose-700 transition-colors flex items-center justify-center"
          >
            Call {currentEmergency.hotline}
          </a>
          <a 
            href={`sms:${currentEmergency.textHotline.split(' ').pop()}?body=START`}
            className="bg-white text-rose-600 border border-rose-200 py-3 rounded-2xl font-bold text-sm shadow-sm active:bg-rose-50 transition-colors flex items-center justify-center"
          >
            Text Hotline
          </a>
        </div>
      </motion.div>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ShortcutCard
          to="/assistant"
          icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
          label="MAUNTRA Assistant"
          description="AI Support"
          color="bg-indigo-50"
        />
        <ShortcutCard
          to="/support"
          icon={<Shield className="w-6 h-6 text-emerald-600" />}
          label="Support Services"
          description="Find Help"
          color="bg-emerald-50"
        />
      </div>

      {/* Trusted Contacts Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Trusted Contacts</h3>
          <Link to="/profile" className="text-indigo-600 text-sm font-semibold">Manage</Link>
        </div>
        
        {contacts.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {contacts.map(contact => (
              <motion.div
                key={contact.id}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 w-24 flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="text-xl font-bold text-slate-400">{contact.name[0]}</span>
                </div>
                <span className="text-xs font-medium text-slate-600 truncate w-full text-center">{contact.name}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <Link
            to="/profile"
            className="flex items-center gap-3 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Add your first trusted contact</span>
          </Link>
        )}
      </section>

      {/* Daily Affirmation */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-3">
        <Heart className="w-8 h-8 text-rose-400 mx-auto" />
        <p className="text-slate-600 italic leading-relaxed">
          "You are strong, you are brave, and you are not alone. Your safety and well-being matter most."
        </p>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Created by Team MAUNTRA</p>
      </div>
    </div>
  );
}

function ShortcutCard({ to, icon, label, description, color }: { to: string; icon: React.ReactNode; label: string; description: string; color: string }) {
  return (
    <Link to={to}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={cn("p-5 rounded-3xl space-y-3 shadow-sm border border-white/50 h-full", color)}
      >
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm leading-tight">{label}</h4>
          <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
