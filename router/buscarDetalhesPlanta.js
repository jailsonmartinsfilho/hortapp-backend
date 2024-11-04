const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarDetalhesPlanta', (req, res) => {
    const {planta} = req.body;

    connection.query('SELECT nome, tempo_cultivo, modo_cultivo, clima_ideal, tipo_solo FROM plantas WHERE nome = ?', [planta], (err, results) => {
        res.send(results);
    });
});

module.exports = router;