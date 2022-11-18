const ClienteModelo = require("../modelos/ClienteModelo");
const bcrypt = require("bcrypt");
const LoginClienteOperaciones = {};

const compararPassword = async (recibido, guardado) => {
    return await bcrypt.compare(recibido, guardado);
}

LoginClienteOperaciones.login = async (req, res) => {
    try {
        const usuario = req.body.usuario;
        let password = req.body.password;
        console.log(req.body);
        const cliente = await ClienteModelo.findOne({ usuario: usuario });
        console.log(cliente);
        if (cliente != null) {
            const result = await compararPassword(password, cliente.password);
            console.log(result);
            if (result) {
                const acceso = {
                    id: cliente._id,
                    nombres: cliente.nombres,
                    apellidos:cliente.apellidos,
                    usuario: cliente.usuario,
                    documento: cliente.identificacion,
                    email: cliente.email,
                    es_admin: cliente.es_admin
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
module.exports=LoginClienteOperaciones;