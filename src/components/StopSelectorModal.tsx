import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, Check, Sparkles } from 'lucide-react';
import { ALL_UNIQUE_STOPS, POPULAR_STOPS, normalizeStopName } from '../data/busRoutes';

interface StopSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  selectedStop: string;
  onSelectStop: (stop: string) => void;
  excludeStop?: string;
}

export const StopSelectorModal: React.FC<StopSelectorModalProps> = ({
  isOpen,
  onClose,
  title,
  selectedStop,
  onSelectStop,
  excludeStop,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStops = useMemo(() => {
    const term = normalizeStopName(searchTerm);
    return ALL_UNIQUE_STOPS.filter((stop) => {
      if (excludeStop && stop === excludeStop) return false;
      if (!term) return true;
      const normalized = normalizeStopName(stop);
      return normalized.includes(term) || stop.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, excludeStop]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        id="stop-selector-modal"
        className="flex flex-col w-full max-w-md h-[85vh] sm:h-[650px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Modal Handle for Mobile */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-sky-600" />
            <h3 className="font-bold text-slate-800 text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="stop-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="স্টপেজের নাম লিখুন (যেমন: জিইসি, আগ্রাবাদ)..."
              autoFocus
              className="w-full pl-9 pr-8 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Popular Stops Quick Chips */}
          {!searchTerm && (
            <div className="mt-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>জনপ্রিয় স্টপসমূহ:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {POPULAR_STOPS.filter((s) => s !== excludeStop).map((stop) => (
                  <button
                    key={stop}
                    onClick={() => {
                      onSelectStop(stop);
                      onClose();
                    }}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      selectedStop === stop
                        ? 'bg-sky-600 border-sky-600 text-white font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {stop}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stops List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filteredStops.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <MapPin className="h-10 w-10 mx-auto mb-2 text-slate-300 stroke-1" />
              <p className="text-sm font-medium">কোনো স্টপেজ পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-0.5">বানান পরীক্ষা করে আবার অনুসন্ধান করুন</p>
            </div>
          ) : (
            filteredStops.map((stop) => {
              const isSelected = selectedStop === stop;
              return (
                <button
                  key={stop}
                  onClick={() => {
                    onSelectStop(stop);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-sky-50 text-sky-800 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs ${
                        isSelected
                          ? 'bg-sky-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm">{stop}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-sky-600" />}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
