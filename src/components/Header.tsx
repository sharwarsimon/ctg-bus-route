import React from 'react';
import { Bus, Info, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  onOpenInfo: () => void;
  isDesktopFrame: boolean;
  onToggleFrame?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInfo,
  isDesktopFrame,
  onToggleFrame,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-sky-700 via-sky-600 to-teal-600 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs border border-white/20 shadow-inner">
            <Bus className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold leading-tight tracking-tight">চট্টগ্রাম বাস রুট</h1>
              <span className="rounded-full bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-slate-900 shadow-xs">
                সিটি
              </span>
            </div>
            <p className="text-[11px] text-sky-100 font-medium leading-none mt-0.5">
              সিটির ১৪টি বাস ও সকল স্টপেজ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onToggleFrame && (
            <button
              onClick={onToggleFrame}
              title={isDesktopFrame ? 'ফুলস্ক্রিন মোড' : 'মোবাইল ফ্রেম মোড'}
              aria-label="মোবাইল বা ফুলস্ক্রিন ভিউ পরিবর্তন"
              className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isDesktopFrame ? (
                <Monitor className="h-4 w-4" />
              ) : (
                <Smartphone className="h-4 w-4" />
              )}
            </button>
          )}

          <button
            onClick={onOpenInfo}
            aria-label="অ্যাপ তথ্য"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
