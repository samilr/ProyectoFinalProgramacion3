//No tocar el codigo desde aqui hacia abajo
const express = require ('express');
const mysql = require('mysql');
const cors = require('cors');
const { result } = require('lodash');
const app = express();

app.use(express.json());
app.use(cors());

//Parametros
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'APPSG'
});

//Conexion a la base de datos
conexion.connect((error)=>{
    if(error){
        throw error;
    }
    else{
        console.log('Conexion exitosa');
    } 
})


const puerto = process.env.PUERTO || 3000;
//Ruta de inicio
app.get('/', function(req,res){
    res.send('Ruta INICIO');
});

app.listen('3000', () => {
    console.log('Server on port: ' + puerto);
});

//No tocar el codigo desde aqui hacia arriba

//Mostrar registros de la BD
app.get('/api/peliculas/', (req, res) => {
    conexion.query('SELECT * FROM peliculas', (error, fila) => {
        if(error){
            throw error;
        }
        else{
            res.send(fila);
        }
    });
});

//Insertar datos en la bd
app.post('/api/peliculas', (req, res) => {
    let datos = {titulo:req.body.titulo, descripcion:req.body.descripcion, genero:req.body.genero, enlace:req.body.enlace};
    let sql = "INSERT INTO peliculas SET ?";
    conexion.query(sql, datos, (error, resultado) =>{
        if(error){
            throw error;
        }
        else{
            Object.assign(datos, {id: result.insertid})
            res.send(datos);
        }   
    });       
});


//Actualizar datos en la BD
app.put('/api/peliculas/:id', (req, res) => {

    let id = req.params.id;
    let titulo = req.body.titulo, descripcion = req.body.descripcion, 
    genero = req.body.genero, enlace = req.body.enlace;
    
    let sql = "UPDATE peliculas SET titulo = ?, descripcion = ?, genero = ?, enlace = ? WHERE id = ?";
    conexion.query(sql, [titulo, descripcion, genero, enlace, id], (error, resultados) => {
        if(error){
            throw error;
        }
        else{
            res.send(resultados);
        }

    })  
});

//Eliminar datos en la BD
app.delete('/api/peliculas/:id', (req, res) => {
    conexion.query('DELETE FROM peliculas WHERE id = ?', [req.params.id], (error, resultados) => {
        if(error){
            throw error;
        }
        else{
            res.send(resultados);
        }
    });

});








