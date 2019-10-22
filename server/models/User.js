const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//definir las reglas y controles 
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    }, 
    email: {
        type: String, 
        required: [true, 'correo necesario']
    },
    password: {
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    img: {
        type: String,
    }, 
    role: {

    },
    estado: {

    },
    google:{
        type: Boolean,
        required: [true, 'autenticación requerida']
    }
});