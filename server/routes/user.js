const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/User");

app.get("/", function(req, res) {});

app.get("/usuario", function(req, res) {
  //desde qué registro
  let desde = Number(req.query.desde) || 0;
  console.log(typeof desde);

  //cúantos usuarios quiero por página
  let limite = Number(req.query.limite) || 5;
  console.log(typeof limite);

  // de esta manera estamos específiando que solo queremos recibir esos keys: nombre, email
  //Usuario.find({}, "nombre email")
  Usuario.find({})
    //  con esto implementamos la paginación, pero además damos la opción de elegir cuantos mostrar
    // en la ruta se llamaría de esta manera localhost:4000/usuario?=desde3
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      //obtener la cuenta de la colección
      Usuario.count({}, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          conteo
        });
      });
    });
});

app.post("/usuario", function(req, res) {
  let body = req.body;
  //create instance from user's mongoose schema
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        //bad request : no fue hecho correctamente
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  //_.pick() method is going to filter the valid keys
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  //runValidators is for run de schema validators at the time
  //an update request is recived
  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      deletedUser
    });
  });
});

module.exports = app;
