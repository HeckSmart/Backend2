/**
 * Haversine distance in km between two lat/lng points.
 */
export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Sort an array of items with lat/lng by distance from a point (ascending).
 */
export function sortByDistanceFrom<T extends { latitude: number; longitude: number }>(
  items: T[],
  fromLat: number,
  fromLng: number
): Array<T & { distanceKm: number }> {
  return items
    .map((item) => ({
      ...item,
      distanceKm: haversineDistanceKm(fromLat, fromLng, item.latitude, item.longitude),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
