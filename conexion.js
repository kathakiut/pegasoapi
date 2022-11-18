const mongoose = require("mongoose");

const username = "admin";
const password = "admin";
const database = "PegasoBackend";
const URI = "mongodb+srv://"+username+":"+password+"@cluster0.foa7kxc.mongodb.net/"+database+"?retryWrites=true&w=majority";

const conectar = async () => {
    /*try {
        await mongoose.connect(URI);
        console.log("Atlas está en linea");
    } catch (error) {
        
        console.log("Error de conexión. " +error);
    }*/
    
    mongoose.connect(URI)
        .then(()=>{ console.log("Atlas está en linea"); })
        .catch(()=>{ console.log("Error de conexión. "+error); })
    
}
conectar();

module.exports = mongoose;