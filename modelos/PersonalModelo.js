const mongoose = require("mongoose");

const personalSchema = mongoose.Schema({
    nombres: { type : String, maxLength: 80, required: true, unique: false },
    apellidos: { type : String, maxLength: 80, required: true, unique: false },
    documento:  { type : String, maxLength: 10, required: true, unique: true },
    telefono : { type : String, required: true, unique: false },
    correo: { type : String, maxLength: 120, required: true, unique: true },
    usuario: { type : String, maxLength: 20, required: true, unique: true },
    password: { type : String, maxLength: 200, required: true, unique: false },
    rol: { type : String, maxLength: 80, required: true, unique: false },
    admin: { type:Boolean, required:false }
});

module.exports = mongoose.model("Personal", personalSchema);

