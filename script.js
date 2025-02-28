// Karte erstellen und auf eine Stadt zentrieren
var map = L.map('map').setView([51.3370, 12.3344], 13); // Lindenauer Markt

// OpenStreetMap-Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Funktion zur Farbgebung je nach Baujahr
function getColor(baujahr) {
    return baujahr < 1800 ? '#8B0000' :  // Dunkelrot für Gebäude vor 1800
           baujahr < 1900 ? '#FF4500' :  // Orange für 1800–1899
           '#32CD32';                    // Grün für 1900 und neuer
}

// GeoJSON mit Multipolygonen laden
fetch('data/gebaeude.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'black',
                    fillColor: getColor(feature.properties.baujahr),
                    fillOpacity: 0.6,
                    weight: 1
                };
            },
            onEachFeature: function (feature, layer) {
                var props = feature.properties;
                var popupContent = `
                    <h3>Adresse: ${props.adresse}</h3>
                    <p><strong>Baujahr:</strong> ${props.baujahr}</p>
                `;
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));

