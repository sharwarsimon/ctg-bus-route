import React from 'react';
import { Route, Bus, MapPin, Bookmark, User } from 'lucide-react';

export type TabType = 'trip' | 'routes' | 'stops' | 'favorites' | 'developer';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  favoritesCount,
}) => {
  const tabs = [
    {
      id: 'trip' as TabType,
      label: 'যাত্রা খুঁজুন',
      icon: Route,
    },
    {
      id: 'routes' as TabType,
      label: 'সকল বাস',
      icon: Bus,
    },
    {
      id: 'stops' as TabType,
      label: 'স্টপেজ',
      icon: MapPin,
    },
    {
      id: 'favorites' as TabType,
      label: 'সংরক্ষিত',
      icon: Bookmark,
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
    {
      id: 'developer' as TabType,
      label: 'Developer',
      icon: User,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="নিচের নেভিগেশন বার"
      className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-sky-600 font-semibold scale-105'
                  : 'text-slate-500 hover:text-slate-700 active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 h-1 w-6 rounded-full bg-sky-600" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
