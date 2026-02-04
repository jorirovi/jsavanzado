const d = document;

export default function validacionContacto(){
    const $fildsetDatos = d.querySelector('.frm-datos'),
        $inputs = d.querySelectorAll(".frm-datos [required]");
    console.log($inputs);

    const $fildsetMes = d.querySelector('.plazos'),
        $inputsMes = d.querySelectorAll('.plazos [required]');
    console.log($inputsMes);
    
    $inputs.forEach((input) => {
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('input-error')
        input.insertAdjacentElement("afterend",$span);
    });

}