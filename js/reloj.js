// funcion para poner un 0 delante de los numeros menores de 10 asi vemos 07:02 y no 7:2
function addZero(numero) {
  return numero < 10 ? "0" + numero : numero;
}

// funcion que devuelve un mensaje segun la hora actual siguiendo los tramos marcados en el ejercicio
function obtenerMensaje(hora) {
  if (hora >= 0 && hora < 7) {
    return "Es hora de descansar. Apaga y sigue manana";
  } else if (hora >= 7 && hora < 12) {
    return "Buenos dias, desayuna fuerte y a darle al codigo";
  } else if (hora >= 12 && hora < 14) {
    return "Echa un rato mas pero no olvides comer";
  } else if (hora >= 14 && hora < 16) {
    return "Espero que hayas comido";
  } else if (hora >= 16 && hora < 18) {
    return "Buenas tardes, el ultimo empujon";
  } else if (hora >= 18 && hora < 22) {
    return "Esto ya son horas extras, piensa en parar pronto";
  } else {
    return "Buenas noches, es hora de pensar en parar y descansar";
  }
}

// funcion principal que actualiza la hora, la fecha y el mensaje
function actualizarReloj() {
  const ahora = new Date(); //pillamos la fecha y hora actual

  // sacamos las partes que nos interesan 
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  let segundos = ahora.getSeconds();

  // fecha con dia, mes y año
  const dia = addZero(ahora.getDate());
  const mes = addZero(ahora.getMonth() + 1);
  const anio = ahora.getFullYear();

  // unimos y hacemos el texto final que se mostrara en pantalla
  const textoHora = addZero(horas) + ":" + addZero(minutos) + ":" + addZero(segundos);
  const textoFecha = dia + "/" + mes + "/" + anio;
  const textoMensaje = obtenerMensaje(horas);

  // lo mandamos todo al HTML
  document.getElementById("hora").textContent = textoHora;
  document.getElementById("fecha").textContent = textoFecha;
  document.getElementById("mensaje").textContent = textoMensaje;
}

// ponemos la hora al cargar la pagina
actualizarReloj();

// actualizamos cada segundo para que la hora del reloj sea real 
setInterval(actualizarReloj, 1000);