// Karte erstellen und auf eine Stadt zentrieren
var map = L.map('map').setView([51.3370, 12.3344], 16); // Lindenauer Markt

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Funktion zur Farbzuweisung basierend auf dem Baujahr
function getColor(baujahr) {
    if (!baujahr || isNaN(baujahr)) return '#808080'; // Grau für fehlende Werte
    return baujahr < 1800 ? '#8B0000' :  // Dunkelrot für Gebäude vor 1800
           baujahr < 1900 ? '#FF4500' :  // Orange für 1800–1899
           '#32CD32';                    // Grün für 1900 und neuer
}

// GeoJSON-Datei laden und auf die Karte bringen
fetch('data/gebaeude.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                var baujahr = parseInt(feature.properties.Baujahr, 10); // Baujahr als Zahl
                return {
                    color: 'black',
                    fillColor: getColor(baujahr),
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function (feature, layer) {
                var props = feature.properties;
                var gebaeudeID = props.ID;
                var popupContent = `
                    <h3>${props.Adresse ? props.Adresse : "Unbekannt"}</h3>
                    <p><strong>Baujahr:</strong> ${props.Baujahr ? props.Baujahr : "Unbekannt"}</p>
                    <a href="ID-${gebaeudeID}.html" target="_blank">Mehr erfahren</a>
                `;
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));
