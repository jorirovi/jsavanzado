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
            url: `${base}/views/presupuesto.html`
        },
        {
            titulo: "Contacto",
            url: "#"
        }
    ];
    //Script para carga de menu
    const $menu = $(".mimenu");
    for(let i = 0; i < itemsMenu.length; i++) {
        const $li = $("<li>");
        const $a = $("<a>");
        $a.addClass("ancla");
        $a.attr({
            href: itemsMenu[i].url
        });
        $a.text(itemsMenu[i].titulo)
        $li.append($a);
        $menu.append($li);
    }
    const itemsFooter = [
        {
            id: "whatsapp",
            ico: "fa-brands fa-whatsapp iuno",
            url: "#"
        },
        {
            id: "instagram",
            ico: "fa-brands fa-instagram idos",
            url: "#"
        },
        {
            id: "facebook",
            ico: "fa-brands fa-facebook itres",
            url: "#"
        },
        {
            id: "x",
            ico: "fa-brands fa-x icuatro",
            url: "#"
        }
    ];
    
    for(let i = 0; i < itemsFooter.length; i++){
        $(".iconos").append(`<i class="${itemsFooter[i].ico}"></i>`)
    };
    $("#empresa").append(empresa)
    $("#derechos").append("Todos los derechos reservados &copy; 2026")
});