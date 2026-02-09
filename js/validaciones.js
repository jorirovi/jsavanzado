const d = document;

export default function validacionContacto(){
    const $fildsetDatos = d.querySelector('.frm-datos'),
        $inputs = d.querySelectorAll(".frm-datos [required]");
    
    $inputs.forEach((input) => {
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("input-error", "ocultar");
        input.insertAdjacentElement("afterend",$span);
    });

    d.addEventListener('input', (e) => {
        if(e.target.matches('.frm-datos [required]')){
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;
            //console.log(pattern);
            if(pattern && $input.value !== ''){
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active');
            }

            if(!pattern && $input.value !==''){
                const valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                let regex = new RegExp(valEmail);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active');
            }
        }
    });
    const $formulario = d.forms.frmpresupuesto;
    $formulario.addEventListener('submit', (e) => {
        try {
            let hayError = false;
            let mensaje = '';
            //Expresiones Regulares
            const regNombre   = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
            const regApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            const regTelefono = /^[6789]\d{8}$/;
            const regEmail    = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const regNumMes   = /^(?:[1-9]|1[0-9]|2[0-4])$/;
            const regNumDisp  = /^(?:[1-9]|[1-9][0-9])$/;
            //Valores de los campos
            const nombre    = d.querySelector('input[name="nombre"]').value
            const apellidos = d.querySelector('input[name="apellido"]').value
            const telefono  = d.querySelector('input[name="tel"]').value
            const email     = d.querySelector('input[name="email"]').value
            const servicio  = d.getElementById('servicio').value;
            const numMesEl  = d.getElementById('mes');
            const numMes    = numMesEl ? d.getElementById('mes').value : '';
            const $chkDisp  = d.querySelector('input[name="planes"][value="1"]');
            const $numDisp  = d.querySelector('input[name="dispositivos"]');
            const $autoriza = d.getElementById('chkconcen');

            if (!regNombre.test(nombre) || nombre === '') {
                mensaje += 'Nombre no valido \n'
                hayError = true;
            }
            if (!regApellido.test(apellidos) || apellidos === ''){
                mensaje += 'Apellidos no valido \n';
                hayError = true
            }
            if (!regTelefono.test(telefono) || telefono === ''){
                mensaje += 'Numero de teléfono no valido \n';
                hayError = true
            }
            if (!regEmail.test(email) || email === ''){
                mensaje += 'Email no valido \n'
                hayError = true;
            }
            if (servicio === '') {
                mensaje += 'Debe seleccionar un servicio \n'
                hayError = true;
            }
            if (!regNumMes.test(numMes) || numMes === '') {
                mensaje += 'Numero de meses debe ser un numero de 1 a 24 \n';
                hayError = true;
            }
            
            if ($chkDisp?.checked && $numDisp) {
                if (!regNumDisp.test($numDisp.value) || $numDisp?.value === ''){
                    mensaje += 'El numero de dispositivos debe ser un numero entre 1 a 99 \n';
                    hayError = true;
                }
            }
            if (!$autoriza.checked) {
                mensaje += 'Debe Marcar la Autorizacion \n';
                hayError = true;
            }

            if (hayError) {
                alert(mensaje);
                e.preventDefault();
                return
            }
            alert('Fromulario enviado con Exito');
        } catch (err) {
            console.log(err);
        }
    });
}