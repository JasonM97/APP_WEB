/* CODIGO PARA AUMENTAR Y DISMINUIR EN LOS BOTONES */

function aumentarNumeroDeSeleccion(button) {
    let cantidadInput = button.parentElement.querySelector('.cantidad');
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
}

function disminuirNumeroDeSeleccion(button) {
    let cantidadInput = button.parentElement.querySelector('.cantidad');
    if (parseInt(cantidadInput.value) > 1) {
        cantidadInput.value = parseInt(cantidadInput.value) - 1;
    }
}
