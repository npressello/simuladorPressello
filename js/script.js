'use strict';
/*
  Suma los valores costos de los ingredientes del usuario
  Consulta el porcentaje de ganancia
  Calcula el precio sugerido sin IVA
  Muestra el precio sugerido con IVA del producto
*/

// Mantiene en memoria la cantidad de ingredientes anterior a la modificacion
// del formulario para hacer los calculos y actualizar acorde
let cantidadIngredientesAnterior = parseInt(document.getElementById("totalProducts").value);

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})

// Objeto
function Ingrediente(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}


// Funciones auxiliares de calculo
function calcularIVA(costoProducto, IVA) {
  return costoProducto * IVA / 100.0;
}

function calcularGanancia(costoProducto, porcentajeGanancia) {
  // Se divide por 100.0 ya que, por ejemplo, si se quiere ganar el 200% del producto, se multiplica el costo por 2.
  return costoProducto * (porcentajeGanancia / 100.0);
}


// Validacion de costo o porcentaje
function numeroCorrecto(precio) {
  // Valido si el precio ingresado es un numero correcto
  return (!isNaN(precio) && precio != null && precio != "" && precio >= 0);
}


// Funciones de salida
function colocarValorEnHTML(elemento, valor) {
  let tag = document.getElementById(elemento);
  tag.innerText = valor;
}

function colocarResultadosEnHTML(costoIngredientes, ganancia, sugeridoSinIva, iva, final) {
  colocarValorEnHTML("ingrCost", ("$" + costoIngredientes));
  colocarValorEnHTML("profit", ("$" + ganancia));
  colocarValorEnHTML("costAndProfit", ("$" + sugeridoSinIva));
  colocarValorEnHTML("ivaCost", ("$" + iva));
  colocarValorEnHTML("totalPrice", ("$" + final));
}


/* Crea un input individual de ingredientes */
function crearFormIngredienteIndividual(numero) {
  let div = document.createElement("div");
  div.className = "product-price-pair";
  div.innerHTML = `<label for="productName${numero}">Nombre de producto: </label>
    <input type="text" name="productName${numero}" id="productName${numero}">
    <label for="productQuantity${numero}">Precio: </label>
    <input type="number" name="productPrice${numero}" id="productPrice${numero}" min="0">`;
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

  // Si la diferencia es positiva agrega inputs de ingrediente
  if (diferenciaCantidadIngredientes > 0) {
    for (let i = cantidadIngredientesAnterior + 1; i <= nuevaCantidadIngredientes; i++) {
      let div = crearFormIngredienteIndividual(i);
      form.insertBefore(div, form.children[i - 1]);
    }
  } else { // Sino elimina inputs de ingredientes
    for (let i = cantidadIngredientesAnterior - 1; i > nuevaCantidadIngredientes - 1; i--) {
      console.log(cantidadIngredientesAnterior);
      console.log(nuevaCantidadIngredientes);
      form.children[i].remove();
    }
  }

  cantidadIngredientesAnterior = nuevaCantidadIngredientes;
}


// Recopilo info ingrediente y genero objeto
function obtenerIngredienteIndividual(inputId) {
  let nombre = document.getElementById("productName" + inputId).value;
  let precio = parseFloat(document.getElementById("productPrice" + inputId).value);
  if (!numeroCorrecto(precio)) {
    document.getElementById("productPrice" + inputId).value = 0;
    precio = 0;
  }
  const ingrediente = new Ingrediente(nombre, precio);
  return ingrediente;
}

// Genero array de ingredientes
function obtenerIngredientes(cantidad) {
  const ingredientes = [];

  for (let i = 0; i < cantidad; i++) {
    ingredientes.push(obtenerIngredienteIndividual(i + 1));
  }

  return ingredientes;
}

function obtenerIVA() {
  let iva = parseFloat(document.getElementById("iva").value);
  if (!numeroCorrecto(iva)) {
    document.getElementById("iva").value = 0;
    iva = 0;
  }
  return iva;
}

function obtenerPorcentajeGanancia() {
  let porcentaje = parseFloat(document.getElementById("profitPercent").value);
  if (!numeroCorrecto(porcentaje)) {
    document.getElementById("profitPercent").value = 0;
    porcentaje = 0;
  }
  return porcentaje;
}


// Guarda la ultima simulacion
async function guardar(cantIngredientes, listaIngredientes, porcentajeIva, porcentajeDeGanancia) {
  localStorage.setItem('cantIngredientes', cantIngredientes);
  localStorage.setItem('listaIngredientes', JSON.stringify(listaIngredientes));
  localStorage.setItem('porcentajeIva', porcentajeIva);
  localStorage.setItem('porcentajeDeGanancia', porcentajeDeGanancia);


  await Toast.fire({
    icon: 'success',
    title: 'Simulación guardada'
  });
}

