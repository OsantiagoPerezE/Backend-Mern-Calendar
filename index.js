const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConecction } = require('./database/config');

console.log(process.env);
// crear servidor de express

const app = express();

//Base de Datos
dbConecction();

// Cors
app.use(cors());

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD: Eventos

// Escuchar peticiones

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
