import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, Bus, Navigation } from 'lucide-react';
import { ALL_UNIQUE_STOPS, normalizeStopName, POPULAR_STOPS } from '../data/busRoutes';
import { getBusesForStop } from '../utils/routeFinder';
import { BusRoute } from '../types';

interface StopsDirectoryProps {
  onSelectBus: (bus: BusRoute, highlightStop?: string) => void;
  onPlanTripFromStop: (stopName: string) => void;
}

export const StopsDirectory: React.FC<StopsDirectoryProps> = ({
  onSelectBus,
  onPlanTripFromStop,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStop, setSelectedStop] = useState<string | null>(null);

  const filteredStops = useMemo(() => {
    const term = normalizeStopName(searchTerm);
    return ALL_UNIQUE_STOPS.filter((stop) => {
      if (!term) return true;
      const normalized = normalizeStopName(stop);
      return normalized.includes(term) || stop.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  const busesAtSelectedStop = useMemo(() => {
    if (!selectedStop) return [];
    return getBusesForStop(selectedStop);
  }, [selectedStop]);

  return (
    <div className="space-y-4 pb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          id="stops-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="স্টপেজের নাম দিয়ে খুঁজুন (যেমন: টাইগার পাস, চকবাজার)..."
          className="w-full pl-9 pr-9 py-2.5 bg-white rounded-2xl border border-slate-200 text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Selected Stop Details Drawer / Banner */}
      {selectedStop && (
        <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedStop}</h3>
                <p className="text-xs text-sky-800 font-medium">
                  {busesAtSelectedStop.length} টি বাস এই স্টপেজে চলাচল করে
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStop(null)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onPlanTripFromStop(selectedStop)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>এখান থেকে যাত্রা শুরু করুন</span>
            </button>
          </div>

          {/* List of buses at this stop */}
          <div className="mt-3 pt-3 border-t border-sky-200/60 space-y-2">
            <div className="text-[11px] font-bold text-sky-900 uppercase tracking-wider">
              চলমান বাসসমূহ:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {busesAtSelectedStop.map((bus) => (
                <div
                  key={bus.id}
                  onClick={() => onSelectBus(bus, selectedStop)}
                  className="cursor-pointer flex items-center justify-between p-2 rounded-xl bg-white border border-sky-100 hover:border-sky-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-7 w-7 rounded-lg text-white font-bold text-xs flex items-center justify-center ${bus.color}`}
                    >
                      {bus.number}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{bus.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {bus.startPoint} ⇄ {bus.endPoint}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-600">রুট</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popular Stops shortcuts if no search */}
      {!searchTerm && !selectedStop && (
        <div>
          <div className="text-xs font-bold text-slate-500 mb-2">জনপ্রিয় প্রধান স্টপেজসমূহ:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {POPULAR_STOPS.slice(0, 8).map((stop) => {
              const buses = getBusesForStop(stop);
              return (
                <button
                  key={stop}
                  onClick={() => setSelectedStop(stop)}
                  className="flex flex-col items-start p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/50 transition-all text-left shadow-2xs"
                >
                  <span className="text-xs font-bold text-slate-800 truncate w-full">
                    {stop}
                  </span>
                  <span className="text-[11px] text-sky-600 font-medium mt-0.5">
                    {buses.length} টি বাস
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Stops List */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
          <span>মোট {filteredStops.length} টি স্টপেজ</span>
          <span className="text-slate-400">স্টপে ক্লিক করে বাস দেখুন</span>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filteredStops.map((stop) => {
            const buses = getBusesForStop(stop);
            const isSelected = selectedStop === stop;

            return (
              <button
                key={stop}
                onClick={() => setSelectedStop(isSelected ? null : stop)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? 'bg-sky-50 text-sky-900 font-semibold'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs ${
                      isSelected
                        ? 'bg-sky-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold">{stop}</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <Bus className="h-3 w-3 text-sky-500" />
                      <span>{buses.length} টি বাস রুট</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {buses.slice(0, 3).map((b) => (
                    <span
                      key={b.id}
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      {b.number}
                    </span>
                  ))}
                  {buses.length > 3 && (
                    <span className="text-[10px] font-bold text-slate-400">
                      +{buses.length - 3}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
