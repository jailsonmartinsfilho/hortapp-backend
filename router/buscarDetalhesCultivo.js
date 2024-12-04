// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:05 de 04/12/2024.

const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/buscarDetalhesCultivo', (req, res) => {
    const { planta } = req.body;

    if (!planta) {
        return res.status(400).send({ error: 'Planta não fornecida' });
    }

    connection.query('SELECT * FROM cultivos WHERE id_cultivo = ?', [planta], (err, results) => {
        console.log(results)
        if (err) {
            console.log('Erro na consulta:', err);
            return res.status(500).send({ error: 'Erro ao consultar o banco de dados' });
        }

        res.send(results);
    });
});

module.exports = router;