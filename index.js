//Importación
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require("./conexion");

//Configuración
const app = express();
const env = process.env;
const port = env.PORT || '8080';

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Arranque
app.set("Puerto",port)
app.listen(port, () => {
    console.log("API iniciado en puerto " + port);
});
//Rutas base
app.get('/', (req, res) => {
    res.send("API iniciado ");
});

app.use("/clientes", require("./rutas/ClienteRutas"));
app.use("/tickets", require("./rutas/TicketRutas"));
app.use("/personal", require("./rutas/PersonalRutas"));
app.use("/clientes/login", require("./rutas/LoginClienteRutas"));
app.use("/personal/login", require("./rutas/LoginPersonalRutas"));
