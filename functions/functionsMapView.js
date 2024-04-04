const earthRadius = 6371; // radio de la tierra en kilómetros
const toRad = (value) => (value * Math.PI) / 180

const getRegion = (coords) => {
  const averageCoordinate = coords.reduce((accumulator, currentValue) => {
      return {
        latitude: accumulator.latitude + currentValue.lat,
        longitude: accumulator.longitude + currentValue.lon,
      };
    },
    { latitude: 0, longitude: 0 }
  );

  return {
    latitude: averageCoordinate.latitude / coords.length,
    longitude: averageCoordinate.longitude / coords.length,
  };
}


const maxDistance = (coords) => coords.reduce((accumulator, currentValue) => {
    const lat1 = currentValue.lat;
    const lon1 = currentValue.lon;
    const lat2 = getRegion(coords).latitude;
    const lon2 = getRegion(coords).longitude;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return Math.max(accumulator, distance);
}, 0);

export {maxDistance, getRegion}