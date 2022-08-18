const url = "http://localhost:3000/api/peliculas/";
var contenedor = document.querySelector("tbody");
let resultados = "";

const modalPeliculas = new bootstrap.Modal(
  document.getElementById("modalPeliculas")
);
const formPelicula = document.querySelector("form");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const genero = document.getElementById("genero");
const enlace = document.getElementById("enlace");
let opcion = "";

btnCrear.addEventListener("click", () => {
  titulo.value = "";
  descripcion.value = "";
  genero.value = "";
  enlace.value = "";
  modalPeliculas.show();
  opcion = "crear";
});

const mostrar = (peliculas) => {
  peliculas.forEach((pelicula) => {
    resultados += `<tr>
            <td>${pelicula.id}</td>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.descripcion}</td>
            <td>${pelicula.genero}</td>
            <td>${pelicula.enlace}</td>
            <td class="text-center"><a class="btnEdictar btn btn-primary">Edictar</a><a class="btnEliminar btn btn-danger">Eliminar</a></td> 
        </tr>
    `;
  });
  contenedor.innerHTML = resultados;
};

fetch(url)
  .then((response) => response.json())
  .then((data) => mostrar(data))
  .catch((error) => console.log(error));

//Borrar
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".btnEliminar", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;
  alertify.confirm(
    "¿Estas seguro que quieres eliminar la pelicula?",
    function () {
      fetch(url + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
    },

    function () {
      alertify.error("Se cancelo la operacion");
    }
  );
});

let id = 0;
on(document, "click", ".btnEdictar", (e) => {
  const fila = e.target.parentNode.parentNode;
  id = fila.children[0].innerHTML;
  const tituloForm = fila.children[1].innerHTML;
  const descripcionForm = fila.children[2].innerHTML;
  const generoForm = fila.children[3].innerHTML;
  const enlaceForm = fila.children[4].innerHTML;

  titulo.value = tituloForm;
  descripcion.value = descripcionForm;
  genero.value = generoForm;
  enlace.value = enlaceForm;

  opcion = "edictar";
  modalPeliculas.show();
});

formPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo.value,
        descripcion: descripcion.value,
        genero: genero.value,
        enlace: enlace.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const nuevaPelicula = [];
        nuevaPelicula.push(data);
        mostrar(nuevaPelicula);
      })
      .then((response) => location.reload());
  }
  if (opcion == "edictar") {
    fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        titulo: titulo.value,
        descripcion: descripcion.value,
        genero: genero.value,
        enlace: enlace.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => location.reload());
  }
  modalPeliculas.hide();
});
