import React, { useState } from 'react';
import { Search, MapPin, Phone, ExternalLink, Filter, AlertCircle, ChevronRight, X, FileText } from 'lucide-react';
import { MOCK_SERVICES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SupportService, Incident } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const [incidents] = useLocalStorage<Incident[]>('mauntra_incidents', []);
  const [draft] = useLocalStorage<Partial<Incident> | null>('mauntra_incident_draft', null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<SupportService | null>(null);

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesFilter = filter === 'All' || service.type === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', 'Shelter', 'Legal', 'Counseling', 'Health'];

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Support Services</h2>
        <p className="text-slate-500 text-sm">Find trusted organizations and resources near you.</p>
      </header>

      {/* Report Incident CTA */}
      <Link 
        to="/report-incident"
        className="flex items-center justify-between p-5 bg-rose-600 text-white rounded-3xl shadow-lg shadow-rose-100 group active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Report an Incident</h3>
            <p className="text-xs text-rose-100">Securely document what happened</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-rose-200 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Safety Records */}
      <section className="space-y-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-rose-600" /> Safety Records
        </h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => navigate('/saved-incidents')}
            className="w-full p-5 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-rose-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">Saved Incidents</p>
                <p className="text-xs text-slate-400">{incidents.length} records found</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
          
          {draft && (
            <button 
              onClick={() => navigate('/report-incident', { state: { resume: true } })}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800">Unfinished Draft</p>
                  <p className="text-xs text-slate-500">Continue reporting incident</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          )}
        </div>
      </section>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                filter === cat 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={service.id}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    service.type === 'Shelter' ? "bg-rose-50 text-rose-600" :
                    service.type === 'Legal' ? "bg-blue-50 text-blue-600" :
                    service.type === 'Counseling' ? "bg-emerald-50 text-emerald-600" :
                    "bg-amber-50 text-amber-600"
                  )}>
                    {service.type}
                  </span>
                  <h3 className="font-bold text-slate-900">{service.name}</h3>
                </div>
                <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedService(service)}
                  className="text-indigo-600 text-xs font-bold hover:underline"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name + ' ' + service.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                    title="Get Directions"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                  <a 
                    href={`tel:${service.contact}`}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No services found matching your search.</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                    {selectedService.type}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedService.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Location</p>
                    <p className="text-sm text-slate-500">{selectedService.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Contact</p>
                    <p className="text-sm text-slate-500">{selectedService.contact}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <a 
                  href={`tel:${selectedService.contact}`}
                  className="bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-indigo-100 active:scale-95 transition-all"
                >
                  Call Now
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedService.name + ' ' + selectedService.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-indigo-600 border border-indigo-100 py-4 rounded-2xl font-bold text-center active:scale-95 transition-all"
                >
                  Directions
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
