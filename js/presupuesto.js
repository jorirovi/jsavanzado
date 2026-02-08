//Script para la pagina de presupuesto
import validacionContacto from "./validaciones.js";

//Inicializamos variables
const d = document;
const connect = new XMLHttpRequest();
let serviciosAdicionales = [];
let servicios = [];
let planesAcumulador = 0;
let totalPlan = 0;
let totalConDescuento = 0;
const descuentos = [
    "De 1 a 5 meses 0% de descuento sobre el costo del servicio",
    "De 6 a 11 meses 10% de descuento sobre el costo del servicio",
    "De 12 a 19 meses 20% de descuento sobre el costo del servicio",
    "De 20 a 24 meses 30% de descuento sobre el costo del servicio"
]
//validaciones
d.addEventListener('DOMContentLoaded', (e) => {
    validacionContacto();
})

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
$servicios.addClass('servicios');
$servicios.append($legendS, $selectS);
//conexion AJAX al JSON de los datos
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

//Formato de Moneda para los precios
const formatoEUR = new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                });

//funcion para limpiar el DOM
function cleanDOM(){
    const $plazos = $("#plazos");
    $plazos.empty().removeClass('plazos').addClass("ocultar");
    const $planes = $("#planes");
    $planes.empty().removeClass('planes').addClass("ocultar");
}

//Ejecucion del boton de reset
d.getElementById('limpiar').addEventListener('click', cleanDOM);

//funcion recalcular plan
function recalcularPrecioPlan(valor = 0) {
    let porcetajeDescuento = 0;
    const meses = parseInt(valor);
    if (meses >= 6 && meses < 12) porcetajeDescuento = 0.1; //10%
    else if(meses >= 12 && meses < 20) porcetajeDescuento = 0.2 //20%
    else if(meses >= 20) porcetajeDescuento = 0.3; //30%
    totalConDescuento = totalPlan - (totalPlan * porcetajeDescuento);
    $totalPlan.val(totalConDescuento);
    $presuTotal.val(parseFloat(totalConDescuento + planesAcumulador));
}
//funcion para calcular el total del presupuesto
function calcularTotalPresupuesto() {
    let precioTotal = 0;
    precioTotal = totalConDescuento + planesAcumulador;
    return formatoEUR.format(precioTotal);
}

//totales
const $totalesLegend = $('<legend>').text('Totales');
const $totalLabel = $('<label>')
    .attr({
        name: 'pservicio',
        for: 'pservicio'
    }).text('Costo del Servicio');
const $totalPlan = $('<input>')
    .attr({
        type: 'number',
        name: 'pservicio',
        readonly: true
    }).val(totalPlan);
const $planesAcumLabel = $('<label>')
    .attr({
        name: 'acumtotal',
        for: 'acumtotal',
    })
    .text('Planes Adicionale');
const $planesAcum = $('<input>')
    .attr({
        type: 'number',
        name: 'acumtotal',
        readonly: true
    })
    .val(planesAcumulador);
const $presuTotalLabel = $('<label>')
    .attr({
        name: 'presutotal',
        for: 'presutotal'
    })
    .text('Total Presupuesto');
const $presuTotal = $('<input>')
    .attr({
        type: 'number',
        name: 'presutotal',
        readonly: true
    }).val(0);
$('#totales').append($totalesLegend, $totalLabel, $totalPlan, $planesAcumLabel, $planesAcum, $presuTotalLabel, $presuTotal);

//Autorizacion
const $concnLegend = $('<legend>').text('Autorización');
const $concnLabel = $('<label>');
const $concnChk = $('<input>')
    .attr({
        id: "chkconcen",
        type: "checkbox"
    });
$concnLabel.append($concnChk, "¿Autoriza el tratamiento de información?")
$('#concentimiento').append($concnLegend, $concnLabel);

