import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  ShieldAlert, 
  Upload, 
  Save, 
  Send, 
  X,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Incident } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';

export function ReportIncident() {
  const navigate = useNavigate();
  const location = useLocation();
  const [incidents, setIncidents] = useLocalStorage<Incident[]>('mauntra_incidents', []);
  const [draft, setDraft] = useLocalStorage<Partial<Incident> | null>('mauntra_incident_draft', null);
  
  const [formData, setFormData] = useState<Partial<Incident>>({
    type: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    location: '',
    description: '',
    urgency: 'Medium',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  useEffect(() => {
    if (draft && location.state?.resume) {
      setFormData(prev => ({ ...prev, ...draft }));
    } else if (draft && (draft.type || draft.description || draft.location)) {
      setShowResumePrompt(true);
    }
  }, []);

  const handleResume = () => {
    if (draft) {
      setFormData(prev => ({ ...prev, ...draft }));
    }
    setShowResumePrompt(false);
  };

  const handleStartNew = () => {
    setDraft(null);
    setShowResumePrompt(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setDraft(formData);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncident: Incident = {
      ...formData as Incident,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setIncidents([...incidents, newIncident]);
    setDraft(null);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Report Submitted</h2>
          <p className="text-slate-500">Your incident has been securely documented in your private log.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full max-w-xs bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-slate-600 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Report Incident</h2>
          <p className="text-slate-500 text-sm">Document details securely for your records.</p>
        </div>
      </header>

      <AnimatePresence>
        {showResumePrompt && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-secondary-light border border-secondary/10 p-5 rounded-3xl space-y-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary-light rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-secondary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-secondary text-sm">Unfinished Draft Found</h4>
                <p className="text-xs text-secondary/80 leading-relaxed">
                  We found an unfinished report from your last visit. Would you like to resume it or start a new one?
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleResume}
                className="flex-1 bg-secondary text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-secondary/20 active:scale-95 transition-all"
              >
                Resume Draft
              </button>
              <button
                onClick={handleStartNew}
                className="flex-1 bg-white text-secondary border border-secondary/20 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
              >
                Start New
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6 pb-12">
        {/* Incident Type */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" /> Type of Incident
          </label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          >
            <option value="">Select type...</option>
            <option value="Physical">Physical</option>
            <option value="Emotional/Verbal">Emotional/Verbal</option>
            <option value="Digital/Cyber">Digital/Cyber</option>
            <option value="Financial">Financial</option>
            <option value="Stalking">Stalking</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Time
            </label>
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Where did it happen?"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe what happened..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm resize-none"
          />
        </div>

        {/* Urgency */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Urgency Level</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Low', 'Medium', 'High'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                className={cn(
                  "py-3 rounded-xl text-xs font-bold border transition-all",
                  formData.urgency === level 
                    ? level === 'High' ? "bg-rose-600 border-rose-600 text-white" :
                      level === 'Medium' ? "bg-secondary border-secondary text-white" :
                      "bg-tertiary border-tertiary text-white"
                    : "bg-white border-slate-200 text-slate-500"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Placeholder */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" /> Evidence (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2 bg-slate-50/50">
            <Upload className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-400">Upload photos, screenshots, or documents</p>
            <p className="text-[10px] text-slate-400 italic">(Placeholder for future integration)</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save Draft</>}
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
        
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full py-2 text-slate-400 text-sm font-medium hover:text-slate-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
