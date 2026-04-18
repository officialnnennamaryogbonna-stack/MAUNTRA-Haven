import React, { useState } from 'react';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (email: string) => void;
  isFirstTime?: boolean;
}

export function Login({ onLogin, isFirstTime = false }: LoginProps) {
  // Check if an account already exists in storage
  const hasAccount = !!localStorage.getItem('mauntra_auth_email');
  
  // Default to Login if an account exists, otherwise follow isFirstTime
  const [isLogin, setIsLogin] = useState(hasAccount ? true : !isFirstTime);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isLogin) {
      // Sign Up
      localStorage.setItem('mauntra_auth_email', email.trim().toLowerCase());
      localStorage.setItem('mauntra_auth_password', password);
      onLogin(email);
    } else {
      // Login
      const storedEmail = localStorage.getItem('mauntra_auth_email');
      const storedPass = localStorage.getItem('mauntra_auth_password');

      if (email.trim().toLowerCase() === storedEmail && password === storedPass) {
        onLogin(email);
      } else {
        setError('Incorrect email or password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 rotate-3">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">MAUNTRA</h1>
          <p className="text-slate-500 font-medium">Your supportive private space</p>
        </div>

        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={cn(
                "flex-1 py-5 text-sm font-bold transition-all",
                isLogin ? "text-primary border-b-2 border-primary bg-white" : "text-slate-400 bg-slate-50/50"
              )}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={cn(
                "flex-1 py-5 text-sm font-bold transition-all",
                !isLogin ? "text-primary border-b-2 border-primary bg-white" : "text-slate-400 bg-slate-50/50"
              )}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-xs font-bold text-center py-3 bg-rose-50 rounded-xl border border-rose-100"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 group mt-4"
              >
                <span>{isLogin ? 'Log In' : 'Create Account'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="flex flex-col items-center gap-4">
              {isLogin && (
                <button className="text-[11px] text-primary font-bold hover:underline underline-offset-4">
                  Forgot Password?
                </button>
              )}
              <div className="h-px w-8 bg-slate-100" />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center">
                Secure · Private · Local
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] opacity-60">
          MAUNTRA SAFE HAVEN PROTECTED
        </p>
      </motion.div>
    </div>
  );
}
