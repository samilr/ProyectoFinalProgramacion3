const url = "http://localhost:3000/api/peliculas/";
var contenedor = document.querySelector("section");
let resultados = "";

const formPelicula = document.querySelector("form");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const genero = document.getElementById("genero");
const enlace = document.getElementById("enlace");
let opcion = "";


const mostrar = (peliculas) => {
    peliculas.forEach((pelicula) => {
        resultados += `

                    <div class ="card">
						<br>
					<h2 class="titulo-card">${pelicula.titulo}</h2>
						<iframe class="frame" width="340" height="315" src="${pelicula.enlace}" title="YouTube video player" frameborder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						<h3 class="des">Descripcion:</h3>
					<p class="descripcion">
						${pelicula.descripcion}
						<br>
                        <br>
					</p>
                    <h3 class="gen">Generos:</h3>
                    <p class="gen">${pelicula.genero}</p>
                    <br>
                    </div>


    `;
    });
    contenedor.innerHTML = resultados;
};



fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .then((data) => mostrarTrailers(data))
    .catch((error) => console.log(error));

