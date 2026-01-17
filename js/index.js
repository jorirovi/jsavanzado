const xhr = new XMLHttpRequest();
const API_KEY = '8ae9539a9c5439a57658bbb0fb62e8ab';
const category = 'technology';
const d = document;

//script para el main
const txt = d.getElementById('texto');
const parr1 = d.getElementById('p1');
const parr2 = d.getElementById('p2');
const imagen = d.getElementById('imgqs');
if (txt || parr1 || parr2) {
    txt.innerHTML = "Empresa líder en soluciones 360º dentro de la industria de tecnologia, el entretenimiento y la movilidad corporativa.";
    parr1.innerHTML = "Transformamos la manera en que las <strong>empresas</strong> y <strong>emprendedores</strong> construyen su presencia digital. Somos una compañía especializada en servicios de <strong>Hosting</strong>, <strong>desarrollo web</strong>, <strong>soluciones en la nube</strong> y <strong>arquitectura tecnológica personalizada</strong>, orientada a ofrecer rendimiento, seguridad y escalabilidad en cada proyecto."
    parr2.innerHTML = "Brindar una infraestructura <strong>confiable</strong> y <strong>moderna</strong>, combinada con un equipo experto en innovación digital, para que nuestros clientes puedan enfocarse en hacer crecer su negocio mientras nosotros nos ocupamos del entorno tecnológico que lo impulsa.";
}



//script para la carga de Noticias
const indicadores = d.getElementById('indicador');
const inicioCarrusel = d.getElementById('iniciador')
try {
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300){
            const noticias = JSON.parse(xhr.responseText);
            const data = noticias.articles;
            indicadores.innerHTML = "";
            indicadores.classList.add('carousel-indicators')
            for (let i = 0; i < data.length; i++){
                const boton = d.createElement('button');
                boton.type = 'button';
                boton.dataset.bsTarget = '#carouselExampleCaptions';
                boton.dataset.bsSlideTo = i;
                boton.setAttribute('aria-label', `Slide ${i + 1}`);

                if (i === 0) {
                    boton.classList.add('active');
                    boton.setAttribute('aria-current', 'true');
                }

                indicadores.appendChild(boton);
            }
            inicioCarrusel.innerHTML = "";
            inicioCarrusel.classList.add('carousel-inner');
            for (let i = 0; i < data.length; i++){
                // contenedor de img principal
                const divContenedor = d.createElement('div');
                divContenedor.classList.add('carousel-item')
                if (i === 0) {
                    divContenedor.classList.add('active');
                }
                // imagenes
                const img = d.createElement('img');
                img.src = data[i].image || "https://picsum.dev/300/200";
                img.classList.add('d-block', 'w-100');
                img.alt = data[i].id;
                // captions
                const divCaptions = d.createElement('div')
                divCaptions.classList.add('carousel-caption', 'd-none', 'd-md-block');
                //titulo
                const h5Title = d.createElement('h5');
                h5Title.textContent = data[i].title;
                //contendo
                const pContenido = d.createElement('p');
                pContenido.textContent = data[i].description;

                divCaptions.appendChild(h5Title);
                divCaptions.appendChild(pContenido);

                divContenedor.appendChild(img);
                divContenedor.appendChild(divCaptions);

                inicioCarrusel.appendChild(divContenedor);
            }
            
        }
        else {
            console.error(xhr.status);
            notiGrid.innerHTML = '<p>No se cargron las noticias</p>'
        }
    });
    xhr.open('GET', './data/noticias.json'); //AQUI IRA EL URL DE LA API
    xhr.send();
} catch (err) {
    console.error(err);
    notiGrid.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
}
