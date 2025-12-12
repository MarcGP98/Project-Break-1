//traemos todos los elementos del HTML que necesitamos
const form = document.getElementById("links-form");
const inputNombre = document.getElementById("link-name");
const inputUrl = document.getElementById("link-url");
const contenedorLista = document.getElementById("links-lista");
const errorTexto = document.getElementById("links-error");

//clave para guardar los datos en localStorage
const STORAGE_KEY = "misLinks";

//funcion  para traer los links guardados del localStorage
function cargarLinks() {
  const datos = localStorage.getItem(STORAGE_KEY);

  // si no hay nada guardado devolvemos un array vacio
  if (!datos) return [];

  try {
    //convertimos de texto a objeto
    return JSON.parse(datos);
  } catch (error) {
    // si algo peta mostramos el error y devolvemos un array vacio
    console.error("Error al parsear localStorage", error);
    return [];
  }
}

// guarda el array completo de links en el localStorage
function guardarLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

//pinta todos los links en pantalla
function renderizarLinks() {
  const links = cargarLinks();

  // limpiamos la lista para que no se duplique nada
  contenedorLista.innerHTML = "";

  //si no hay links mostramos un mensaje
  if (links.length === 0) {
    contenedorLista.innerHTML = "<p>No hay enlaces guardados todavia.</p>";
    return;
  }

  // recorremos cada link y lo pintamos en pantalla
  links.forEach((link, indice) => {
    const item = document.createElement("div");
    item.className = "links-item";

    //el enlace clickable
    const enlace = document.createElement("a");
    enlace.href = link.url;
    enlace.target = "_blank"; // abre en otra pestaña y no en la actual
    enlace.rel = "noopener noreferrer"; // vi que es importante por seguridad y privacidad pero no entiendo como funciona
    enlace.textContent = link.nombre;
    enlace.className = "links-item-enlace";

    // boton para borrar este link
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Eliminar";
    botonBorrar.className = "links-item-borrar";
    botonBorrar.addEventListener("click", () => eliminarLink(indice));

    // metemos todo el contenido en el contenedor del item
    item.appendChild(enlace);
    item.appendChild(botonBorrar);
    contenedorLista.appendChild(item);
  });
}

// añade un nuevo link al localStorage y vuelve a renderizar todo
function añadirLink(nombre, url) {
  const links = cargarLinks();
  links.push({ nombre, url });
  guardarLinks(links);
  renderizarLinks();
}

// elimina un link por su posicion en el array
function eliminarLink(indice) {
  const links = cargarLinks();
  links.splice(indice, 1); // quitamos solo ese
  guardarLinks(links);
  renderizarLinks();
}

// cuando enviamos el formulario evita que la pagina se recargue y limpiamos errores prveios
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  errorTexto.textContent = "";

  // recogemos los datos del usuario
  const nombre = inputNombre.value.trim();
  let url = inputUrl.value.trim();

  // aviso por si falta algun dato
  if (!nombre || !url) {
    errorTexto.textContent = "Rellena el nombre y la URL.";
    return;
  }

  // si la URL no tiene http, se lo ponemos por defecto
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // añadimos el nuevo link
  añadirLink(nombre, url);

  // limpiamos los inputs para el siguiente
  inputNombre.value = "";
  inputUrl.value = "";
});

// cuando la pagina carga, pintamos todo lo que haya guardado
renderizarLinks();