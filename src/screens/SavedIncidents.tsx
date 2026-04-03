import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Calendar, Clock, MapPin, ShieldAlert, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Incident } from '../types';
import { cn } from '../lib/utils';

export function SavedIncidents() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useLocalStorage<Incident[]>('mauntra_incidents', []);

  const deleteIncident = (id: string) => {
    setIncidents(incidents.filter(inc => inc.id !== id));
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-slate-600 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved Incidents</h2>
          <p className="text-slate-500 text-sm">Your securely documented records.</p>
        </div>
      </header>

      <div className="space-y-4">
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <div 
              key={incident.id}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    incident.urgency === 'High' ? "bg-rose-50 text-rose-600" :
                    incident.urgency === 'Medium' ? "bg-secondary-light text-secondary" :
                    "bg-tertiary-light text-tertiary"
                  )}>
                    {incident.urgency} Urgency
                  </span>
                  <h3 className="font-bold text-slate-900">{incident.type}</h3>
                </div>
                <button 
                  onClick={() => deleteIncident(incident.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {incident.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {incident.time}
                </div>
                {incident.location && (
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {incident.location}
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{incident.description}"
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No saved incidents found.</p>
            <button 
              onClick={() => navigate('/report-incident')}
              className="text-primary font-bold text-sm"
            >
              Report an Incident
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
