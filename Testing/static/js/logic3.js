// Creating the map object
var myMap = L.map("map", {
  center: [49.246292, -123.116226],
  zoom: 13
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
// var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE.geojson";

// USE THIS LINK TO TEST without broken West Van Data:
var link = "https://zmoloci.github.io/Project-3_Dashboard/cleaned_CMHC_ZONE-noWestVan.geojson";

// Getting our GeoJSON data
d3.json(link).then(function (data) {
  // Convert coordinates to Lat/Long
  for (var i = 0; i < data.length; i++) {
    if (i == 16) { i++ };
    for (var j = 0; j < data[i].geometry.coordinates[0].length; j++) {
      // data[i].geometry.coordinates[0][j][0] = (((data[i].geometry.coordinates[0][j][1]) / 20037508.34) * 180)
      // data[i].geometry.coordinates[0][j][1] = (((data[i].geometry.coordinates[0][j][0]) / 20037508.34) * 180)
      data[i].geometry.coordinates[0][j] = [(((data[i].geometry.coordinates[0][j][1]) / 20037508.34) * 180), (((data[i].geometry.coordinates[0][j][0]) / 20037508.34) * 180)]
    };
    // console.log(data[i]);
    // L.geoJson(data, {
    //   style: function (feature) {
    //     return {
    //       color: "white",
    //       fillColor: "red",
    //       fillOpacity: 0.9,
    //       weight: 1.5
    //     };
    //   }
    // }).addTo(myMap);
  }

  // Test that data is being read
  console.log(data)

  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function (feature) {
      return {
        color: "white",
        fillColor: "red",
        fillOpacity: 0.9,
        weight: 1.5
      };
    }
  }).addTo(myMap);
  var zonePolygons = []
  for (var key in data) {
    console.log(data[key].properties.ZONENAME_E)
  }
});


// --------------------------------------------------------
// Earthquake circleMarker example from Christopher Yang:

// var earthquakes = L.geoJSON(earthquakeData, {
//   onEachFeature: onEachFeature,
//   pointToLayer: function (feature, latlng) {
// //...
// //circle marker generation
//     return L.circleMarker(latlng, {
//       color: color,
//       radius: radius,
//       opacity:0.5,
//       fillOpacity:0.5,        
//     });
//   }
// });