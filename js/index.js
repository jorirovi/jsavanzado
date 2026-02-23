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
            const data = JSON.parse(xhr.responseText);
            const noticias = data.articles;
            //Section Principal
            const $galeria = d.getElementById("galeria");
            const frag = d.createDocumentFragment();

            noticias.forEach((n) => {
                //CARD
                const card = d.createElement("article");
                card.classList.add('card-noticia');
                //imagen
                const img= d.createElement('img');
                img.classList.add('card-img');
                img.src = n.image;
                img.alt = n.id;
                img.loading = "lazy";
                //titulo
                const h3 = d.createElement('h3');
                h3.classList.add('card-titulo');
                h3.textContent = n.title
                //Link
                const a = d.createElement("a");
                a.classList.add("card-link");
                a.href = n.url || "#";
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = "Leer más";
                // Armar Card
                card.append(img, h3, a);
                frag.appendChild(card);
            });
            $galeria.innerHTML = "" //limpiar el dom
            $galeria.appendChild(frag);
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
