'use strict';

const express = require('express');
const app = express();

app.use(express.json());

let pessoas = require('./pessoas.js');
let veiculos = require('./veiculos.js');

app.get('/', (req, res) => {
    let result = [pessoas, veiculos]
    res.send(result);
});

app.get('/pessoas', (req, res) => {
    res.send(pessoas);
});

app.get('/pessoa/:id', (req, res) => {
    let pessoa = pessoas.find(pessoa => pessoa.id == req.params.id);
    if (!pessoa) {
        res.status(404).send({
            error: "Entity not found."
        });
        return;
    } 
    
    res.send({
        pessoa: pessoa,
        link_veiculo: {
            href: 'pessoa/' + pessoa.veiculo_id + '/veiculo'
        }
    });
});

app.get('/pessoa/:id/veiculo', (req, res) => {
    let pessoa = pessoas.find(pessoa => pessoa.id == req.params.id);
    if (!pessoa) {
        res.status(404).send();
        return;
    }

    let veiculo = veiculos.filter(veiculo => veiculo.id == pessoa.veiculo_id);
    res.status(200).send(veiculo);
});

app.listen(3000, '0.0.0.0');
console.log('Listening on port 3000')