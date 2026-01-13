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
            } else {
                console.error('no se pudo conectar a las imagenes');
            }
        });
        xhrg.open('GET', '../data/galeria.json');        xhrg.send();
    } catch (err) {
        console.error('no se pudo conectar a las imagenes', err);
    }
    $("#texto-vid").addClass("vtext-galeria");
    $("#texto-vid").append("Conoce nuestro catalogo de productos")
    $(".section1-galeria").append(textoGal);
});

//siper plugin script
const swiper = new Swiper('.tarjeta-wrapper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  spaceBetween: 16,

  // pagination bullets
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  breakpoints: {
    700: { slidesPerView: 1 },
    1024: { slidesPerView: 3 },
  },
});
