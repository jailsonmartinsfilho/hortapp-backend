const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/inserirCadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    const dadosUsuario = { nome, email, senha };

    connection.query('INSERT INTO usuarios SET ?', dadosUsuario, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200); 
        }
    });
});

module.exports = router;
