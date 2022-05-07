/*
    Suma los valores costos de los ingredientes del usuario
    Consulta el porcentaje de ganancia
    Calcula el precio sugerido sin IVA
    Muestra el precio sugerido con IVA del producto
*/

let cantidadIngredientesAnterior = parseInt(document.getElementById("totalProducts").value);

function Ingrediente(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

function calcularIVA(costoProducto, IVA) {
    return costoProducto * IVA / 100;
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

function colocarValorEnHTML(elemento, valor) {
    let tag = document.getElementById(elemento);
    tag.innerText = valor;
}

function colocarResultadosEnHTML(costoIngredientes, ganancia, sugeridoSinIva, iva, final) {
    colocarValorEnHTML("ingrCost", ("$"+costoIngredientes));
    colocarValorEnHTML("profit", ("$"+ganancia));
    colocarValorEnHTML("costAndProfit", ("$"+sugeridoSinIva));
    colocarValorEnHTML("ivaCost", ("$"+iva));
    colocarValorEnHTML("totalPrice", ("$"+final));
}

/* Crea un input individual de ingredientes */
function crearFormIngredienteIndividual(numero) {
    let div = document.createElement("div");
    div.className = "product-price-pair";
    div.innerHTML = `<label for="productName${numero}">Nombre de producto: </label>
        <input type="text" name="productName${numero}" id="productName${numero}">
        <label for="productQuantity${numero}">Precio: </label>
        <input type="number" name="productPrice${numero}" id="productPrice${numero} min="0"">`;
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

function obtenerIngredienteIndividual(inputId) {
    let nombre = document.getElementById("productName"+inputId).value;
    let precio = parseFloat(document.getElementById("productPrice"+inputId).value);
    if (precio < 0) {
        document.getElementById("productPrice"+inputId).value = 0;
        precio = 0;
    }
    const ingrediente = new Ingrediente(nombre, precio);
    return ingrediente;
}

function obtenerIngredientes(cantidad) {
    const ingredientes = [];

    for (let i = 0; i < cantidad; i++) {
        ingredientes.push(obtenerIngredienteIndividual(i+1));
    }

    return ingredientes;
}

function obtenerIVA() {
    let iva = parseFloat(document.getElementById("iva").value);
    if (iva < 0) {
        document.getElementById("iva").value = 0;
        iva = 0;
    }
    return iva;
}

function obtenerPorcentajeGanancia() {
    let porcentaje = parseFloat(document.getElementById("profitPercent").value);
    if (porcentaje < 0) {
        document.getElementById("profitPercent").value = 0;
        porcentaje = 0;
    }
    return porcentaje;
}

function simular(e) {
    e.preventDefault();

    // Obtengo informacion de ingredientes y sumo los precios
    let ingredientes = obtenerIngredientes(cantidadIngredientesAnterior);    
    let costoTotalIngredientes = ingredientes.reduce((acc, el) => acc + el.precio, 0);
    console.log(costoTotalIngredientes);

    let ganancia = calcularGanancia(costoTotalIngredientes, obtenerPorcentajeGanancia());
    console.log(ganancia);
    let sugeridoSinIva = costoTotalIngredientes + ganancia;
    console.log(sugeridoSinIva);

    let iva = parseFloat(calcularIVA(sugeridoSinIva, obtenerIVA()).toFixed(2));
    console.log(iva);
    precioSugeridoFinal = sugeridoSinIva + iva;
    console.log(precioSugeridoFinal);

    colocarResultadosEnHTML(costoTotalIngredientes, ganancia, sugeridoSinIva, iva, precioSugeridoFinal);
}

function main() {

    let inputCantidad = document.getElementById("totalProducts");
    inputCantidad.onchange = () => {actualizarCantidadIngredientes()};

    let btnCalcular = document.getElementById("btnCalculate");
    btnCalcular.addEventListener("click", simular);
}

main();