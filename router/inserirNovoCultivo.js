const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/inserirNovoCultivo', (req, res) => {
    const {planta} = req.body;

    console.log(planta)

    console.log('inseirNovoCultivo.js diz: Back-end alcançado.')

    res.send('wa');

    // connection.query('SELECT nome, tempo_cultivo, modo_cultivo, clima_ideal, tipo_solo FROM plantas WHERE nome = ?', [planta], (err, results) => {
    //     console.log(err)
    //     res.send(results);
    // });
    // });
});

module.exports = router;