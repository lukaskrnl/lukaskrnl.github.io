// Karte erstellen und auf eine Stadt zentrieren
var map = L.map('map').setView([51.3370, 12.3344], 13); // Lindenauer Markt

// OpenStreetMap-Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// GeoJSON-Datei laden und Polygone anzeigen
fetch('data/gebaeude.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'blue',
                    fillColor: 'lightblue',
                    fillOpacity: 0.5
                };
            },
            onEachFeature: function (feature, layer) {
                var props = feature.properties;
                var popupContent = `
                    <h3>${props.name}</h3>
                    <p><strong>Baujahr:</strong> ${props.baujahr}</p>
                    <p><strong>Bewohner:</strong> ${props.bewohner.join(', ')}</p>
                    <p><strong>Geschäfte:</strong> ${props.geschaefte.join(', ')}</p>
                    <p>${props.historie}</p>
                `;
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));
