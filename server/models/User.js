const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido"
};

//definir las reglas y controles
let usuarioSchema = new Schema({
  nombre: {
    //definir restricciones
    type: String,
    required: [true, "el nombre es necesario"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "correo necesario"]
  },
  password: {
    type: String,
    required: [true, "la contrasena es obligatoria"]
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    required: [false, "autenticación requerida"]
  }
});

//modify when prints schema to JSON
usuarioSchema.methods.toJSON = function() {
  //this function should be classic function because this is needed
  //to hide password key from the response object
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("usuario", usuarioSchema);
