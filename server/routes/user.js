const express = require('express');
const app = express();
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
        password: body.password,
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

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res){
    res.json('user has been deleted');
});

module.exports = app;