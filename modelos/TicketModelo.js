const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth()+1;
const anio = fechaActual.getFullYear();
const fecha = (anio+"/"+mes+"/"+dia);
const horaActual = fechaActual.getHours();
const min = fechaActual.getMinutes();
const hora = (horaActual+":"+min)
const tiempoIn = (fecha+" "+hora);
const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
    clientes:{
        nombres:{type: String, maxLength: 60, required: false, unique: false},
        apellidos:{type: String, maxLength: 60, required: false, unique: false},
        documento:{type: String, maxLength: 60, required: false, unique: false},
        telefono:{type: String, maxLength: 60, required: false, unique: false},
        correo:{type: String, maxLength: 60, required: false, unique: false}
    },
    personal:{
        nombres:{type: String, maxLength: 60, required: false, unique: false},
        apellidos:{type: String, maxLength: 60, required: false, unique: false},
        documento:{type: String, maxLength: 60, required: false, unique: false},
        rol:{type: String, maxLength: 60, required: false, unique: false}
    },
    fecha:  { type : String, default: tiempoIn, required: false, unique: false },
    asunto: { type : String, maxLength: 150, required: true, unique: false },
    solicitud: { type : String, maxLength: 400, required: true, unique: false },
    estado: { type : String, maxLength: 50, required: false, unique: false },
    cierre: { type : String, maxLength: 400, required: false, unique: false },
    fechaCierre:  { type : String, required: false, unique: false }
  
});

module.exports = mongoose.model("Tickets", TicketSchema);