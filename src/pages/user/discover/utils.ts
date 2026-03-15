import type { DiscoverFilters, Institution } from "@/pages/user/discover/types";

function matchesDistanceFilter(distanceKm: number, distanceFilter: DiscoverFilters["distance"]) {
  if (distanceFilter === "All") return true;
  if (distanceFilter === "Within 3 km") return distanceKm <= 3;
  if (distanceFilter === "Within 5 km") return distanceKm <= 5;
  return distanceKm <= 10;
}

export function filterDiscoverInstitutions(
  institutions: Institution[],
  search: string,
  filters: DiscoverFilters,
) {
  const searchQuery = search.trim().toLowerCase();

  return institutions.filter((institution) => {
    const matchesSearch =
      searchQuery.length === 0 ||
      institution.name.toLowerCase().includes(searchQuery) ||
      institution.location.toLowerCase().includes(searchQuery);

    const matchesFaith = filters.faith === "All" || institution.faith === filters.faith;
    const matchesDenomination =
      filters.denomination === "All" || institution.denomination === filters.denomination;
    const matchesLanguage =
      filters.language === "All" || institution.language === filters.language;
    const matchesDistance = matchesDistanceFilter(institution.distanceKm, filters.distance);

    return (
      matchesSearch &&
      matchesFaith &&
      matchesDenomination &&
      matchesLanguage &&
      matchesDistance
    );
  });
}

export function getNearbyNowInstitutions(institutions: Institution[]) {
  return institutions.filter((institution) => institution.nearNow);
}

export function getActiveFilterCount(filters: DiscoverFilters) {
  let count = 0;
  if (filters.faith !== "All") count += 1;
  if (filters.denomination !== "All") count += 1;
  if (filters.language !== "All") count += 1;
  if (filters.distance !== "Within 10 km") count += 1;
  return count;
}
