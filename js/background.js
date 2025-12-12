//imagenes que usaremos de fondo
const imagenesFondo = [
  "../img/4k-mountain-lake-wallpaper.jpeg",
  "../img/pexels-francesco-ungaro-1525041.jpg",
  "../img/pexels-pixabay-33109.jpg",
  "../img/photo-1493246507139-91e8fad9978e.jpeg",
  "../img/wdakf9dunnya1.jpg"
];

//en que imagen estamos ahora
let indice = 0;

function cambiarFondo() {
  // aqui cambiamos el fondo del body poniendo la imagen actual
  document.body.style.backgroundImage = `url("${imagenesFondo[indice]}")`;
  document.body.style.backgroundSize = "cover"; // entera y bonita
  document.body.style.backgroundPosition = "center"; // centrada siempre
  document.body.style.backgroundRepeat = "no-repeat"; // que no se repita

  //pasamos a la siguiente imagen
  indice++;

  //si llegamos al final del array volvemos a empezar
  if (indice >= imagenesFondo.length) indice = 0;
}

//ponemos una imagen al cargar la pagina
cambiarFondo();

//intervalo de 15s entre imagenes
setInterval(cambiarFondo, 15000);