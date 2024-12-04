const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/realizarLogin', (req, res) => {
    console.log('requisiçao chegou')
    const { email, senha } = req.body;

    connection.query('SELECT nome, senha FROM usuarios WHERE email = ?', email, (err, result) => {
        if (err) {
            console.error(err);
            console.log('erro')
            res.sendStatus(500);
            return;
        }
        
        if (result.length === 0) {
            res.sendStatus(404);
            console.log('erro')
        } else if (result[0].senha === senha) {
            const nomeUsuario = result[0].nome;
            res.status(200).send({ message: 'Login bem-sucedido', nome: nomeUsuario });
        } else {
            res.sendStatus(401);  
            console.log('erro')
        }
    });
});

module.exports = router;
