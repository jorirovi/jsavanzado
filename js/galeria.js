//carga de imagenes a la galeria
$(function () {
    const xhrg = new XMLHttpRequest();
    try {
        xhrg.addEventListener('readystatechange', () => {
            if (xhrg.readyState !== 4) return;
            if (xhrg.status >= 200 && xhrg.status < 300) {
                const data = JSON.parse(xhrg.responseText);
                const fotos = data.servicios;
                let serviciosBasicos = "";
                const $wrapper = $(".galery-container");
                $wrapper.empty();
                const formatoEUR = new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                });
                for (const foto of fotos){
                    const $card = $('<div>')
                        .addClass('prod-card');
                    const $img = $('<img>')
                        .addClass('prod-img')
                        .attr({
                            src: foto.url,
                            alt: foto.nombre
                        });
                    const $info = $('<div>')
                        .addClass('prod-info');
                    const $h2 = $('<h2>')
                        .addClass('prod-title')
                        .text(foto.nombre);
                    const $contp = $('<div>')
                        .css({
                            height: '210px',
                            alignContent: 'center'
                        });
                    const $p = $('<p>')
                        .addClass('prod-desc')
                        .text(foto.descripcion);
                    serviciosBasicos = foto.items.join(", ");
                    const $p2 = $('<p>')
                        .addClass('prod-desc')
                        .text("Plan Básico: " + serviciosBasicos);
                    const $p3 = $('<p>')
                        .addClass('prod-desc')
                        .text('Plan mensual desde: ' + formatoEUR.format(foto.preciomes));
                    const $boton = $('<input>')
                        .addClass('prod-presup')
                        .attr({
                            type: 'button',
                            value: 'Presupuesto'
                        });
                    $contp.append($p, $p2, $p3);
                    $info.append($h2, $contp, $boton);
                    $card.append($img, $info);
                    $wrapper.append($card);
                    serviciosBasicos = "";
                }
            } else {
                console.error('no se pudo conectar a las imagenes');
            }
        });
        xhrg.open('GET', '../data/servicios.json');
        xhrg.send();
    } catch (err) {
        console.error('no se pudo conectar a las imagenes', err);
    }
    $("#texto-vid").addClass("vtext-galeria");
    $("#texto-vid").append("Conoce nuestro catalogo de productos")
});


