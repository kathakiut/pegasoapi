const clienteModelo = require("../modelos/ClienteModelo");
const bcrypt = require ("bcrypt");
const clienteOperaciones = {};

const cifrarPassword = async (password) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(password, salt);
}

clienteOperaciones.crearCliente = async (req, res)=>{
    try {
        const body = req.body;
        body.password = await cifrarPassword(body.password);
        const cliente = new clienteModelo(body);
        const clienteGuardado = await cliente.save();
        res.status(201).send(clienteGuardado);
    } catch (error) {
        res.status(400).send("La petición está errada. "+error);
    }
}

clienteOperaciones.buscarClientes = async (req, res)=>{
    try {
        const filtro = req.query;
        let listaclientes;
        if (filtro.q != null) {
            listaclientes = await clienteModelo.find({
                "$or" : [ 
                    { "nombres": { $regex:filtro.q, $options:"i" }},
                    { "apellidos": { $regex:filtro.q, $options:"i" }},
                    { "documento": { $regex:filtro.q, $options:"i" }},
                    { "usuario": { $regex:filtro.q, $options:"i" }}
                ]
            });
        }

        else {
            listaclientes = await clienteModelo.find(filtro);
        }

        if (listaclientes.length > 0) {
            res.status(200).send(listaclientes);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.buscarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findById(id);
        if (cliente != null ){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No se encontró el cliente");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.modificarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.password != null) {
            body.password = await cifrarPassword (body.password)
        }
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            telefono: body.telefono,
            correo: body.correo,
            password: body.password
        }
        const clienteActualizado = await clienteModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (clienteActualizado != null) {
            res.status(200).send(clienteActualizado);
        }
        else {
            res.status(404).send("No fue posible actualizar el cliente.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

clienteOperaciones.eliminarCliente = async (req, res)=>{
    try {
        const id = req.params.id;
        const cliente = await clienteModelo.findByIdAndDelete(id);
        if (cliente != null){
            res.status(200).send(cliente);
        } else {
            res.status(404).send("No fue posible borrar el cliente.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

module.exports = clienteOperaciones;