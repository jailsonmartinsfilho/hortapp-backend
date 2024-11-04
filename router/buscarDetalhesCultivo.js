const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarDetalhesCultivo', (req, res) => {
    const {planta} = req.body;
    
    connection.query('SELECT * FROM cultivos WHERE id_cultivo = ?', [planta], (err, results) => {
        res.send(results);
    });
});

module.exports = router;