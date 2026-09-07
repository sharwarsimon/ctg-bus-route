import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { TripPlanner } from './components/TripPlanner';
import { BusList } from './components/BusList';
import { StopsDirectory } from './components/StopsDirectory';
import { FavoritesView } from './components/FavoritesView';
import { DeveloperProfile } from './components/DeveloperProfile';
import { RouteDetailsModal } from './components/RouteDetailsModal';
import { InfoModal } from './components/InfoModal';
import { BusRoute } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('trip');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ctg_bus_favorites');
      return saved ? JSON.parse(saved) : ['bus-1', 'bus-2', 'bus-10'];
    } catch {
      return ['bus-1', 'bus-2', 'bus-10'];
    }
  });

  const [isDesktopFrame, setIsDesktopFrame] = useState(true);
  const [selectedBusForModal, setSelectedBusForModal] = useState<BusRoute | null>(null);
  const [modalHighlightStop, setModalHighlightStop] = useState<string | undefined>(undefined);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [planOriginStop, setPlanOriginStop] = useState<string>('জিইসি মোড়');

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ctg_bus_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (busId: string) => {
    setFavorites((prev) =>
      prev.includes(busId) ? prev.filter((id) => id !== busId) : [...prev, busId]
    );
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const handleOpenBusDetails = (bus: BusRoute, highlightStop?: string) => {
    setSelectedBusForModal(bus);
    setModalHighlightStop(highlightStop);
  };

  const handlePlanTripFromStop = (stopName: string) => {
    setPlanOriginStop(stopName);
    setCurrentTab('trip');
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex flex-col items-center justify-center p-0 md:p-3 overflow-hidden">
      {/* Outer Shell - Mobile Frame on Desktop or Responsive Full-screen on Mobile */}
      <div
        className={`w-full h-full bg-slate-100 flex flex-col transition-all overflow-hidden relative shadow-2xl ${
          isDesktopFrame
            ? 'md:max-w-md md:h-[94vh] md:max-h-[860px] md:rounded-[40px] md:border-[10px] md:border-slate-800'
            : 'max-w-4xl md:h-[94vh] md:rounded-3xl'
        }`}
      >
        {/* iOS style speaker / camera notch bar (desktop frame only) */}
        {isDesktopFrame && (
          <div className="hidden md:flex justify-center items-center h-5 bg-slate-800 shrink-0">
            <div className="w-16 h-3.5 bg-slate-950 rounded-b-xl flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        )}

        {/* Top Header - Always fixed at top */}
        <div className="shrink-0">
          <Header
            onOpenInfo={() => setIsInfoOpen(true)}
            isDesktopFrame={isDesktopFrame}
            onToggleFrame={() => setIsDesktopFrame(!isDesktopFrame)}
          />
        </div>

        {/* Main Scrollable Content Area - Only this container scrolls */}
        <main className="flex-1 overflow-y-auto overscroll-contain px-3.5 pt-3 pb-3 min-h-0">
          {currentTab === 'trip' && (
            <TripPlanner
              onSelectBus={handleOpenBusDetails}
              initialFromStop={planOriginStop}
            />
          )}

          {currentTab === 'routes' && (
            <BusList
              onSelectBus={handleOpenBusDetails}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {currentTab === 'stops' && (
            <StopsDirectory
              onSelectBus={handleOpenBusDetails}
              onPlanTripFromStop={handlePlanTripFromStop}
            />
          )}

          {currentTab === 'favorites' && (
            <FavoritesView
              favorites={favorites}
              onSelectBus={handleOpenBusDetails}
              onToggleFavorite={toggleFavorite}
              onClearAllFavorites={clearAllFavorites}
              onGoToBuses={() => setCurrentTab('routes')}
            />
          )}

          {currentTab === 'developer' && <DeveloperProfile />}
        </main>

        {/* Bottom Navigation - Firmly pinned and fixed at bottom */}
        <div className="shrink-0 z-30">
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
            favoritesCount={favorites.length}
          />
        </div>
      </div>

      {/* Route Details Modal */}
      <RouteDetailsModal
        bus={selectedBusForModal}
        onClose={() => {
          setSelectedBusForModal(null);
          setModalHighlightStop(undefined);
        }}
        isFavorite={selectedBusForModal ? favorites.includes(selectedBusForModal.id) : false}
        onToggleFavorite={toggleFavorite}
        onSelectBus={(bus) => {
          setSelectedBusForModal(bus);
        }}
        highlightStop={modalHighlightStop}
      />

      {/* Information Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
