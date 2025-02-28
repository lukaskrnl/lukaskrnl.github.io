// Karte erstellen und auf eine Stadt zentrieren
var map = L.map('map').setView([52.5200, 13.4050], 13); // Berlin als Beispiel

// OpenStreetMap Layer hinzufügen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Gebäudedaten aus JSON laden und Marker setzen
fetch('data/gebaeude.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(gebaeude => {
            L.marker([gebaeude.lat, gebaeude.lon])
                .addTo(map)
                .bindPopup(`<h3>${gebaeude.name}</h3><p>${gebaeude.historie}</p>`);
        });
    })
    .catch(error => console.error('Fehler beim Laden der Gebäudedaten:', error));
