// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:05 de 04/12/2024.

const { Router } = require('express');
const bcrypt = require('bcryptjs');  
const router = Router();
const connection = require('../database.js');

router.post('/realizarLogin', (req, res) => {
    console.log('requisição chegou');
    const { email, senha } = req.body;

    connection.query('SELECT nome, senha FROM usuarios WHERE email = ?', email, (err, result) => {
        if (err) {
            console.error(err);
            console.log('erro');
            res.sendStatus(500);
            return;
        }
        
        if (result.length === 0) {
            res.sendStatus(404);  
            console.log('erro');
        } else {
            bcrypt.compare(senha, result[0].senha, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }

                if (isMatch) {
                    const nomeUsuario = result[0].nome;
                    res.status(200).send({ message: 'Login bem-sucedido', nome: nomeUsuario });
                } else {
                    res.sendStatus(401);
                    console.log('erro');
                }
            });
        }
    });
});

module.exports = router;