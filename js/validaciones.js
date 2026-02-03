const d = document;

export default function validacionContacto(){
    const $form = d.querySelector('.frm-datos');
    const $inputs = d.querySelectorAll(".frm-datos [required]");
    console.log($inputs);
}