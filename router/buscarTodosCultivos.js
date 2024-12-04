const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarTodosCultivos', (req, res) => {
    const { email_usuario } = req.body;  

    if (!email_usuario) {
        return res.status(400).send({ message: "Email do usuário é necessário" });
    }

    connection.query('SELECT * FROM cultivos WHERE email_usuario = ?', [email_usuario], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: "Erro ao buscar cultivos" });
        }
        res.send(result);
    });
});

module.exports = router;
