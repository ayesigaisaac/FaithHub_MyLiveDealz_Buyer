export type DiscoverViewMode = "list" | "map";

export type DistanceFilter = "All" | "Within 3 km" | "Within 5 km" | "Within 10 km";

export type DiscoverFilters = {
  faith: string;
  denomination: string;
  language: string;
  distance: DistanceFilter;
};

export type DiscoverFilterOptions = {
  faith: string[];
  denomination: string[];
  language: string[];
  distance: DistanceFilter[];
};

export type Institution = {
  id: number;
  name: string;
  faith: string;
  denomination: string;
  language: string;
  distanceKm: number;
  verified: boolean;
  sponsored: boolean;
  nearNow: boolean;
  serviceTime: string;
  mapX: string;
  mapY: string;
  location: string;
  followers: string;
};
