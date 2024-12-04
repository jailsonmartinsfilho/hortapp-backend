const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarDetalhesCultivo', (req, res) => {
    const { planta } = req.body;

    console.log('Planta recebida:', planta);
    console.log('Requisição chegou ao cultivo');

    // Verifica se o campo 'planta' foi enviado na requisição
    if (!planta) {
        return res.status(400).send({ error: 'Planta não fornecida' });
    }

    console.log('Planta recebida:', planta);
    console.log('Requisição chegou ao cultivo');

    // Realiza a consulta no banco de dados
    connection.query('SELECT * FROM cultivos WHERE id_cultivo = ?', [planta], (err, results) => {
        console.log(results)
        if (err) {
            // Caso ocorra um erro na consulta
            console.log('Erro na consulta:', err);
            return res.status(500).send({ error: 'Erro ao consultar o banco de dados' });
        }

        // Caso a consulta seja bem-sucedida
        res.send(results);
    });
});

module.exports = router;