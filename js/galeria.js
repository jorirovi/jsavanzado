//carga de imagenes a la galeria
$(function () {
    const xhrg = new XMLHttpRequest();
    try {
        xhrg.addEventListener('readystatechange', () => {
            if (xhrg.readyState !== 4) return;
            if (xhrg.status >= 200 && xhrg.status < 300) {
                const data = JSON.parse(xhrg.responseText);
                const fotos = data.imagenes;
                const $wrapper = $(".tarjeta-lista.swiper-wrapper");
                $wrapper.empty();
                for (const foto of fotos){
                    $wrapper.append(`
                        <li class="tarjeta-items swiper-slide">
                            <div class="tarjeta-link">
                                <img src="${foto.url}" alt="${foto.nombre}" class="tarjeta-img">
                                <p class="referencia-img">${foto.nombre}</p>
                                <h2 class="tarjeta-titulo">${foto.descripcion}</h2>
                                <button class="tarjeta-boton material-symbols-rounded">arrow_forward</button>
                            </div>
                        </li>    
                    `);  
                }
                // Inicializa Swiper DESPUÉS de crear los slides
                new Swiper(".tarjeta-wrapper", {
                    direction: "horizontal",
                    loop: true,
                    spaceBetween: 16,
                    autoplay: { delay: 5000 },
                    pagination: { el: ".swiper-pagination", clickable: true },
                    //navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                    slidesPerView: 1,
                    breakpoints: {
                        700: { slidesPerView: 1 },
                        1200: { slidesPerView: 3 },
                    },
                });  
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
});


