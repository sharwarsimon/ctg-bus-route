export type BusType = 'normal' | 'mini' | 'large' | 'special';

export interface BusRoute {
  id: string;
  name: string;
  number: string;
  type: BusType;
  badge: string;
  color: string;
  accentColor: string;
  startPoint: string;
  endPoint: string;
  stops: string[];
  description?: string;
}

export interface StopWithBuses {
  name: string;
  buses: {
    busId: string;
    busName: string;
    busNumber: string;
    badge: string;
    color: string;
  }[];
}

export interface DirectTripResult {
  bus: BusRoute;
  fromIndex: number;
  toIndex: number;
  totalStops: number;
  stopsInBetween: string[];
  direction: 'forward' | 'backward';
}

export interface TransferTripResult {
  firstLeg: {
    bus: BusRoute;
    fromIndex: number;
    transferIndex: number;
    stops: string[];
    direction: 'forward' | 'backward';
  };
  transferStop: string;
  secondLeg: {
    bus: BusRoute;
    transferIndex: number;
    toIndex: number;
    stops: string[];
    direction: 'forward' | 'backward';
  };
  totalStops: number;
}