// Funcion principal de simulacion
function simular(e) {
  e.preventDefault();

  // Obtengo informacion de ingredientes y sumo los precios
  let ingredientes = obtenerIngredientes(cantidadIngredientesAnterior);
  let costoTotalIngredientes = ingredientes.reduce((acc, el) => acc + el.precio, 0);

  let porcentajeDeGanancia = obtenerPorcentajeGanancia();
  let ganancia = calcularGanancia(costoTotalIngredientes, porcentajeDeGanancia);
  let sugeridoSinIva = costoTotalIngredientes + ganancia;

  let porcentajeIva = obtenerIVA();
  let iva = parseFloat(calcularIVA(sugeridoSinIva, porcentajeIva).toFixed(2));
  let precioSugeridoFinal = parseFloat((sugeridoSinIva + iva).toFixed(2));

  // Muestro salida al HTML
  colocarResultadosEnHTML(costoTotalIngredientes, ganancia, sugeridoSinIva, iva, precioSugeridoFinal);

  // Guardo en archivo la ultima simulacion
  guardar(cantidadIngredientesAnterior, ingredientes, porcentajeIva, porcentajeDeGanancia);
}

// Carga ingredientes en el form del html segun la lista de ingredientes en memoria
function cargaIngredientes(listaIngredientes) {
  for (let i = 0; i < listaIngredientes.length; i++) {
    document.getElementById("productName" + (i+1)).value = listaIngredientes[i].nombre;
    document.getElementById("productPrice" + (i+1)).value = listaIngredientes[i].precio;
  }
}

// Carga formulario completo guardado en la ultima sesion
function cargarSesionAnterior(btnCalcular) {
  // Cargo cantidad de ingredientes y actualizo form
  let cantIngredientes = localStorage.getItem('cantIngredientes');
  if (cantIngredientes == null) return false;
  document.getElementById("totalProducts").value = cantIngredientes;
  actualizarCantidadIngredientes();

  // Cargo lista ingredientes
  let listaIngredientes = JSON.parse(localStorage.getItem('listaIngredientes'));
  cargaIngredientes(listaIngredientes);
  
  // Cargo porcentaje iva y ganancia
  let porcentajeIva = localStorage.getItem('porcentajeIva');
  document.getElementById("iva").value = porcentajeIva;
  let porcentajeDeGanancia = localStorage.getItem('porcentajeDeGanancia');
  document.getElementById("profitPercent").value = porcentajeDeGanancia;

  // Una vez cargada la sesion dispara el evento para calcular la simulacion
  btnCalcular.dispatchEvent(new Event("click"));
  return;
}

// Llena el form de la receta cargada a partir del archivo json
function llenarForm(listaIngredientes) {
  // Primero actuaiza la cantidad de ingredientes del form
  document.getElementById("totalProducts").value = listaIngredientes.length;
  actualizarCantidadIngredientes();

  // Luego carga la lista de ingredientes
  cargaIngredientes(listaIngredientes);
}

// Carga una receta de un archivo json en el form al elegir por el menu desplegable
async function cargarReceta(e) {
  e.preventDefault();

  // Segun la opcion de receta elegida, selecciona la ruta
  let nombreReceta = document.getElementById("recipes").value.toLowerCase();
  let url = 'https://preciosugerido.netlify.app/data/' + nombreReceta + '.json';

  // Realiza un fetch de los datos del json
  const resp = await fetch(url);
  const data = await resp.json();

  // Llena el form con la cantidad de ingredientes y los datos de cada uno
  llenarForm(data);
}

// Realizar una animacion -Bordes- a la seccion elegida -Header, Main, Footer-
function animarSeccion(nombreSeccion, nombreClase) {
  // Selecciona la seccion a animar
  let seccion = document.getElementsByTagName(nombreSeccion)[0];
  
  // Agrega la clase con el efecto deseado, en este caso un borde rojo que se agranda y achica
  seccion.classList.add(nombreClase);

  // Comienza con un flag de animado desactivado
  // A partir de un timer, se genera un intervalo de 1 segundo en el que activa y desactiva la animacion
  let animado = false;
  let timer = setInterval(() => {
    if (animado) {
      seccion.classList.remove(nombreClase);
      clearInterval(timer);
    }
    animado = true;
  }, 1000); // duracion de animacion de 1 segundo
}

// Puerta de entrada al programa
async function main() {
  let btnCargaReceta = document.getElementById("btnRecipe");
  btnRecipe.addEventListener("click", cargarReceta);

  // Evento de actualizacion de formulario segun cantidad de ingredientes
  let inputCantidad = document.getElementById("totalProducts");
  inputCantidad.onchange = () => { actualizarCantidadIngredientes() };

  // Evento de simulacion de precios
  let btnCalcular = document.getElementById("btnCalculate");
  btnCalcular.addEventListener("click", simular);

  // Botones header
  let navLinks = document.getElementsByClassName("main-nav-link");
  let homeLink = navLinks[0];
  let simLink = navLinks[1];
  let contactLink = navLinks[2];
  homeLink.addEventListener("click", function() {
    animarSeccion("header", "animation-highlight");
  });
  simLink.addEventListener("click", function() {
    animarSeccion("main", "animation-highlight");
  });
  contactLink.addEventListener("click", function() {
    animarSeccion("footer", "animation-highlight");
  });

  // Carga datos de localStorage, si existen, entonces hace una simulacion inmediate
  cargarSesionAnterior(btnCalcular);
}

main();
