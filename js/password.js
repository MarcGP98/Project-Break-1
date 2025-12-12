//caracteres que vamos a usar para crear la password
const MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()-_=+";

//elementos del html que vamos a usar
const inputLongitud = document.getElementById("password-length");
const botonGenerar = document.getElementById("password-btn");
const inputResultado = document.getElementById("password-result");
const errorTexto = document.getElementById("password-error");

//funcion que devuelve un caracter aleatorio de la cadena que le pasemos
function caracterAleatorio(cadena) {
  const indice = Math.floor(Math.random() * cadena.length);
  return cadena[indice];
}

// funcion para mezclar el array y que la password no empiece siempre igual
function mezclarArray(array) {
  // algoritmo que me sirve
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// funcion principal que crea la password
function generarContrasena() {
  errorTexto.textContent = ""; // limpiamos mensajes
  inputResultado.value = "";  // limpiamos el resultado

  const longitud = Number(inputLongitud.value);

  //mensaje de aviso si se pone algo incorrecto
  if (isNaN(longitud)) {
    errorTexto.textContent = "Introduce un numero valido.";
    return;
  }

  // limites entre 12 y 50
  if (longitud < 12 || longitud > 50) {
    errorTexto.textContent = "La longitud debe estar entre 12 y 50.";
    return;
  }

  //juntamos todos los caracteres posibles en una sola variable
  const todosCaracteres =
    MAYUSCULAS + MINUSCULAS + NUMEROS + SIMBOLOS;

  // aqui se iran poniendo los caracteres finales
  const passwordChars = [];

  //añadimos minimo uno de cada tipo para cumplir los requisitos
  passwordChars.push(caracterAleatorio(MAYUSCULAS));
  passwordChars.push(caracterAleatorio(MINUSCULAS));
  passwordChars.push(caracterAleatorio(NUMEROS));
  passwordChars.push(caracterAleatorio(SIMBOLOS));

  // rellenamos hasta llegar a la longitud que pidio el usuario
  for (let i = passwordChars.length; i < longitud; i++) {
    passwordChars.push(caracterAleatorio(todosCaracteres));
  }

  // mezclamos todo para que no quede ordenado
  mezclarArray(passwordChars);

  // unimos el array en un solo string
  const passwordFinal = passwordChars.join("");

  // lo mostramos en pantalla
  inputResultado.value = passwordFinal;
}

// cuando el usuario pulsa el boton, generamos la password
botonGenerar.addEventListener("click", function (evento) {
  evento.preventDefault();
  generarContrasena();
});