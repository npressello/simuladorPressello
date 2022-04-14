/*
    Suma los valores costos de los ingredientes del usuario
    Consulta el porcentaje de ganancia
    Calcula el precio sugerido sin IVA
    Muestra el precio sugerido con IVA del producto
*/

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
        let textoIngresado = prompt("Ingrese el precio del ingrediente (igual o mayor a 0) o SALIR para finalizar.");
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
        let porcentajeGanancia = parseFloat(prompt("Ingrese el porcentaje de ganancia (igual o mayor a 0)"));
        if (!numeroCorrecto(porcentajeGanancia)) {
            alert("Porcentaje ingresado incorrecto.");
            continue;
        }
        return porcentajeGanancia;
    }
}

function main() {
    let precioIngredientes = solicitarPreciosIngredientes();
    console.log(precioIngredientes)
    let porcentajeDeGanancia = 0
    let gananciaDelProducto = 0;
    let precioSugeridoSinIVA = 0;
    let ivaSobreSugerido = 0;
    let precioSugeridoConIVA = 0;


    if (!(precioIngredientes == 0)) {
        porcentajeDeGanancia = solicitarPorcentajeGanancia();
        gananciaDelProducto = calcularGanancia(precioIngredientes, porcentajeDeGanancia);
        precioSugeridoSinIVA = precioIngredientes + gananciaDelProducto;
        ivaSobreSugerido = calcularIVA(precioSugeridoSinIVA);
        precioSugeridoConIVA = precioSugeridoSinIVA + ivaSobreSugerido;
    }

    alert(("Sobre un costo total de $" + precioIngredientes + ", se establece una ganancia del " + porcentajeDeGanancia + "% por un valor de $" + 
        gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos).\nEl precio sugerido final de venta es: $" + precioSugeridoConIVA));
    console.log(("Sobre un costo total de $" + precioIngredientes + ", se establece una ganancia del " + porcentajeDeGanancia + "% por un valor de $" + 
    gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos).\nEl precio sugerido final de venta es: $" + precioSugeridoConIVA));

    document.write(("<p class=\"calculo\"> Sobre un costo total de $" + precioIngredientes + ", se estable una ganancia del " + "% por un valor de $" +
        gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos). </p>"));
    document.write(("<p class=\"calculo\"> El precio sugerido final de venta es: $" + precioSugeridoConIVA + "</p>"));
}

main();