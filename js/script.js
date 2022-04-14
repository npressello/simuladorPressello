/*
    Suma los valores costos de los ingredientes del usuario
    Consulta el porcentaje de ganancia
    Calcula el precio sugerido sin IVA
    Muestra el precio sugerido con IVA del producto
*/

let porcentajeDeGanancia = 0;
const IVA = 0.21;

function calcularIVA(costoProducto) {
    return costoProducto * IVA;
}

function calcularGanancia(costoProducto, porcentajeGanancia) {
    // Se divide por 100.0 ya que, por ejemplo, si se quiere ganar el 200% del producto, se multiplica el costo por 2.
    return costoProducto * (porcentajeGanancia / 100.0); 
}

function numeroCorrecto(precio) {
    // Valido si el precio ingresado es un numero correcto
    if (!isNaN(precio) && precio != null && precio != "" && precio >= 0) return true;
    else return false;
}

function solicitarPreciosIngredientes() {
    let precioTotalIngredientes = 0;
    while (true) {
        let textoIngresado = prompt("Ingrese el precio del ingrediente o SALIR para finalizar.");
        let precioIngrediente = parseFloat(textoIngresado);
        if (!numeroCorrecto(precioIngrediente)) {
            if (textoIngresado != "SALIR") {
                alert("Texto/Precio ingresado incorrecto.")
                continue;
            } else {
                break;
            }
        }
        precioTotalIngredientes += precioIngrediente;
    }
    return precioTotalIngredientes;
}

function solicitarPorcentajeGanancia() {
    while (true) {
        let porcentajeGanancia = parseFloat(prompt("Ingrese el precio del ingrediente o SALIR para finalizar."));
        if (!numeroCorrecto(porcentajeGanancia)) {
            alert("Porcentaje ingresado incorrecto.");
            continue;
        }
        return porcentajeGanancia;
    }
}

function main() {
    let precioIngredientes = solicitarPreciosIngredientes();
    let porcentajeDeGanancia = solicitarPorcentajeGanancia();


}