//Script para la pagina de presupuesto
//Inicializamos variables
const connect = new XMLHttpRequest();
let serviciosAdicionales = [];
let servicios = [];
let planesAcumulador = 0;
let totalPlan = 0;


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

//funcion para limpiar el DOM
function cleanDOM(){
    const $plazos = $("#plazos");
    $plazos.empty().addClass("ocultar");
    const $planes = $("#planes");
    $planes.empty().addClass("ocultar");
}

//funcion para incrmentar el precio del servicio de los planes adicionales
function costoTotalPlanI(acum = 0, precioPlan = 0) {
    totalPlan = acum + precioPlan
    return totalPlan
}
//funcion para restar el precio del servcicio de los plabes adicionales
function costoTotalPlanD(acum = 0, precioPlan = 0) {
    totalPlan = precioPlan - acum
    return totalPlan
}
//funcion recalcular plan
function recalcularPrecioPlan(valor = 0) {
    let totalConDescuento = 0;
    let porcetajeDescuento = 0;
    const meses = parseInt(valor);
    if (meses >= 6 && meses < 12) porcetajeDescuento = 0.1; //10%
    else if(meses >= 12 && meses < 20) porcetajeDescuento = 0.2 //20%
    else if(meses >= 20) porcetajeDescuento = 0.3; //30%
    totalConDescuento = totalPlan - (totalPlan * porcetajeDescuento);
    $totalPlan.val(totalConDescuento);
}

//totales
const $totalesLegend = $('<legend>').text('Totales');
const $totalLabel = $('<label>')
    .attr({
        name: 'pservicio',
        for: 'pservicio'
    }).text('Costo del Servicio:');
const $totalPlan = $('<input>')
    .attr({
        type: 'number',
        name: 'pservicio',
        disabled: true
    }).val(totalPlan);
const $planesAcumLabel = $('<label>')
    .attr({
        name: 'acumtotal',
        for: 'acumtotal',
    })
    .text('Planes Adicionale:');
const $planesAcum = $('<input>')
    .attr({
        type: 'number',
        name: 'acumtotal',
        disabled: true
    })
    .val(planesAcumulador);
$('#totales').append($totalesLegend, $totalLabel, $totalPlan, $planesAcumLabel, $planesAcum);

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
    totalPlan = 0;
    const precioSrv = servicios.find(s => s.id === parseInt($(this).val()));
    totalPlan = parseFloat(precioSrv.preciomes);
    $totalPlan.val(totalPlan);
    $inpMes.val(1);
    recalcularPrecioPlan($inpMes.val());
    //listener para el input de meses
    $inpMes.off('change');
    $inpMes.on('change', function() {
        recalcularPrecioPlan($(this).val());
    });
    const aditionalPlans = serviciosAdicionales.find(s => s.idservicio === parseInt($(this).val()));
    const $plans = $('#planes')
    $plans.empty().removeClass('ocultar');
    const $legengPlans = $("<legend>");
    $legengPlans.text('Planes Adicionales')
    $plans.append($legengPlans);
    const idSrv = aditionalPlans.idservicio; 
    const $disp = $('<input>');
    const $labelDisp = $('<label>')
        .attr({
            name: 'dispositivos',
            for: 'dispositivos'
        })
        .text("Dispositivos")
        .addClass('ocultar');
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
                name: "dispositivos",
                type: 'number',
                min: 1,
                max: 99,
                required: true,
                title: 'debe seleccionar un numero entre 2 y 99',
                step: 1
            }).addClass('ocultar');
        if (item.id === 1) {
            $checkLabel.append($cheks, item.nombre, $labelDisp, $disp);
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
                $labelDisp.removeClass('ocultar');
                $disp.removeClass('ocultar');
                if (!$disp.val()) $disp.val(1);
                const nuevoCosto = calculoDispAdicional($disp.val(), costoxDisp);
                planesAcumulador += (nuevoCosto - extraUltimoCosto);
                $totalPlan.val(costoTotalPlanI(planesAcumulador, totalPlan));
                extraUltimoCosto = nuevoCosto
            } else {
                planesAcumulador += parseFloat($(this).attr('cost') || 0);
                $totalPlan.val(costoTotalPlanI(planesAcumulador, totalPlan));
                alert('Acumulado: ' + planesAcumulador);
            }
        } else {
            if(esIoTConCantidad) {
                $totalPlan.val(costoTotalPlanD(planesAcumulador, totalPlan));
                planesAcumulador -= extraUltimoCosto;
                extraUltimoCosto = 0
                $labelDisp.addClass('ocultar');
                $disp.addClass('ocultar');
                $disp.val(0);
                alert('Acumulado: ', planesAcumulador)
            } else {
                $totalPlan.val(costoTotalPlanD(planesAcumulador, totalPlan));
                planesAcumulador -= parseFloat($(this).attr('cost') || 0);
                alert('Acomulado: ' + planesAcumulador);
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
        $totalPlan.val(planesAcumulador + totalPlan);
        extraUltimoCosto = nuevoCosto;

        alert('Acumulado: ' + planesAcumulador);
    });
});