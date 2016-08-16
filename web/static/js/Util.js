

export function getDistance(p1, p2) {
  var rad = function(x) {
    return x * Math.PI / 180;
  };

  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lon - p1.lon);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
  Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return (d/1609).toFixed(1); // returns the distance in miles
}

export const devMode = false;
export const googleAnalyticsDevID = 'UA-80434919-1';
export const googleAnalyticsProdID = 'UA-80733038-1';

export const cities = [ 
          {name: "Agoura Hills, CA"}, 
          {name: "Alhambra, CA"},
          {name: "Arcadia, CA"}, 
          {name: "Artesia, CA"}, 
          {name: "Azusa, CA"}, 
          {name: "Baldwin Park, CA"}, 
          {name: "Bell, CA"},
          {name: "Bell Gardens, CA"},
          {name: "Bellflower, CA"},
          {name: "Beverly Hills, CA"},
          {name: "Boyle Heights, CA"},
          {name: "Burbank, CA"}, 
          {name: "Calabasas, CA"}, 
          {name: "Canoga Park, CA"}, 
          {name: "Carson, CA"},
          {name: "Cerritos, CA"},
          {name: "Chatsworth, CA"},
          {name: "City of Industry, CA"},
          {name: "Claremont, CA"},
          {name: "Commerce, CA"}, 
          {name: "Compton, CA"}, 
          {name: "Covina, CA"},
          {name: "Cudahy, CA"},
          {name: "Culver City, CA"},
          {name: "Diamond Bar, CA"}, 
          {name: "Downey, CA"}, 
          {name: "Duarte, CA"},
          {name: "East Los Angeles, CA"},
          {name: "El Monte, CA"},
          {name: "El Segundo, CA"},
          {name: "Encino, CA"},
          {name: "Gardena, CA"},
          {name: "Glendale, CA"}, 
          {name: "Glendora, CA"}, 
          {name: "Hawaiian Gardens, CA"}, 
          {name: "Hawthorne, CA"},
          {name: "Hermosa Beach, CA"}, 
          {name: "Highland Park, CA"}, 
          {name: "Hollywood, CA"}, 
          {name: "Huntington Park, CA"},
          {name: "Inglewood, CA"}, 
          {name: "Irwindale, CA"}, 
          {name: "La Mirada, CA"},
          {name: "La Puente, CA"}, 
          {name: "La Verne, CA"}, 
          {name: "Lakewood, CA"},
          {name: "Lancaster, CA"}, 
          {name: "Lawndale, CA"},
          {name: "Lennox, CA"},
          {name: "Lomita, CA"},
          {name: "Long Beach, CA"},
          {name: "Los Angeles, CA"},
          {name: "Lynwood, CA"}, 
          {name: "Manhattan Beach, CA"},
          {name: "Maywood, CA"},
          {name: "Mission Hills, CA"},
          {name: "Monrovia, CA"}, 
          {name: "Montebello, CA"},
          {name: "Monterey Park, CA"}, 
          {name: "Newhall, CA"}, 
          {name: "North Hills, CA"}, 
          {name: "North Hollywood, CA"}, 
          {name: "Northridge, CA"}, 
          {name: "Norwalk, CA"}, 
          {name: "Pacoima, CA"}, 
          {name: "Palmdale, CA"}, 
          {name: "Palos Verdes Estates, CA"}, 
          {name: "Panorama City, CA"},
          {name: "Paramount, CA"},
          {name: "Pasadena, CA"},
          {name: "Pico Rivera, CA"},
          {name: "Playa Vista, CA"},
          {name: "Pomona, CA"}, 
          {name: "Rancho Palos Verdes, CA"}, 
          {name: "Redondo Beach, CA"}, 
          {name: "Reseda, CA"}, 
          {name: "Rolling Hills Estates, CA"},
          {name: "Rosemead, CA"},
          {name: "San Dimas, CA"}, 
          {name: "San Fernando, CA"},
          {name: "San Gabriel, CA"},
          {name: "San Marino, CA"},
          {name: "San Pedro, CA"},
          {name: "Santa Clarita, CA"}, 
          {name: "Santa Fe Springs, CA"},
          {name: "Santa Monica, CA"}, 
          {name: "Saugus, CA"}, 
          {name: "Sherman Oaks, CA"}, 
          {name: "Signal Hill, CA"}, 
          {name: "Silver Lake, CA"}, 
          {name: "South Gate, CA"},
          {name: "Sun Valley, CA"},
          {name: "Sunland, CA"},
          {name: "Tarzana, CA"},
          {name: "Temple City, CA"},
          {name: "Torrance, CA"}, 
          {name: "Valencia, CA"}, 
          {name: "Van Nuys, CA"}, 
          {name: "Venice, CA"},
          {name: "Vernon, CA"}, 
          {name: "Walnut, CA"}, 
          {name: "Walnut Park, CA"}, 
          {name: "West Covina, CA"},
          {name: "West Hollywood, CA"},
          {name: "Westchester, CA"},
          {name: "Westlake Village, CA"},
          {name: "Whittier, CA"}
          {name: "Wilmington, CA"}
        ];