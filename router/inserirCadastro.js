// Concluído, revisado, otimizado e padronizado por Jailson Martins às 01:50 de 04/12/2024.

const { Router } = require('express');
const bcrypt = require('bcryptjs');
const router = Router();
const connection = require('../database.js');

router.post('/inserirCadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    const idUnico = Date.now(); 

    bcrypt.hash(senha, 10, (err, senhaCriptografada) => {
        const dadosUsuario = { id: idUnico, nome, email, senha: senhaCriptografada };

        connection.query('INSERT INTO usuarios SET ?', dadosUsuario, (err, result) => {
            res.send({ id: idUnico, nome, email});
        });
    });
});

module.exports = router;