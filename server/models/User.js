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
        unique: true,
        required: [true, 'correo necesario']
    },
    password: {
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    img: {
        type: String,
        required: false
    }, 
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        required: [false, 'autenticación requerida']
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);