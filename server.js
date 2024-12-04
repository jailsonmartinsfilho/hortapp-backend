// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:05 de 04/12/2024.

const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const connection = require('./database.js');

server.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
    server.use(cors());
    next();
});

server.use(bodyParser.json()); 

const buscarTodasPlantas = require('./router/buscarTodasPlantas.js');
const buscarDetalhesPlanta = require('./router/buscarDetalhesPlanta.js');
const inserirNovoCultivo = require('./router/inserirNovoCultivo.js');
const inserirCadastro = require('./router/inserirCadastro.js');
const realizarLogin = require('./router/realizarLogin.js');
const buscarTodosCultivos = require('./router/buscarTodosCultivos.js');
const buscarDetalhesCultivo = require('./router/buscarDetalhesCultivo.js');
const verificarEmail = require('./router/verificarEmail.js');

server.use('/', buscarTodasPlantas, buscarDetalhesPlanta, inserirNovoCultivo, inserirCadastro, realizarLogin, buscarTodosCultivos, buscarDetalhesCultivo, verificarEmail);
server.use(express.static(path.join(__dirname, 'public')));

server.listen(8083, () =>{
    console.log("Servidor iniciado na porta 8083: http://localhost:8083");
});