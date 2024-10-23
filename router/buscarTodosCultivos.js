const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarTodosCultivos', (req, res) => {
    connection.query('SELECT nome_planta, id_cultivo FROM cultivos', (err, result) => {
        res.send(result);
    });
});

module.exports = router;