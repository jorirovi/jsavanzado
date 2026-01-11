//script Menu y footer
$(document).ready(function () {
    //Cargar el Iciono
    const empresa = "eHostingCO"
    $("#icono").append(empresa);
    const enVistas = window.location.pathname.includes("/views/")
    const base = enVistas ? ".." : "."
    const itemsMenu = [
        {
            titulo: "Inicio",
            url: `${base}/index.html`
        },
        {
            titulo: "Galeria",
            url: `${base}/views/galeria.html`
        },
        {
            titulo: "Presupuesto",
            url: "#"
        },
        {
            titulo: "Contacto",
            url: "#"
        }
    ];
    //Script para carga de menu
    for(let i = 0; i < itemsMenu.length; i++) {
        $(".mimenu").append($(`<li><a class='ancla' href="${itemsMenu[i].url}">${itemsMenu[i].titulo}</a></li>`))
    }
    const itemsFooter = [
        {
            id: "whatsapp",
            ico: "fa-brands fa-whatsapp iuno"
        },
        {
            id: "instagram",
            ico: "fa-brands fa-instagram idos"
        },
        {
            id: "facebook",
            ico: "fa-brands fa-facebook itres"
        },
        {
            id: "x",
            ico: "fa-brands fa-x icuatro"
        }
    ];
    for(let i = 0; i < itemsFooter.length; i++){
        $(".iconos").append(`<i class="${itemsFooter[i].ico}"></i>`)
    };
    $("#empresa").append(empresa)
    $("#derechos").append("Todos los derechos reservados &copy; 2026")
});