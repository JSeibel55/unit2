/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map;

//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData();
};

//function to retrieve the data and place it on the map
function getData(){
    //load the data
    $.getJSON("data/MegaCities.geojson", function(response){
        //create marker options
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        //create a Leaflet GeoJSON layer and add it to the map
        L.geoJson(response, {
            pointToLayer: function (feature, latlng){
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            onEachFeature: function onEachFeature(feature, layer) {
                //no property named popupContent; instead, create html string with all properties
                var popupContent = "";
                if (feature.properties) {
                    //loop to add feature property names and values to html string
                    for (var property in feature.properties){
                        popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
                    }
                    layer.bindPopup(popupContent);
                };
            }
        }).addTo(map);
    });
};

$(document).ready(createMap);