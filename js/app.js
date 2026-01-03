const xhr = new XMLHttpRequest();
const API_KEY = '8ae9539a9c5439a57658bbb0fb62e8ab';
const category = 'technology';
const d = document;
const btn = d.getElementById('noticias');

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
