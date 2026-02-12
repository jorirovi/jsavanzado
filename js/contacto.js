const map = L.map('map').setView([40.49619,-3.67486],17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; eHostingCO'
}).addTo(map);