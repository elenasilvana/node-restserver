const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/User');

app.get('/', function(req, res){
    res.json('hola mundo');
})

app.get('/usuario', function (req, res){

    res.json ('get usuario');
});

app.post('/usuario', function (req, res){
    let body = req.body;
    //create instance from user's mongoose schema
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if (err){
           return res.status(400).json({
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

app.put('/usuario/:id', function(req, res){
    let id = req.params.id;
    //_.pick() method is going to filter the valid keys
    let  body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //runValidators is for run de schema validators at the time 
    //an update request is recived 
    Usuario.findByIdAndUpdate(id, body, { new : true, runValidators: true }, (err, usuarioDB) => {
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
    })
});

app.delete('/usuario', function(req, res){
    res.json('user has been deleted');
});

module.exports = app;