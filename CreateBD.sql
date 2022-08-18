CREATE TABLE peliculas(
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) UNIQUE,
    descripcion VARCHAR(120),
    genero VARCHAR(30),
    enlace VARCHAR(150)
);