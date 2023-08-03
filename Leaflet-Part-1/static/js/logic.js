console.log("working")

// Create the base street TILE LAYER that will be the background of the map.
let myMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the map object with options.
let map = L.map("map", {
    center: [38.50, -96.00],
    zoom: 3,
    layers:[topo,myMap]
});
myMap.addTo(map)

// console.log()
let baseMaps ={
    "Basic Map": myMap,
    Topography: topo
};

// Add tectonic plate layer.
let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();
let overlays = {
    "Tectonic Plates": tectonicplates,
    Earthquakes: earthquakes
};

// Make a call that retrieves and inserts the earthquake geoJSON data.
L.control
        .layers(baseMaps, overlays)
        .addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then(function (data) {
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.map),
            stroke: true,
            weight: 0.5
        };
    }

console.log(earthquakes);

// Return the style data for each of the earthquakes plotted on the map. 
// Pass the magnitude of the earthquake into two separate functions to calculate the color and radius.
    function getColor(depth) {
        switch (true){
            case depth > 90:
                return "#ea2c2c";
            case depth > 70:
                return "#ea822c";
            case depth > 50:
                return "#ee9c00";
            case depth > 30:
                return "#eecc00";
            case depth > 10:
                return "#d4ee00";
            default:
                return "#98ee00";
        }
    }
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
        }

// Add a GeoJSON layer to the map once the file is loaded.
// Turn each feature into a circleMarker on the map.
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
// We set the style for each circleMarker using the styleInfo function.
    style: styleInfo,

// Create a popup for each marker to display the magnitude and location
// of the earthquake after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "Magnitude: "
            +feature.properties.mag
            +"<br>Depth: "
            +feature.geometry.coordinates[2]
            +"<br>Location: "
            +feature.properties.place
        );
    }
}).addTo(earthquakes);
earthquakes.addTo(map);

// This function determines the color of the marker based on the magnitude of the earthquake.
    let legend =L.control({
        position: "bottomright"
    });
    legend.onAdd= function(){
        let div = L.DomUtil.create("div", "info legend");
        let magnitudes = [-10, 10, 30, 50, 70, 90];
        let colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"];
// Looping through our intervals to generate a label with a colored square
// for each interval. Then return a div.          
        for (let i = 0; i < magnitudes.length; i++) {
            div.innerHTML += "<i style='background: "
                +colors[i]
                +" '></i>"
                +magnitudes[i]
                +(magnitudes[i+1] ? "&ndash;" +magnitudes[i+1]+ "<br>" : "+");
        }
        return div;
    };
    legend.addTo(map);

// Retrieve tectonic plate JSON data
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
        L.geoJson(platedata, {
            color: "orange",
            weight: 2
        }).addTo(tectonicplates);
        tectonicplates.addTo(map);
    });
});