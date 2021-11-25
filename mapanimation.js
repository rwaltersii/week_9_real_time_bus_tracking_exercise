// This gives you access to mapbox data
mapboxgl.accessToken =
  "pk.eyJ1IjoicndhbHRlcnNpaSIsImEiOiJja3dkeGFicjQzMGFsMnlsajJ1eGkzdTF2In0.-8-tVTdP7IyC_mTmvgeSYw";

// This generates on the screen (centered and zoomed to a specific location)
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v11",
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// This retrieves new data every 15 seconds
async function run() {
  // get bus data
  mapMarkers.forEach((marker) => marker.remove());
  const locations = await getBusLocations();
  addMarker(locations);
  // timer to get rerun the function every 15 seconds
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}
let mapMarkers = [];
function addMarker(locations) {
  for (i = 0; i <= locations.length - 1; i++) {
    var marker = new mapboxgl.Marker()
      .setLngLat([
        locations[i].attributes.longitude,
        locations[i].attributes.latitude,
      ])
      .addTo(map);
    mapMarkers.push(marker);
  }
  return mapMarkers;
}

//Function that gets the data every 15 seconds from MBTA
run();
