import React from 'react';
import { Bookmark, BookmarkCheck, Bus, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { BusRoute } from '../types';
import { BUS_ROUTES } from '../data/busRoutes';

interface FavoritesViewProps {
  favorites: string[];
  onSelectBus: (bus: BusRoute) => void;
  onToggleFavorite: (busId: string) => void;
  onClearAllFavorites: () => void;
  onGoToBuses: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onSelectBus,
  onToggleFavorite,
  onClearAllFavorites,
  onGoToBuses,
}) => {
  const favoriteBuses = BUS_ROUTES.filter((b) => favorites.includes(b.id));

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-slate-900">সংরক্ষিত বাসসমূহ</h3>
          <p className="text-xs text-slate-500">
            আপনার পছন্দের বা নিয়মিত যাতায়াতের বাস রুট
          </p>
        </div>

        {favoriteBuses.length > 0 && (
          <button
            onClick={onClearAllFavorites}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>সব মুছুন</span>
          </button>
        )}
      </div>

      {favoriteBuses.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mx-auto mb-3">
            <Bookmark className="h-6 w-6 stroke-1.5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">কোনো বাস সংরক্ষিত নেই</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            আপনার নিয়মিত প্রয়োজনীয় বাসের পাশে বুকমার্ক আইকনে ক্লিক করে এখানে সহজে সংরক্ষণ করুন।
          </p>
          <button
            onClick={onGoToBuses}
            className="mt-4 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Bus className="h-4 w-4" />
            <span>সকল বাস তালিকা দেখুন</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favoriteBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => onSelectBus(bus)}
              className="cursor-pointer rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all p-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white font-bold text-sm shadow-xs ${bus.color}`}
                  >
                    {bus.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{bus.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <span>{bus.startPoint}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span>{bus.endPoint}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(bus.id);
                    }}
                    title="বুকমার্ক সরান"
                    className="p-2 text-amber-500 hover:text-amber-600 rounded-xl"
                  >
                    <BookmarkCheck className="h-5 w-5 fill-amber-500" />
                  </button>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{bus.stops.length} টি স্টপেজ</span>
                <span className="font-bold text-sky-600">বিস্তারিত রুট দেখুন ➔</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
