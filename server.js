const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tsuki1904',
    database: 'formulario_contacto'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para procesar el formulario
app.post('/submit-form', (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;
    const query = "INSERT INTO mensajes (nombre, email, asunto, mensaje) VALUES (?, ?, ?, ?)";

    db.query(query, [nombre, email, asunto, mensaje], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Datos guardados correctamente');
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
