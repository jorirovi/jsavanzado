const xhr = new XMLHttpRequest();
const API_KEY = '8ae9539a9c5439a57658bbb0fb62e8ab';
const category = 'technology';
const d = document;
//script para el main
const btn = d.getElementById('noticias');
const txt = d.getElementById('texto');
const parr1 = d.getElementById('p1');
const parr2 = d.getElementById('p2');
const imagen = d.getElementById('imgqs');
txt.textContent = "Empresa líder en soluciones 360º dentro de la industria de tecnologia, el entretenimiento y la movilidad corporativa.";
parr1.innerHTML = "Transformamos la manera en que las <strong>empresas</strong> y <strong>emprendedores</strong> construyen su presencia digital. Somos una compañía especializada en servicios de <strong>Hosting</strong>, <strong>desarrollo web</strong>, <strong>soluciones en la nube</strong> y <strong>arquitectura tecnológica personalizada</strong>, orientada a ofrecer rendimiento, seguridad y escalabilidad en cada proyecto."
parr2.innerHTML = "Brindar una infraestructura <strong>confiable </strong>y <strong>moderna</strong>, combinada con un equipo experto en innovación digital, para que nuestros clientes puedan enfocarse en hacer crecer su negocio mientras nosotros nos ocupamos del entorno tecnológico que lo impulsa.";
//script para la carga de Noticias
const notiGrid = d.getElementById('notigrid');
try {
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300){
            const noticias = JSON.parse(xhr.responseText);
            notiGrid.innerHTML = noticias.articles.map(noticia => {
                const notiimg    = noticia.image || "https://picsum.dev/300/200";
                const notititulo = noticia.title ?? "Sin Titulo";
                const notidesc   = noticia.description ?? "";
                const notiurl    = noticia.url ?? "";
                return `
                    <article class="noti-cards">
                        <img src="${notiimg}" alt="${notititulo}"></img>
                        <div class="contenido">
                            <h3>${notititulo}</h3>
                            <p>${notidesc}</p>
                            <a href="${notiurl}" target="_blank" rel="noopener noreferrer">Ver Noticia</a>
                        </div>
                    </article>
                `
            }).join("");
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
