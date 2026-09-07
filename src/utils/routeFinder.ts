import { BUS_ROUTES, normalizeStopName } from '../data/busRoutes';
import { BusRoute, DirectTripResult, TransferTripResult } from '../types';

/**
 * Check if two stop strings refer to the same station/location
 */
export function isSameStop(stopA: string, stopB: string): boolean {
  if (!stopA || !stopB) return false;
  if (stopA === stopB) return true;
  const normA = normalizeStopName(stopA);
  const normB = normalizeStopName(stopB);
  if (normA === normB) return true;
  return (
    (normA.length > 3 && normB.includes(normA)) ||
    (normB.length > 3 && normA.includes(normB))
  );
}

/**
 * Find index of a stop inside a bus's stops array
 */
export function findStopIndex(bus: BusRoute, stopName: string): number {
  return bus.stops.findIndex((s) => isSameStop(s, stopName));
}

/**
 * Find direct bus routes between origin and destination
 */
export function findDirectRoutes(fromStop: string, toStop: string): DirectTripResult[] {
  if (!fromStop || !toStop || isSameStop(fromStop, toStop)) {
    return [];
  }

  const results: DirectTripResult[] = [];

  for (const bus of BUS_ROUTES) {
    const fromIdx = findStopIndex(bus, fromStop);
    const toIdx = findStopIndex(bus, toStop);

    if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
      const isForward = fromIdx < toIdx;
      const start = Math.min(fromIdx, toIdx);
      const end = Math.max(fromIdx, toIdx);

      let intermediateStops = bus.stops.slice(start, end + 1);
      if (!isForward) {
        intermediateStops = [...intermediateStops].reverse();
      }

      results.push({
        bus,
        fromIndex: fromIdx,
        toIndex: toIdx,
        totalStops: Math.abs(toIdx - fromIdx) + 1,
        stopsInBetween: intermediateStops,
        direction: isForward ? 'forward' : 'backward',
      });
    }
  }

  // Sort by fewer stops
  return results.sort((a, b) => a.totalStops - b.totalStops);
}

/**
 * Find connecting routes with 1 transfer when no direct bus exists
 */
export function findTransferRoutes(fromStop: string, toStop: string): TransferTripResult[] {
  if (!fromStop || !toStop || isSameStop(fromStop, toStop)) {
    return [];
  }

  const transferResults: TransferTripResult[] = [];
  const processedPairs = new Set<string>();

  // Buses that pass through origin
  const firstLegBuses = BUS_ROUTES.filter((b) => findStopIndex(b, fromStop) !== -1);
  // Buses that pass through destination
  const secondLegBuses = BUS_ROUTES.filter((b) => findStopIndex(b, toStop) !== -1);

  for (const bus1 of firstLegBuses) {
    const fromIdx = findStopIndex(bus1, fromStop);

    for (const bus2 of secondLegBuses) {
      if (bus1.id === bus2.id) continue;

      const toIdx = findStopIndex(bus2, toStop);

      // Find common stops between bus1 and bus2
      for (let i = 0; i < bus1.stops.length; i++) {
        if (i === fromIdx) continue;
        const potentialTransfer = bus1.stops[i];
        const bus2TransferIdx = findStopIndex(bus2, potentialTransfer);

        if (bus2TransferIdx !== -1 && bus2TransferIdx !== toIdx) {
          const pairKey = `${bus1.id}->${potentialTransfer}->${bus2.id}`;
          if (processedPairs.has(pairKey)) continue;
          processedPairs.add(pairKey);

          const leg1Stops = bus1.stops.slice(
            Math.min(fromIdx, i),
            Math.max(fromIdx, i) + 1
          );
          if (fromIdx > i) leg1Stops.reverse();

          const leg2Stops = bus2.stops.slice(
            Math.min(bus2TransferIdx, toIdx),
            Math.max(bus2TransferIdx, toIdx) + 1
          );
          if (bus2TransferIdx > toIdx) leg2Stops.reverse();

          const totalStops = leg1Stops.length + leg2Stops.length - 1;

          transferResults.push({
            firstLeg: {
              bus: bus1,
              fromIndex: fromIdx,
              transferIndex: i,
              stops: leg1Stops,
              direction: fromIdx < i ? 'forward' : 'backward',
            },
            transferStop: potentialTransfer,
            secondLeg: {
              bus: bus2,
              transferIndex: bus2TransferIdx,
              toIndex: toIdx,
              stops: leg2Stops,
              direction: bus2TransferIdx < toIdx ? 'forward' : 'backward',
            },
            totalStops,
          });

          // Cap transfers per bus pair to avoid redundancy
          if (transferResults.length >= 10) break;
        }
      }
      if (transferResults.length >= 10) break;
    }
  }

  // Sort by total stops
  return transferResults.sort((a, b) => a.totalStops - b.totalStops).slice(0, 6);
}

/**
 * Get all buses passing through a given stop
 */
export function getBusesForStop(stopName: string): BusRoute[] {
  if (!stopName) return [];
  return BUS_ROUTES.filter((bus) => findStopIndex(bus, stopName) !== -1);
}
