import React, { useState } from 'react';
import {
  X,
  Bus,
  ArrowRightLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  Check,
  Info,
  Layers,
} from 'lucide-react';
import { BusRoute } from '../types';
import { BUS_ROUTES } from '../data/busRoutes';
import { isSameStop } from '../utils/routeFinder';

interface RouteDetailsModalProps {
  bus: BusRoute | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (busId: string) => void;
  onSelectBus?: (bus: BusRoute) => void;
  highlightStop?: string;
}

export const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({
  bus,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectBus,
  highlightStop,
}) => {
  const [isReversed, setIsReversed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);

  if (!bus) return null;

  const stopsToDisplay = isReversed ? [...bus.stops].reverse() : bus.stops;
  const currentStart = isReversed ? bus.endPoint : bus.startPoint;
  const currentEnd = isReversed ? bus.startPoint : bus.endPoint;

  const handleShare = async () => {
    const text = `${bus.name} (${currentStart} থেকে ${currentEnd})\nমোট স্টপেজ: ${bus.stops.length} টি\nস্টপেজসমূহ: ${bus.stops.join(' ➔ ')}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: bus.name,
          text,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find other buses passing through a given stop
  const getOtherBusesAtStop = (stopName: string) => {
    return BUS_ROUTES.filter(
      (b) => b.id !== bus.id && b.stops.some((s) => isSameStop(s, stopName))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        id="route-details-modal"
        className="flex flex-col w-full max-w-lg h-[92vh] sm:h-[720px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
      >
        {/* Mobile Drag Indicator */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden bg-slate-50">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white font-bold text-lg shadow-sm ${bus.color}`}
              >
                {bus.number}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{bus.name}</h3>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                    {bus.type === 'mini'
                      ? 'মিনি বাস'
                      : bus.type === 'large'
                      ? 'বড় বাস'
                      : bus.type === 'special'
                      ? 'এক্সপ্রেস'
                      : 'সিটি বাস'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  সর্বমোট {bus.stops.length} টি স্টপেজ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleFavorite(bus.id)}
                aria-label={isFavorite ? 'বুকমার্ক সরান' : 'বুকমার্কে যোগ করুন'}
                className={`p-2 rounded-xl border transition-colors ${
                  isFavorite
                    ? 'bg-amber-50 border-amber-200 text-amber-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                }`}
              >
                {isFavorite ? (
                  <BookmarkCheck className="h-4 w-4 fill-amber-500 text-amber-500" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={handleShare}
                aria-label="রুট শেয়ার করুন"
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-800 transition-colors relative"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={onClose}
                aria-label="বন্ধ করুন"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Direction Banner */}
          <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white p-3 border border-slate-200 shadow-2xs">
            <div className="flex-1 min-w-0 pr-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                চলাচলের অভিমুখ
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 truncate mt-0.5">
                <span className="text-sky-700">{currentStart}</span>
                <span className="text-slate-400">➔</span>
                <span className="text-emerald-700">{currentEnd}</span>
              </div>
            </div>

            <button
              onClick={() => setIsReversed(!isReversed)}
              className="flex items-center gap-1 rounded-lg bg-sky-50 hover:bg-sky-100 active:bg-sky-200 px-2.5 py-1.5 text-xs font-semibold text-sky-700 border border-sky-100 transition-colors shrink-0"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>দিক পরিবর্তন</span>
            </button>
          </div>

          {bus.description && (
            <div className="mt-2 text-xs text-slate-600 flex items-start gap-1.5 bg-slate-100/70 p-2 rounded-lg">
              <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{bus.description}</span>
            </div>
          )}
        </div>

        {/* Vertical Timeline of Stops */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              স্টপেজ তালিকা ({stopsToDisplay.length} টি)
            </h4>
            <span className="text-[11px] text-slate-400">
              স্টপে ক্লিক করে কানেক্টিং বাস দেখুন
            </span>
          </div>

          <div className="relative pl-6 space-y-3">
            {/* Timeline Line */}
            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-200" />

            {stopsToDisplay.map((stop, index) => {
              const isFirst = index === 0;
              const isLast = index === stopsToDisplay.length - 1;
              const isHighlighted = highlightStop && isSameStop(stop, highlightStop);
              const otherBuses = getOtherBusesAtStop(stop);
              const isExpanded = expandedStop === stop;

              return (
                <div key={`${stop}-${index}`} className="relative group">
                  {/* Stop Bullet Node */}
                  <div
                    className={`absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-4 ring-white transition-all ${
                      isFirst
                        ? 'bg-sky-600 text-white'
                        : isLast
                        ? 'bg-emerald-600 text-white'
                        : isHighlighted
                        ? 'bg-amber-500 text-white ring-amber-100 ring-4'
                        : 'bg-white border-2 border-slate-400 text-slate-600'
                    }`}
                  >
                    {isFirst || isLast ? (
                      <span className="text-[9px]">•</span>
                    ) : (
                      <span className="text-[9px]">{index + 1}</span>
                    )}
                  </div>

                  {/* Stop Content Card */}
                  <div
                    onClick={() => setExpandedStop(isExpanded ? null : stop)}
                    className={`cursor-pointer rounded-xl p-2.5 border transition-all ${
                      isHighlighted
                        ? 'bg-amber-50 border-amber-300 shadow-xs'
                        : isExpanded
                        ? 'bg-sky-50/50 border-sky-200 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isFirst
                              ? 'text-sky-800 font-bold'
                              : isLast
                              ? 'text-emerald-800 font-bold'
                              : isHighlighted
                              ? 'text-amber-900 font-bold'
                              : 'text-slate-800'
                          }`}
                        >
                          {stop}
                        </span>
                        {isFirst && (
                          <span className="rounded-md bg-sky-100 px-1.5 py-0.2 text-[10px] font-bold text-sky-700">
                            শুরু
                          </span>
                        )}
                        {isLast && (
                          <span className="rounded-md bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                            শেষ
                          </span>
                        )}
                      </div>

                      {otherBuses.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <Layers className="h-3 w-3 text-sky-600" />
                          <span>+{otherBuses.length} বাস</span>
                        </div>
                      )}
                    </div>

                    {/* Connecting buses mini tags if expanded */}
                    {isExpanded && otherBuses.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/70 animate-in fade-in duration-150">
                        <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                          এই স্টপেজে পাওয়া যাবে আরও:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {otherBuses.map((otherBus) => (
                            <button
                              key={otherBus.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectBus) {
                                  onSelectBus(otherBus);
                                }
                              }}
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-transform hover:scale-105 ${otherBus.accentColor}`}
                            >
                              {otherBus.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>
            {bus.startPoint} ⇄ {bus.endPoint}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 font-semibold rounded-lg text-slate-800 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
