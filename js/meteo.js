// api key de weatherapi
const API_KEY = "9cf6d5ddaa1b4153b3220012251212";

// ciudad que queremos mostrar en la pagina
const CIUDAD = "Barcelona";

// cogemos todos los elementos del HTML
const ciudadElemento = document.getElementById("meteo-ciudad");
const estadoElemento = document.getElementById("meteo-estado");
const iconoElemento = document.getElementById("meteo-icono");
const tempElemento = document.getElementById("meteo-temp");
const humedadElemento = document.getElementById("meteo-humedad");
const vientoElemento = document.getElementById("meteo-viento");
const lluviaElemento = document.getElementById("meteo-lluvia");
const horasContenedor = document.getElementById("meteo-horas");
const errorElemento = document.getElementById("meteo-error");

// funcion que pide los datos a la API con mensaje mientras carga
async function cargarMeteo() {
  errorElemento.textContent = "Cargando datos del tiempo...";

  try {
    // url de la peticion con la ciudad, el idioma y la api key
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CIUDAD}&aqi=no&days=1&lang=es`;

    // hacemos la peticion al servidor
    const respuesta = await fetch(url);

    // comprobamos si la respuesta llega bien
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener el tiempo");
    }

    // convertimos los datos de texto a objeto
    const datos = await respuesta.json();

    //pintamos el clima actual y las horas siguientes
    pintarDatosActuales(datos);
    pintarPronosticoHoras(datos);

    errorElemento.textContent = ""; //limpiamos el mensaje
  } catch (error) {
    // si algo falla mostramos un mensaje
    console.error(error);
    errorElemento.textContent = "Ha ocurrido un error al cargar la informacion del tiempo.";
  }
}

// funcion que pinta la info principal del clima
function pintarDatosActuales(datos) {
  const location = datos.location;
  const current = datos.current;

  //ciudad y pais
  ciudadElemento.textContent = `${location.name}, ${location.country}`;

  // texto del estado del clima
  estadoElemento.textContent = current.condition.text;

  // icono de la API añadiendo el https
  const iconUrl = "https:" + current.condition.icon;
  iconoElemento.src = iconUrl;
  iconoElemento.alt = current.condition.text;

  // temperatura actual
  tempElemento.textContent = `${current.temp_c}°C`;

  // datos extra
  humedadElemento.textContent = `Humedad: ${current.humidity}%`;
  vientoElemento.textContent = `Viento: ${current.wind_kph} km/h`;
  lluviaElemento.textContent = `Precipitacion: ${current.precip_mm} mm`;
}

// funcion que genera las tarjetas del pronostico por horas
function pintarPronosticoHoras(datos) {
  const horas = datos.forecast.forecastday[0].hour;
  horasContenedor.innerHTML = ""; // limpiamos el contenedor

  const ahora = new Date();
  const horaActual = ahora.getHours(); //hora del sistema

  let contador = 0; // para no mostrar demasiadas horas

  // recorremos todas las horas del dia
  for (let i = 0; i < horas.length; i++) {
    const horaDato = horas[i];
    const fechaHora = new Date(horaDato.time);

    // solo mostramos horas futuras poniendo de maximo 8 tarjetas
    if (fechaHora.getHours() >= horaActual && contador < 8) {
      const tarjeta = document.createElement("div");
      tarjeta.className = "meteo-hora-item";

      // texto de la hora con formato bonito
      const horaTexto = document.createElement("p");
      const horasStr = fechaHora.getHours().toString().padStart(2, "0");
      const minutosStr = fechaHora.getMinutes().toString().padStart(2, "0");
      horaTexto.textContent = `${horasStr}:${minutosStr}`;

      // icono de esa hora
      const icono = document.createElement("img");
      icono.className = "meteo-hora-icono";
      icono.src = "https:" + horaDato.condition.icon;
      icono.alt = horaDato.condition.text;

      // temperatura de esa hora
      const temp = document.createElement("p");
      temp.textContent = `${horaDato.temp_c}°C`;

      // metemos todo en la tarjeta
      tarjeta.appendChild(horaTexto);
      tarjeta.appendChild(icono);
      tarjeta.appendChild(temp);

      // añadimos la tarjeta al contenedor
      horasContenedor.appendChild(tarjeta);

      contador++;
    }
  }

  // avisamos si no hay horas disponibles
  if (contador === 0) {
    horasContenedor.innerHTML = "<p>No hay mas horas disponibles para hoy.</p>";
  }
}

// ejecutamos todo al cargar la pagina
cargarMeteo();