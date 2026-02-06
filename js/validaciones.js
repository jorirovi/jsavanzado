const d = document;

export default function validacionContacto(){
    const $fildsetDatos = d.querySelector('.frm-datos'),
        $inputs = d.querySelectorAll(".frm-datos [required]");
    console.log($inputs);
    
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
            if(pattern){
                console.log('tiene regex: ', pattern);

                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active');
            }

            if(!pattern){
                console.log('NO tiene regex');
                const valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                let regex = new RegExp(valEmail);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active');
            }
        }
    });
    d.addEventListener('submit', (e) => {
        e.preventDefault();
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
        const numMes    = d.getElementById('mes').value;
        const $chkDisp   = d.querySelector('input[name="planes"][value="1"]');
        if (!regNombre.test(nombre) || nombre === '') {
            alert('Nombre no valido');
            return;
        }
        if (!regApellido.test(apellidos) || apellidos === ''){
            alert('Apellidos no valido');
            return;
        }
        if (!regTelefono.test(telefono) || telefono === ''){
            alert('Numero de teléfono no valido');
            return;
        }
        if (!regEmail.test(email) || email === ''){
            alert('Email no valido')
        }
        if (servicio === '') {
            alert('Debe seleccionar un servicio')
            return;
        }
        if (!regNumMes.test(numMes) || numMes === '') {
            alert('Numero de meses debe ser un numero de 1 a 24');
            return;
        }
        
        if ($chkDisp?.checked) {
            const numDisp = d.querySelector('input[name="dispositivos"]').value
            if (!regNumDisp.test(numDisp) || numDisp === ''){
                alert('El numero de dispositivos debe ser un numero entre 1 a 99');
                return;
            }
        }
    });
}