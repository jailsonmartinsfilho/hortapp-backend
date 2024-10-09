const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarTodasPlantas', (req, res) => {
    const { textoPesquisaPassado } = req.body;

    connection.query('SELECT nome FROM plantas', (err, results) => {
        res.send(results);
    });
});

module.exports = router;