const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/inserirNovoCultivo', (req, res) => {
    const { planta, email } = req.body;
    connection.query('SELECT * FROM plantas WHERE nome = ?', planta, (err, results) => {
        const { nome, tempo_cultivo, modo_cultivo, clima_ideal, tipo_solo } = results[0];
        const data_inicio = new Date();
        const tempoCultivoEmDias = parseInt(tempo_cultivo.split('-')[1].trim());
        const data_estimativa_colheita = new Date(data_inicio);
        data_estimativa_colheita.setDate(data_estimativa_colheita.getDate() + tempoCultivoEmDias);

        const dadosCultivo = { email_usuario: email, nome_planta: nome, data_inicio: data_inicio, data_estimativa_colheita: data_estimativa_colheita, progresso_cultivo: 0};

        connection.query('INSERT INTO cultivos SET ?', dadosCultivo, (err, result) => {
            if (err) {
                res.sendStatus(500);
                console.log(err)
            }
            res.status(201)
        });
    });
});

module.exports = router;
