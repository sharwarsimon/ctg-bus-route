import React, { useState, useMemo } from 'react';
import { Search, X, Bus, Bookmark, BookmarkCheck, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import { BusRoute } from '../types';
import { BUS_ROUTES, normalizeStopName } from '../data/busRoutes';

interface BusListProps {
  onSelectBus: (bus: BusRoute) => void;
  favorites: string[];
  onToggleFavorite: (busId: string) => void;
}

export const BusList: React.FC<BusListProps> = ({
  onSelectBus,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterChips = [
    { id: 'all', label: 'সব বাস (১৪)' },
    { id: 'mini', label: 'মিনি বাস' },
    { id: 'large', label: 'বড় বাস' },
    { id: 'newmarket', label: 'নিউ মার্কেটগামী' },
    { id: 'seabeach', label: 'সি বিচগামী' },
    { id: 'gec', label: 'জিইসি হয়ে' },
    { id: 'bahaddarhat', label: 'বহদ্দারহাট হয়ে' },
  ];

  const filteredBuses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const normalizedQuery = normalizeStopName(query);

    return BUS_ROUTES.filter((bus) => {
      // Filter tab check
      if (selectedFilter === 'mini' && bus.type !== 'mini') return false;
      if (selectedFilter === 'large' && bus.type !== 'large') return false;
      if (
        selectedFilter === 'newmarket' &&
        !bus.stops.some((s) => s.includes('নিউ মার্কেট') || s.includes('নিউমার্কেট'))
      ) {
        return false;
      }
      if (
        selectedFilter === 'seabeach' &&
        !bus.stops.some((s) => s.includes('সি বিচ'))
      ) {
        return false;
      }
      if (
        selectedFilter === 'gec' &&
        !bus.stops.some((s) => s.includes('জিইসি'))
      ) {
        return false;
      }
      if (
        selectedFilter === 'bahaddarhat' &&
        !bus.stops.some((s) => s.includes('বহদ্দারহাট'))
      ) {
        return false;
      }

      // Search query check
      if (!query) return true;

      // Match bus name or number
      if (
        bus.name.toLowerCase().includes(query) ||
        bus.number.toLowerCase().includes(query)
      ) {
        return true;
      }

      // Match stops
      return bus.stops.some((stop) => {
        const norm = normalizeStopName(stop);
        return norm.includes(normalizedQuery) || stop.toLowerCase().includes(query);
      });
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="space-y-3.5 pb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          id="bus-list-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="বাসের নাম বা স্টপেজ খুঁজুন (যেমন: ২ নং, জিইসি, ইপিজেড)..."
          className="w-full pl-9 pr-9 py-2.5 bg-white rounded-2xl border border-slate-200 text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Category Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {filterChips.map((chip) => {
          const isActive = selectedFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setSelectedFilter(chip.id)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Bus Count Label */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>মোট {filteredBuses.length} টি বাস পাওয়া গেছে</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-sky-600 font-semibold hover:underline"
          >
            সার্চ মুছুন
          </button>
        )}
      </div>

      {/* Bus Cards List */}
      <div className="space-y-3">
        {filteredBuses.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500">
            <Bus className="h-10 w-10 mx-auto text-slate-300 mb-2 stroke-1" />
            <p className="text-sm font-bold text-slate-800">কোনো বাস পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">
              অনুসন্ধান ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
            </p>
          </div>
        ) : (
          filteredBuses.map((bus) => {
            const isFav = favorites.includes(bus.id);
            // Key landmark stops to preview (take 3-4 interesting ones)
            const sampleStops = bus.stops.slice(1, -1).slice(0, 4);

            return (
              <div
                key={bus.id}
                onClick={() => onSelectBus(bus)}
                className="group cursor-pointer rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all overflow-hidden"
              >
                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white font-bold text-base shadow-xs group-hover:scale-105 transition-transform ${bus.color}`}
                      >
                        {bus.number}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
                            {bus.name}
                          </h4>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {bus.type === 'mini'
                              ? 'মিনি'
                              : bus.type === 'large'
                              ? 'বড়'
                              : bus.type === 'special'
                              ? 'মেট্রো'
                              : 'সিটি'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {bus.stops.length} টি স্টপেজ
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(bus.id);
                        }}
                        aria-label={isFav ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
                        className={`p-2 rounded-xl transition-colors ${
                          isFav
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                      >
                        {isFav ? (
                          <BookmarkCheck className="h-5 w-5 fill-amber-500 text-amber-500" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>

                      <div className="h-7 w-7 rounded-xl bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center text-slate-400 group-hover:text-sky-600 transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Route Terminals */}
                  <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs flex items-center justify-between text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold truncate">
                      <span className="text-sky-700 truncate">{bus.startPoint}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="text-emerald-700 truncate">{bus.endPoint}</span>
                    </div>
                  </div>

                  {/* Preview of key stops */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sampleStops.map((stop, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                      >
                        {stop}
                      </span>
                    ))}
                    {bus.stops.length > 6 && (
                      <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                        +{bus.stops.length - 6} আরও
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
