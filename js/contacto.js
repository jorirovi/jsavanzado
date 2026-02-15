//Constantes y Variables
const navegacion = navigator.geolocation;
const ehostincoLtd = 40.466656;
const ehostincoLgn = -3.804888;
const d = document;
const dirEH =  'C. de Basauri, 17, Moncloa - Aravaca, 28023 Madrid'
const telEH = '+34 911 555 555'
const emailEH = 'info@ehostingco.es'

//video contacto
const contVideo = d.getElementById('v-cont');
const video = d.createElement("video");
video.autoplay = true;
video.muted = true;
video.loop = true;
video.classList.add('vid-cont');
const fuente = d.createElement('source');
fuente.src = '../assets/video/contacto_2160_3840_25fps.mp4';
fuente.type = 'video/mp4';
video.appendChild(fuente);
contVideo.appendChild(video);

//datos del contacto
const contTexto = d.getElementById('d-cont');
//titulo
const contSubTitulo = d.createElement('div');
contSubTitulo.classList.add('titulo-contacto')
const subTitulo = d.createElement('h2');
subTitulo.textContent = 'Contactanos:'
contSubTitulo.appendChild(subTitulo);
contTexto.appendChild(contSubTitulo);
//contacto
const contDatosContacto = d.createElement('div');
contDatosContacto.classList.add('texto-contacto');
const direccion = d.createElement('h3');
direccion.textContent = 'Direccion:';
const pContactoD = d.createElement('p');
pContactoD.textContent = dirEH;
const telefono = d.createElement('h3');
telefono.textContent = "Teléfono:"
const pContactoT = d.createElement('p');
pContactoT.textContent = telEH;
const email = d.createElement('h3');
email.textContent = 'Email:'
const pContactoE = d.createElement('p');
pContactoE.textContent = emailEH;
//mostrar
contDatosContacto.appendChild(direccion);
contDatosContacto.appendChild(pContactoD);
contDatosContacto.appendChild(telefono);
contDatosContacto.appendChild(pContactoT);
contDatosContacto.appendChild(email);
contDatosContacto.appendChild(pContactoE);
contTexto.appendChild(contDatosContacto);

//
const ehIcon = L.icon({
    iconUrl: '../assets/img/EH_icon.png',
    iconSize: [38,95],
    iconAnchor: [22,94],
    popupAnchor: [-3, -76]
})
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos){
    const crd = pos.coords;
    const latitud = crd.latitude;
    const longitud = crd.longitude;
    const map = L.map('map', {
        center:[latitud,longitud],
        zoom: 5
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; eHostingCO'}).addTo(map);
    
    L.Routing.control({
        waypoints: [
            L.latLng(latitud,longitud),
            L.latLng(ehostincoLtd, ehostincoLgn)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps) {
            switch(i){
                case 0:
                    return L.marker(wp.latLng).bindPopup('Inicio');
                case nWps-1:
                    return L.marker(wp.latLng, {icon: ehIcon}).bindPopup(`eHostngCO<br>Tlf: ${telEH}<br>Email: ${emailEH}`);
            }
        }
    }).addTo(map);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    const map = L.map('map').setView([ehostincoLtd, ehostincoLgn],13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; eHostingCO'
    }).addTo(map);

    const marker = L.marker([ehostincoLtd, ehostincoLgn]).addTo(map);
    marker.bindPopup(`<b>Contacta con Nosotros</b>:<br>eHostingCO<br><b>Tlf</b>: ${telEH}<br><b>Email</b>: ${emailEH}<br><b>Dir</b>: ${dirEH}`).openPopup();

    const popup = L.popup();

    function onMapClick(e){
        popup
            .setLatLng(e.latlng)
            .setContent("Hiciste clic aquí: " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick)
}

if (navegacion){
    navegacion.getCurrentPosition(
        success,
        error,
        options
    );
}