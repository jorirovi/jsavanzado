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
const cargarNoticias = () => {
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            const json = JSON.parse(xhr.responseText);
            console.log(json)
        }
    });

    xhr.open('GET','https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + API_KEY);
    xhr.send();
}

btn.addEventListener('click', cargarNoticias, true);
