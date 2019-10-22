const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.json('hola mundo');
})

app.get('/usuario', function (req, res){

    res.json ('get usuario');
});

app.post('/usuario', function (req, res){
    let body = req.body;

    if( body.nombre === undefined ){

        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        })
    } else {
        res.json ({
            body
        });
    }

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