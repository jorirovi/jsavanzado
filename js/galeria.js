//carga de imagenes a la galeria
$(document).ready(() => {
    const xhrg = new XMLHttpRequest();
    try {
        xhrg.addEventListener('readystatechange', () => {
            if (xhrg.readyState !== 4) return;
            if (xhrg.status >= 200 && xhrg.status < 300) {
                const galeria = JSON.parse(xhrg.responseText);
                const fotos = galeria.imagenes;
                console.log(fotos);
                for (const foto of fotos) {
                    const $img = `<img src="${foto.url}" alt="${foto.nombre}" height="100%" width="300px">`
                    $("#galeria").append($img);
                }
            } else {
                console.error('no se pudo conectar a las imagenes');
            }
        });
        xhrg.open('GET', '../data/galeria.json');
        xhrg.send();
    } catch (err) {
        console.error('no se pudo conectar a las imagenes', err);
    }
    $("#texto-vid").addClass("vtext-galeria");
    $("#texto-vid").append("Conoce nuestro catalogo de productos")
    $(".section1-galeria").append(textoGal);
});
