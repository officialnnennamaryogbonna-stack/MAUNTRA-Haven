import React from 'react';
import { Shield, Home, Phone, BookOpen, MessageSquare, User, XCircle, Users } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  onQuickExit: () => void;
}

export function Layout({ children, onQuickExit }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative shadow-xl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Mauntra Haven Logo" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <h1 className="font-semibold text-slate-800 tracking-tight">MAUNTRA Haven</h1>
        </div>
        <button
          onClick={onQuickExit}
          className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          aria-label="Quick Exit"
        >
          <XCircle className="w-4 h-4" />
          Quick Exit
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-1 py-3 flex justify-around items-center z-50">
        <NavButton to="/" icon={<Home className="w-5 h-5" />} label="Home" />
        <NavButton to="/emergency" icon={<Phone className="w-5 h-5" />} label="Emergency" />
        <NavButton to="/community" icon={<Users className="w-5 h-5" />} label="Community" />
        <NavButton to="/assistant" icon={<MessageSquare className="w-5 h-5" />} label="Assistant" />
        <NavButton to="/profile" icon={<User className="w-5 h-5" />} label="Profile" />
      </nav>
    </div>
  );
}

function NavButton({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 transition-colors px-3 py-1 rounded-xl",
          isActive ? "text-primary bg-primary/10" : "text-slate-400 hover:text-slate-600"
        )
      }
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </NavLink>
  );
}