//al seleccionar un item del combobox de servicio 
$selectS.on('change', function() {
    const $plazos = $("#plazos");
    $plazos.empty().removeClass("ocultar")
    $plazos.addClass('plazos');
    const $legendP = $("<legend>")
        .text("Plazo del Contrato");
    const $labelPm = $('<label>')
        .attr({
            name: 'meses',
            for: 'meses'
        })
        .text('Indique Cantidad de meses del contrato');
    const $inpMes = $('<input>');
    $inpMes.attr({
        id: 'mes',
        name: 'meses',
        type: 'number',
        min: 1,
        max: 24,
        title: 'Debe contener de 1 a 24 meses',
    });
    const $ol = $('<ul>')
    for(let i = 0; i < descuentos.length; i++){
        const $li = $('<li>')
            .text(descuentos[i]);
        $ol.append($li);
    }
    $plazos.append($ol);
    $plazos.append($legendP, $labelPm, $inpMes);
    totalPlan = 0;
    totalConDescuento = 0;
    planesAcumulador = 0;
    $planesAcum.val(0);
    const precioSrv = servicios.find(s => s.id === parseInt($(this).val()));
    totalPlan = parseFloat(precioSrv.preciomes);
    $totalPlan.val(totalPlan);
    $inpMes.val(1);
    recalcularPrecioPlan($inpMes.val());
    $presuTotal.val(parseFloat(totalPlan));
    //listener para el input de meses
    $inpMes.off('change');
    $inpMes.on('change', function() {
        recalcularPrecioPlan($(this).val());
    });
    const aditionalPlans = serviciosAdicionales.find(s => s.idservicio === parseInt($(this).val()));
    const $plans = $('#planes')
    $plans.empty().removeClass('ocultar');
    $plans.addClass('planes');
    const $legengPlans = $("<legend>");
    $legengPlans.text('Planes Adicionales')
    $plans.append($legengPlans);
    const idSrv = aditionalPlans.idservicio;
    const $contDisp = $('<div>').addClass('ocultar');
    const $labelDisp = $('<label>')
        .attr({
            name: 'dispositivos',
            for: 'dispositivos'
        })
        .text("Dispositivos")
    const $disp = $('<input>');
    aditionalPlans.items.forEach(item => {
        const $checkLabel = $("<label>");
        const $cheks = $("<input>")
            .attr({
                type: "checkbox",
                name: "planes",
                value: item.id,
                cost: item.costM
            }).addClass('chk');
        $disp.attr({
                name: "dispositivos",
                type: 'number',
                min: 1,
                max: 99,
                title: 'debe seleccionar un numero entre 1 y 99',
            })
        if (item.id === 1 && item.nombre === 'Dispositivo adicional') {
            $contDisp.append($labelDisp, $disp);
            $checkLabel.append($cheks, item.nombre, $contDisp);
        } else {
            $checkLabel.append($cheks, item.nombre);
        }
        $plans.append($checkLabel);
    });
    
    //funcion para calculo de dispositivos adicionales
    function calculoDispAdicional(n, costxDisp) {
        n = Number(n) || 0
        if(n < 0) n = 0
        return n * costxDisp
    }
    let extraUltimoCosto = 0;
    //control para el marcada y desmarcado de cheksbox
    $plans.off('change', 'input[type="checkbox"][name="planes"]');
    $plans.on('change', 'input[type="checkbox"][name="planes"]', function(){
        const id = $(this).val();
        const costoxDisp = parseFloat($(this).attr('cost') || 0);
        const esIoTConCantidad = (String(idSrv) === "1" && String(id) === "1");
        if ($(this).is(':checked')){
            if (esIoTConCantidad) {
                $contDisp.removeClass('ocultar');
                $contDisp.addClass('contenedordispositivos');
                if (!$disp.val()) $disp.val(1);
                const nuevoCosto = calculoDispAdicional($disp.val(), costoxDisp);
                planesAcumulador += (nuevoCosto - extraUltimoCosto);
                $planesAcum.val(planesAcumulador);
                $presuTotal.val(parseFloat(calcularTotalPresupuesto()));
                extraUltimoCosto = nuevoCosto
            } else {
                planesAcumulador += parseFloat($(this).attr('cost') || 0);
                $planesAcum.val(planesAcumulador);
                $presuTotal.val(parseFloat(calcularTotalPresupuesto()));
            }
        } else {
            if(esIoTConCantidad) {
                planesAcumulador -= extraUltimoCosto;
                $planesAcum.val(planesAcumulador);
                $presuTotal.val(parseFloat(calcularTotalPresupuesto()));
                extraUltimoCosto = 0
                $contDisp.removeClass('contenedordispositivos');
                $contDisp.addClass('ocultar');
                $disp.val(0);
            } else {
                planesAcumulador -= parseFloat($(this).attr('cost') || 0);
                $planesAcum.val(planesAcumulador);
                $presuTotal.val(parseFloat(calcularTotalPresupuesto()));
            }
        }
    });
    //listener del input de cantidad
    $disp.off('change');
    $disp.on('change', function(){
        const chk = $plans.find('input[type="checkbox"][name="planes"][value="1"]');
        if (!chk.is(':checked') || String(idSrv) !== "1") return;
        const costoxDisp = parseFloat(chk.attr('cost')) || 0;
        let n = parseInt($(this).val(), 10);
        if(Number.isNaN(n) || n < 0) n = 0;
        $(this).val(n);

        const nuevoCosto = calculoDispAdicional(n, costoxDisp);
        planesAcumulador += (nuevoCosto - extraUltimoCosto);
        $planesAcum.val(planesAcumulador);
        extraUltimoCosto = nuevoCosto;

        $presuTotal.val(parseFloat(calcularTotalPresupuesto()));

    });
});