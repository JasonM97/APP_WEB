const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la conexión a la base de datos
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'formulario_contacto'
// });

// Conectar a la base de datos
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Conectado a la base de datos MySQL');
// });

// Ruta para procesar el formulario
// app.post('/submit-form', (req, res) => {
//     const { nombre, email, asunto, mensaje } = req.body;
//     const query = "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";

//     db.query(query, [nombre, email, asunto, mensaje], (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.send('Datos guardados correctamente');
//     });
// });

// Configurar la conexion a la base de datos
const dbURL = 'mongodb://localhost:27017/formulario_contacto';
mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => console.log('Conectado a la base de datos MongoDB'))
    .catch(err => console.error(err));

// Definir un esquema y modelo de Mongoose
const mensajeSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    asunto: String,
    mensaje: String
});

const Mensaje = mongoose.model('Mensaje' , mensajeSchema);

// Ruta para procesar el formulario hacia mongoDB
app.post('/submit-form' , async ( req , res ) => {
    const { nombre , email , asunto , mensaje } = req.body;
    try {
        const nuevoMensaje = new Mensaje({ nombre , email , asunto , mensaje });
        await nuevoMensaje.save();
        res.send('Datos guardados correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar los datos');
    }
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
