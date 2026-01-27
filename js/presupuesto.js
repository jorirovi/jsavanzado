//Script para la pagina de presupuesto
//Inicializamos variables
const connect = new XMLHttpRequest();
let serviciosAdicionales = [];
let servicios = [];
let planesAcumulador = 0

//en este fildset estara el combobox servicio
const $servicios = $('#servicios');
const $legendS = $('<legend>')
    .text('Servicios');
const $selectS = $('<select>')
    .attr({
        id: 'servicio',
        name: 'servicio'
    });
$selectS.append(
    $('<option>', {
        value: '',
        text: 'Seleccione un servicio',
        disabled: true,
        selected: true
    })
);
$servicios.append($legendS, $selectS);
//conexion AJAX a JSON de los datos
try {
    connect.addEventListener('readystatechange', () => {
        if(connect.readyState !== 4) return;
        if(connect.status >= 200 && connect.status < 300) {
            const result = JSON.parse(connect.responseText);
            //const data = result.servicios;
            servicios = result.servicios;
            serviciosAdicionales = result.planes_adicionales
            servicios.forEach(item => {
                $selectS.append(
                $('<option>', {
                    value: item.id,
                    text: item.nombre
                }));
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

//al seleccionar un item del combobox de servicio
$selectS.on('change', function() {
    const $plazos = $("#plazos");
    $plazos.empty().removeClass("ocultar")
    const $legendP = $("<legend>")
        .text("Plazo del Contrato");
    const $labelPm = $('<label>');
    const $inpMes = $('<input>');
    $inpMes.attr({
        type: 'number',
        min: 1,
        max: 24,
        title: 'Debe contener de 1 a 24 meses',
        step: 1,
        required: true
    });
    $labelPm.append('Indique la cantidad de meses')
    $plazos.append($legendP, $labelPm, $inpMes);
    const aditionalPlans = serviciosAdicionales.find(s => s.idservicio === parseInt($(this).val()));
    const $plans = $('#planes')
    $plans.empty().removeClass('ocultar');
    const $legengPlans = $("<legend>");
    $legengPlans.text('Planes Adicionales')
    $plans.append($legengPlans);
    const idSrv = aditionalPlans.idservicio; 
    const $disp = $('<input>');
    aditionalPlans.items.forEach(item => {
        const $checkLabel = $("<label>");
        const $cheks = $("<input>")
            .attr({
                type: "checkbox",
                name: "planes",
                value: item.id,
                cost: item.costM
            });
        $disp.attr({
                type: 'number',
                min: 2,
                max: 99,
                required: true,
                title: 'debe seleccionar un numero entre 2 y 99',
                step: 1
            }).addClass('ocultar');
        if (item.id === 1) {
            $checkLabel.append($cheks, item.nombre, $disp);
        } else {
            $checkLabel.append($cheks, item.nombre);
        }
        $plans.append($checkLabel);
    });
    //control para el marcada y desmarcado de cheksbox
    $plans.off('change', 'input[type="checkbox"][name="planes"]');
    $plans.on('change', 'input[type="checkbox"][name="planes"]', function(){
        const id = $(this).val();
        if ($(this).is(':checked')){
            if ((String(idSrv) === "1") && (String(id) === "1")) {
                $disp.removeClass('ocultar');
            }
            planesAcumulador += parseFloat($(this).attr('cost'));
            console.log('Acumulado: ', planesAcumulador);
        } else {
            if(String(id) === "1") {
                $disp.addClass('ocultar');
            }
            planesAcumulador -= parseFloat($(this).attr('cost'));
            console.log('Acomulado: ', planesAcumulador);
        }
    });
});