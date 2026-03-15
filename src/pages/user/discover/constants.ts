import type { DiscoverFilterOptions, DiscoverFilters } from "@/pages/user/discover/types";

export const discoverFilterOptions: DiscoverFilterOptions = {
  faith: ["All", "Christianity", "Islam", "Judaism", "Buddhism", "Hinduism"],
  denomination: [
    "All",
    "Catholic",
    "Pentecostal",
    "Muslim Community",
    "Interfaith",
    "Undisclosed",
  ],
  language: ["All", "English", "Arabic", "French", "Swahili"],
  distance: ["All", "Within 3 km", "Within 5 km", "Within 10 km"],
};

export const defaultDiscoverFilters: DiscoverFilters = {
  faith: "All",
  denomination: "All",
  language: "All",
  distance: "Within 10 km",
};
