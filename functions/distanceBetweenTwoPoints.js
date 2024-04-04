const R = 6371 * 1000;

function toRadians(degree) {
    return degree * (Math.PI / 180);
}

function distanceBetweenTwoPoints(lat1, lon1, lat2, lon2) {
    // convertir coordenadas a radianes
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
  
    // distancia entre las latitudes y longitudes
    let dLat = lat2 - lat1;
    let dLon = lon2 - lon1;
  
    // calcular la distancia en kilómetros
    let a = Math.pow(Math.sin(dLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon/2), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = R * c;
    
    return distance;
}
  
export default distanceBetweenTwoPoints