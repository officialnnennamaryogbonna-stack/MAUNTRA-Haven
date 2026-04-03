import React from 'react';
import { Info, Shield, Heart, HelpCircle, ChevronRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">About Mauntra</h2>
        <p className="text-slate-500 text-sm">Your safe space for healing and empowerment.</p>
      </header>

      {/* About App */}
      <section className="space-y-4">
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <img src="/logo.png" alt="Mauntra Haven Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">What is Mauntra?</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Our Mission</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Mauntra is a comprehensive safety and support application designed for survivors of domestic violence. 
            We provide secure documentation tools, quick access to emergency services, and a supportive community 
            to help you on your journey to safety and recovery.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3 rounded-2xl text-center">
              <p className="text-xs font-bold text-slate-800">100% Private</p>
              <p className="text-[10px] text-slate-400">Local storage only</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center">
              <p className="text-xs font-bold text-slate-800">Quick Exit</p>
              <p className="text-[10px] text-slate-400">Instant safety trigger</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Domestic Violence */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" /> Understanding DV
        </h3>
        <div className="space-y-3">
          {[
            {
              title: "What is Domestic Violence?",
              desc: "Domestic violence is a pattern of behavior used by one person to gain power and control over another in an intimate relationship.",
              icon: <HelpCircle className="w-5 h-5 text-primary" />
            },
            {
              title: "Types of Abuse",
              desc: "It can be physical, emotional, sexual, financial, or digital. All forms are serious and harmful.",
              icon: <Shield className="w-5 h-5 text-rose-500" />
            },
            {
              title: "The Cycle of Violence",
              desc: "Abuse often follows a cycle: tension building, the incident, and the 'honeymoon' phase. It tends to escalate over time.",
              icon: <Heart className="w-5 h-5 text-tertiary" />
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pl-13">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* External Resources */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-primary" /> Learn More
        </h3>
        <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            For more information and professional resources, visit these trusted organizations:
          </p>
          <div className="space-y-2">
            <a 
              href="https://www.thehotline.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all"
            >
              <span className="text-sm font-bold">The National DV Hotline</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="https://www.womensaid.org.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all"
            >
              <span className="text-sm font-bold">Women's Aid (UK)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
