/*
    Suma los valores costos de los ingredientes del usuario
    Consulta el porcentaje de ganancia
    Calcula el precio sugerido sin IVA
    Muestra el precio sugerido con IVA del producto
*/

const IVA = 0.21;
const preciosIngredientes = [];
let cantidadIngredientesAnterior = parseInt(document.getElementById("totalProducts").value);

function Ingrediente(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

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
    // Primer prompt solicita lista de precios de ingredientes y los guarda en el array de precios
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
        preciosIngredientes.push(precioIngrediente);
    }
}

function solicitarPorcentajeGanancia() {
    // Segundo prompt solicita el porcentaje de ganancia deseado
    while (true) {
        let porcentajeGanancia = parseFloat(prompt("Ingrese el porcentaje de ganancia (igual o mayor a 0)"));
        if (!numeroCorrecto(porcentajeGanancia)) {
            alert("Porcentaje ingresado incorrecto.");
            continue;
        }
        return porcentajeGanancia;
    }
}

function colocarValorEnHTML(elemento, valor) {
    let tag = document.getElementById(elemento);
    tag.innerText = valor;
}

function colocarResultadosEnHTML() {
    colocarValorEnHTML("ingrCost", ("$"+5));
    colocarValorEnHTML("ivaCost", ("$"+5));
    colocarValorEnHTML("ingrAndIVA", ("$"+5));
    colocarValorEnHTML("profit", ("$"+5));
    colocarValorEnHTML("totalPrice", ("$"+5));
}

/* Crea un input individual de ingredientes */
function crearFormIngredienteIndividual(numero) {
    let div = document.createElement("div");
    div.className = "product-price-pair";
    div.innerHTML = `<label for="productName${numero}">Nombre de producto: </label>
        <input type="text" name="productName${numero}" id="productName${numero}">
        <label for="productQuantity${numero}">Precio: </label>
        <input type="number" name="productPrice${numero}" id="productPrice${numero}">`;
    return div;
}


/* Segun el numero de ingredientes elegido, actualiza la cantidad de inputs de ingredientes */
function actualizarCantidadIngredientes() {
    let nuevaCantidadIngredientes = parseInt(document.getElementById("totalProducts").value);
    if (nuevaCantidadIngredientes <= 0) {
        document.getElementById("totalProducts").value = cantidadIngredientesAnterior;
        return;
    }

    let diferenciaCantidadIngredientes = nuevaCantidadIngredientes - cantidadIngredientesAnterior;
    if (diferenciaCantidadIngredientes == 0) return;

    let form = document.getElementById("formContainer");

    if (diferenciaCantidadIngredientes > 0) {
        for (let i = cantidadIngredientesAnterior + 1; i <= nuevaCantidadIngredientes; i++) {
            let div = crearFormIngredienteIndividual(i);
            form.insertBefore(div, form.children[i-1]);
        }
    } else {
        for (let i = cantidadIngredientesAnterior - 1; i > nuevaCantidadIngredientes - 1; i--) {
            console.log(cantidadIngredientesAnterior);   
            console.log(nuevaCantidadIngredientes);
            form.children[i].remove();
        }
    }

    cantidadIngredientesAnterior = nuevaCantidadIngredientes; 
    
}

let inputCantidad = document.getElementById("totalProducts");
inputCantidad.onchange = () => {actualizarCantidadIngredientes()};
colocarResultadosEnHTML();

function main() {
    // Inicializo variables
    solicitarPreciosIngredientes();
    let precioTotalIngredientes = 0;

    precioTotalIngredientes = preciosIngredientes.reduce((acc, el) => acc + el, 0);
    
    let porcentajeDeGanancia = 0
    let gananciaDelProducto = 0;
    let precioSugeridoSinIVA = 0;
    let ivaSobreSugerido = 0;
    let precioSugeridoConIVA = 0;


    // Si el costo es 0 entonces no calcular el resto
    if (!(precioTotalIngredientes == 0)) {
        porcentajeDeGanancia = solicitarPorcentajeGanancia();
        gananciaDelProducto = calcularGanancia(precioTotalIngredientes, porcentajeDeGanancia);
        precioSugeridoSinIVA = precioTotalIngredientes + gananciaDelProducto;
        ivaSobreSugerido = parseFloat(calcularIVA(precioSugeridoSinIVA).toFixed(2));
        precioSugeridoConIVA = precioSugeridoSinIVA + ivaSobreSugerido;
    }

    // Muestro datos en Alert, en consola y en HTML
    alert(("Sobre un costo total de $" + precioTotalIngredientes + ", se establece una ganancia del " + porcentajeDeGanancia + "% por un valor de $" + 
        gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos).\nEl precio sugerido final de venta es: $" + precioSugeridoConIVA));

    console.log(("Sobre un costo total de $" + precioTotalIngredientes + ", se establece una ganancia del " + porcentajeDeGanancia + "% por un valor de $" + 
    gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos).\nEl precio sugerido final de venta es: $" + precioSugeridoConIVA));

    document.write(("<p class=\"calculation\"> Sobre un costo total de $" + precioTotalIngredientes + ", se establece una ganancia del " + porcentajeDeGanancia + "% por un valor de $" +
        gananciaDelProducto + " y $" + ivaSobreSugerido + " de IVA (21% del precio sin impuestos). </p>"));
    document.write(("<p class=\"calculation\"> El precio sugerido final de venta es: $" + precioSugeridoConIVA + "</p>"));
}

//main();