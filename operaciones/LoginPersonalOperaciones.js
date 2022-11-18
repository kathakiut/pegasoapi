const personalModelo = require("../modelos/PersonalModelo");
const bcrypt = require("bcrypt");
const LoginPersonalOperaciones = {};

const compararPassword = async (recibido, guardado) => {
    return await bcrypt.compare(recibido, guardado);
}

LoginPersonalOperaciones.login = async (req, res) => {
    try {
        const usuario = req.body.usuario;
        let password = req.body.password;
        console.log(req.body);
        const personal = await personalModelo.findOne({ usuario: usuario });
        console.log(personal);
        if (personal != null) {
            const result = await compararPassword(password, personal.password);
            console.log(result);
            if (result) {
                const acceso = {
                    id: personal._id,
                    nombres: personal.nombres,
                    apellidos: personal.apellidos,
                    documento: personal.documento,
                    correo: personal.correo,
                    usuario: personal.usuario,
                    rol: personal.rol,                    
                    es_admin: personal.es_admin                    
                }
            }
            rest.status(200).json(acceso);
        }
        else {
            rest.status(401).send("Usuario o contraseña invalidos");
        }
    
    } catch (error) {
    console.log(error);
    rest.status(400).json(error);
}
}
module.exports=LoginPersonalOperaciones;