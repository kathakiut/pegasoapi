const ticketModelo = require("../modelos/TicketModelo");
const ticketOperaciones = {}

ticketOperaciones.crearTicket = async (req, res) => {
    try {
        const objeto = req.body;
        console.log(objeto);
        const ticket = new ticketModelo(objeto);
        const ticketGuardado = await ticket.save();
        res.status(201).send(ticketGuardado);
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
}

ticketOperaciones.buscarTickets = async (req, res)=>{
    try {
        const filtro = req.query;
        let listatickets;
        if (filtro.q != null) {
            listatickets = await ticketModelo.find({
                "$or" : [ 
                    {"cliente.nombres": { $regex:filtro.q, $options: "i" }},
                    {"cliente.apellidos": { $regex:filtro.q, $options: "i" }},
                    {"cliente.documento": { $regex:filtro.q, $options: "i" }},
                    {"cliente.teléfono": { $regex:filtro.q, $options: "i" }},
                    {"cliente.email": { $regex:filtro.q, $options: "i" }},
                    {"personal.nombres": { $regex:filtro.q, $options: "i" }},
                    {"personal.apellidos": { $regex:filtro.q, $options: "i" }},
                    {"personal.documento": { $regex:filtro.q, $options: "i" }},
                    {"personal.rol": { $regex:filtro.q, $options: "i" }},
                    { "asunto": { $regex:filtro.q, $options:"i" }},
                    { "solicitud": { $regex:filtro.q, $options:"i" }},
                    { "estado": { $regex:filtro.q, $options:"i" }}

                ]
            });
        }
        else {
            listatickets = await ticketModelo.find(filtro);
        }
        if (listatickets.length > 0){
            res.status(200).send(listatickets);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

ticketOperaciones.buscarTicket = async (req, res)=>{
    try {
        const id = req.params.id;
        const ticket = await ticketModelo.findById(id);
        if (ticket != null){
            res.status(200).send(ticket);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

ticketOperaciones.modificarTicket = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const datosActualizar = {
            personal: {
                nombres: body.asesor.nombres,
                apellidos: body.asesor.apellidos,
                documento: body.asesor.documento
                
            },
            fecha : body.fecha,
            asunto: body.asunto,
            solicitud: body.solicitud,
            estado: body.estado,
            cierre: body.cierre,
            fechaCierre: body.fechaCierre
        }
        
        const ticketActualizado = await ticketModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (ticketActualizado != null) {
            res.status(200).send(ticketActualizado);
        }
        else {
            res.status(404).send("No fue posible actualizar el ticket.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

ticketOperaciones.eliminarTicket = async (req, res)=>{
    try {
        const id = req.params.id;
        const ticket = await ticketModelo.findByIdAndDelete(id);
        if (ticket != null){
            res.status(200).send(ticket);
        } else {
            res.status(404).send("No fue posible borrar el ticket.");
        }
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

module.exports = ticketOperaciones;