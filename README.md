# Project Break 1 - Dashboard

Este proyecto es un dashboard con varias herramientas en una misma interfaz.

## Funcionalidades

El dashboard incluye 4 secciones principales:

### Reloj digital 24h + fecha

- Muestra la hora actual en formato 24h (HH:MM:SS).
- Muestra la fecha en format DD/MM/AAAA.
- Mensajes diferentes según la franja horaria (mañana, tarde, noche, etc).
- La hora se actualiza automáticamente cada segundo.

###  Generador de contraseñas

- Permite elegir la longitud de la contraseña (entre 12 y 50 caracteres).
- Genera contraseñas que incluyen:
  - Mayúsculas
  - Minúsculas
  - Números
  - Símbolos
- Siempre hay al menos un carácter de cada tipo.
- Muestra mensajes de error si la longitud no es válida.

###  Listado de links

- Permite guardar enlaces con:
  - Nombre del enlace
  - URL
- Guarda los datos en localStorage para que no se pierdan al recargar.
- Permite abrir los enlaces en una pestaña nueva.
- Permite eliminar enlaces de la lista.
- Si no hay enlaces guardados, muestra un mensaje informativo.

###  Estación meteorológica

- Muestra el tiempo actual de una ciudad (por defecto: Barcelona):
  - Ciudad y país
  - Estado del clima (texto)
  - Icono del tiempo
  - Temperatura actual en ºC
  - Humedad, viento y precipitación
- Muestra un pronóstico por horas del dia:
  - Hora
  - Icono del clima
  - Temperatura
- Los datos se obtienen de la API de WeatherAPI usando `fetch` y `async/await`.

##  Fondo con imágenes aleatorias

- Todas las paginas comparten un fondo que va cambiando automáticamente.
- El fondo cambia cada 15 segundos.
- Las imagenes se cargan desde la carpeta `/img`.
- La transicion del fondo es suave gracias a CSS.

## Estructura del proyecto

project-break-1/
├─ html/
│  ├─ index.html
│  ├─ reloj.html
│  ├─ password.html
│  ├─ links.html
│  └─ meteo.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ reloj.js
│  ├─ password.js
│  ├─ links.js
│  ├─ meteo.js
│  └─ background.js
├─ img/
│  └─ (imágenes del carrusel)
└─ README.md 