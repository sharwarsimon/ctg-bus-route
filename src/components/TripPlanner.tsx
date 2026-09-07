import React, { useState, useMemo } from 'react';
import {
  MapPin,
  ArrowUpDown,
  Search,
  Bus,
  ChevronRight,
  ChevronDown,
  Navigation,
  Sparkles,
  GitCommit,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { BusRoute } from '../types';
import { findDirectRoutes, findTransferRoutes } from '../utils/routeFinder';
import { StopSelectorModal } from './StopSelectorModal';
import { POPULAR_STOPS } from '../data/busRoutes';

interface TripPlannerProps {
  onSelectBus: (bus: BusRoute, highlightStop?: string) => void;
  initialFromStop?: string;
  initialToStop?: string;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  onSelectBus,
  initialFromStop,
  initialToStop,
}) => {
  const [fromStop, setFromStop] = useState<string>(initialFromStop || 'জিইসি মোড়');
  const [toStop, setToStop] = useState<string>(initialToStop || 'নিউ মার্কেট');

  // If external initial stops change
  React.useEffect(() => {
    if (initialFromStop) setFromStop(initialFromStop);
  }, [initialFromStop]);

  React.useEffect(() => {
    if (initialToStop) setToStop(initialToStop);
  }, [initialToStop]);

  // Modals state
  const [modalType, setModalType] = useState<'from' | 'to' | null>(null);

  // Accordion state for stops
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);
  const [expandedTransferIdx, setExpandedTransferIdx] = useState<number | null>(null);

  // Calculate direct routes
  const directRoutes = useMemo(() => {
    return findDirectRoutes(fromStop, toStop);
  }, [fromStop, toStop]);

  // Calculate transfer routes if needed
  const transferRoutes = useMemo(() => {
    if (directRoutes.length > 0) return [];
    return findTransferRoutes(fromStop, toStop);
  }, [fromStop, toStop, directRoutes]);

  const handleSwap = () => {
    const temp = fromStop;
    setFromStop(toStop);
    setToStop(temp);
  };

  const quickPairs = [
    { from: 'বহদ্দারহাট', to: 'নিউ মার্কেট' },
    { from: 'জিইসি মোড়', to: 'আগ্রাবাদ' },
    { from: 'মুরাদপুর', to: 'সি বিচ' },
    { from: 'অলংকার মোড়', to: 'ভাটিয়ারী' },
    { from: 'কাপ্তাই রাস্তার মাথা', to: 'কোতোয়ালি' },
    { from: 'অক্সিজেন মোড়', to: 'নিউ মার্কেট' },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Route Selector Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
        <div className="relative flex flex-col gap-2.5">
          {/* From Input */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
              <div className="h-3 w-3 rounded-full bg-sky-600 ring-4 ring-sky-100" />
            </div>
            <button
              id="trip-from-stop-btn"
              onClick={() => setModalType('from')}
              className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <span className="block text-[11px] font-semibold text-slate-400">
                  যাত্রা শুরু (কোথা থেকে?)
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {fromStop || 'স্টপেজ সিলেক্ট করুন'}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Swap Button (Floating Center-Right) */}
          <div className="relative flex justify-end pr-5 -my-2.5 z-10">
            <button
              onClick={handleSwap}
              aria-label="দিক পরিবর্তন"
              title="স্থান অদলবদল করুন"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-md ring-4 ring-white active:scale-90 transition-transform"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Input */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <MapPin className="h-4 w-4 text-emerald-600" />
            </div>
            <button
              id="trip-to-stop-btn"
              onClick={() => setModalType('to')}
              className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 text-left transition-colors"
            >
              <div>
                <span className="block text-[11px] font-semibold text-slate-400">
                  গন্তব্য (কোথায় যাবেন?)
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {toStop || 'স্টপেজ সিলেক্ট করুন'}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Quick Popular Pair Suggestions */}
        <div className="mt-3.5 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mb-1.5">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>জনপ্রিয় রুটসমূহ:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickPairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setFromStop(pair.from);
                  setToStop(pair.to);
                }}
                className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-transparent transition-colors text-slate-700"
              >
                {pair.from} ➔ {pair.to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        {/* Results Header */}
        <div className="flex items-center justify-between px-1 mb-2">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Bus className="h-4 w-4 text-sky-600" />
            <span>উপলব্ধ বাস সমূহ</span>
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
            {directRoutes.length > 0
              ? `${directRoutes.length} টি সরাসরি বাস`
              : transferRoutes.length > 0
              ? `${transferRoutes.length} টি কানেক্টিং রুট`
              : 'বাস পাওয়া যায়নি'}
          </span>
        </div>

        {/* Direct Buses List */}
        {directRoutes.length > 0 && (
          <div className="space-y-3">
            {directRoutes.map((result) => {
              const bus = result.bus;
              const isExpanded = expandedBusId === bus.id;
              // Approximate transit time: ~3 mins per stop
              const approxTimeMin = Math.max(10, result.totalStops * 3 - 5);
              const approxTimeMax = approxTimeMin + 10;

              return (
                <div
                  key={bus.id}
                  className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:border-sky-300"
                >
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold text-sm shadow-xs ${bus.color}`}
                        >
                          {bus.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">
                              {bus.name}
                            </h4>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {bus.type === 'mini' ? 'মিনি' : bus.type === 'large' ? 'বড়' : 'সিটি'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <GitCommit className="h-3.5 w-3.5 text-sky-600" />
                              {result.totalStops} টি স্টপেজ
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400" />
                              প্রায় {approxTimeMin}-{approxTimeMax} মি.
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectBus(bus, fromStop)}
                        className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-colors shrink-0"
                      >
                        রুট ম্যাপ
                      </button>
                    </div>

                    {/* Direction Preview */}
                    <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs flex items-center justify-between text-slate-700">
                      <div className="flex items-center gap-1.5 font-medium truncate">
                        <span className="text-sky-700 font-bold">{fromStop}</span>
                        <span className="text-slate-400">➔</span>
                        <span className="text-emerald-700 font-bold">{toStop}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 shrink-0 ml-2">
                        {result.direction === 'forward' ? 'সরাসরি অভিমুখ' : 'বিপরীত অভিমুখ'}
                      </span>
                    </div>

                    {/* Expandable intermediate stops toggle */}
                    <button
                      onClick={() => setExpandedBusId(isExpanded ? null : bus.id)}
                      className="mt-2 w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 py-1"
                    >
                      <span>
                        {isExpanded ? 'স্টপেজ তালিকা লুকান' : 'মাঝের স্টপেজগুলো দেখুন'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Intermediate Stops Accordion */}
                  {isExpanded && (
                    <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-100">
                      <div className="relative pl-5 space-y-2 text-xs">
                        <div className="absolute left-2 top-1.5 bottom-1.5 w-0.5 bg-sky-200" />
                        {result.stopsInBetween.map((stop, idx) => {
                          const isStart = idx === 0;
                          const isEnd = idx === result.stopsInBetween.length - 1;
                          return (
                            <div key={idx} className="relative flex items-center gap-2">
                              <div
                                className={`absolute -left-5 h-2.5 w-2.5 rounded-full ${
                                  isStart
                                    ? 'bg-sky-600 ring-2 ring-sky-200'
                                    : isEnd
                                    ? 'bg-emerald-600 ring-2 ring-emerald-200'
                                    : 'bg-slate-300'
                                }`}
                              />
                              <span
                                className={`${
                                  isStart || isEnd
                                    ? 'font-bold text-slate-900'
                                    : 'text-slate-600'
                                }`}
                              >
                                {stop}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Transfer Routes List when no direct bus */}
        {directRoutes.length === 0 && transferRoutes.length > 0 && (
          <div className="space-y-3">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
              <span className="font-bold">কোনো সরাসরি বাস নেই!</span> নিচে ১টি স্টপেজ বদল
              করে যাওয়ার বিকল্প রুট দেওয়া হলো:
            </div>

            {transferRoutes.map((transfer, idx) => {
              const isExpanded = expandedTransferIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 shadow-xs p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      বিকল্প রুট #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      মোট {transfer.totalStops} টি স্টপেজ
                    </span>
                  </div>

                  {/* Leg 1 */}
                  <div className="flex items-center justify-between rounded-xl bg-sky-50/60 p-2.5 border border-sky-100">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-7 w-7 rounded-lg text-white font-bold text-xs flex items-center justify-center ${transfer.firstLeg.bus.color}`}
                      >
                        {transfer.firstLeg.bus.number}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {transfer.firstLeg.bus.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {fromStop} ➔ <span className="font-bold text-sky-700">{transfer.transferStop}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectBus(transfer.firstLeg.bus, transfer.transferStop)}
                      className="text-xs font-bold text-sky-700 underline"
                    >
                      রুট
                    </button>
                  </div>

                  {/* Transfer Indicator */}
                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <div className="h-px bg-slate-200 flex-1" />
                    <div className="rounded-full bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 text-[11px] font-bold flex items-center gap-1">
                      <RotateCcw className="h-3 w-3" />
                      <span>{transfer.transferStop}-এ বাস বদলান</span>
                    </div>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>

                  {/* Leg 2 */}
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 p-2.5 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-7 w-7 rounded-lg text-white font-bold text-xs flex items-center justify-center ${transfer.secondLeg.bus.color}`}
                      >
                        {transfer.secondLeg.bus.number}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {transfer.secondLeg.bus.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          <span className="font-bold text-emerald-700">{transfer.transferStop}</span> ➔ {toStop}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectBus(transfer.secondLeg.bus, transfer.transferStop)}
                      className="text-xs font-bold text-emerald-700 underline"
                    >
                      রুট
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No bus found at all */}
        {directRoutes.length === 0 && transferRoutes.length === 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500">
            <Bus className="h-10 w-10 mx-auto text-slate-300 mb-2 stroke-1" />
            <h4 className="text-sm font-bold text-slate-800">কোনো রুট পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">
              {fromStop} থেকে {toStop} যাওয়ার কোনো সরাসরি বা ১-বদল বাস রুট তালিকায় নেই। অন্য
              নিকটবর্তী স্টপেজ নির্বাচন করুন।
            </p>
          </div>
        )}
      </div>

      {/* Stop Selector Modal */}
      <StopSelectorModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === 'from' ? 'যাত্রা শুরুর স্টপ নির্বাচন' : 'গন্তব্য স্টপ নির্বাচন'}
        selectedStop={modalType === 'from' ? fromStop : toStop}
        excludeStop={modalType === 'from' ? toStop : fromStop}
        onSelectStop={(stop) => {
          if (modalType === 'from') setFromStop(stop);
          if (modalType === 'to') setToStop(stop);
        }}
      />
    </div>
  );
};
