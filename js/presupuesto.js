//Script para la pagina de presupuesto
//Inicializamos variables
const connect = new XMLHttpRequest();
let serviciosAdicionales = [];
try {
    connect.addEventListener('readystatechange', () => {
        if(connect.readyState !== 4) return;
        if(connect.status >= 200 && connect.status < 300) {
            const result = JSON.parse(connect.responseText);
            const data = result.servicios;
            serviciosAdicionales = result.planes_adicionales
            data.forEach(element => {
                const opt = new Option(element.nombre, element.id);
                frmpresupuesto.servicio.options[frmpresupuesto.servicio.options.length] = opt
            });
        }
        else {
            console.error('No se pudo obtener Datos')
        }
    })
    connect.open('GET', '../data/servicios.json');
    connect.send();
} catch (err) {
    console.error('Error al cargar Datos', err);
}

function cleanDOM(){
    const $plazos = $("#plazos");
    $plazos.empty().addClass("ocultar");
    const $planes = $("#planes");
    $planes.empty().addClass("ocultar");
}

function seleccionaServicio(id){
    const $plazos = $("#plazos");
    $plazos.empty().removeClass("ocultar")
    const $legendP = $("<legend>")
        .text("Plazo del Contrato");
    const $labelPm = $('<label>');
    const $labelPa = $('<label>');
    const $radioM = $("<input>")
        .attr({
            type: 'radio',
            name: 'plazo',
            value: 'mensual'
        });
    const $radioA = $("<input>")
        .attr({
            type: 'radio',
            name: 'plazo',
            value: 'Anual'
        });
    $labelPm.append($radioM).append(' Mensual')
    $labelPa.append($radioA).append(' Anual')
    $plazos.append($legendP, $labelPm, $labelPa);
    const aditionalPlans = serviciosAdicionales.find(s => s.idservicio === parseInt(id));
    const $plans = $('#planes')
    $plans.empty().removeClass('ocultar');
    const $legengPlans = $("<legend>");
    $legengPlans.text('Planes Adicionales')
    aditionalPlans.items.forEach(item => {
        const $checkLabel = $("<label>");
        const $cheks = $("<input>")
            .attr({
                type: "checkbox",
                name: "planes",
                value: item.id
            });
        $checkLabel.append($cheks).append(item.nombre);
        $plans.append($legengPlans, $checkLabel);
    });
}
