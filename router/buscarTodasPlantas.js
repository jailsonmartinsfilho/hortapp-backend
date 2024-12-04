// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:08 de 04/12/2024.

const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarTodasPlantas', (req, res) => {
    connection.query('SELECT nome FROM plantas', (err, results) => {
        res.send(results);
    });
});

module.exports = router;