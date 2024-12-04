// Concluído, revisado, otimizado e padronizado por Jailson Martins às 15:07 de 04/12/2024.

const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/inserirNovoCultivo', (req, res) => {
    const {
        email_usuario,
        nome_planta,
        nome_cientifico,
        tempo_cultivo,
        progresso_cultivo,
        quantidade_rega,
        etiqueta_sol,
        etiqueta_dificuldade,
        etiqueta_agua,
        etiqueta_tempo,
    } = req.body;

    const data_inicio = new Date();

    const data_estimativa_colheita = new Date(data_inicio);
    data_estimativa_colheita.setDate(data_inicio.getDate() + tempo_cultivo);

    const dadosCultivo = {
        email_usuario,
        nome_planta,
        nome_cientifico,
        data_inicio: data_inicio,
        data_estimativa_colheita: data_estimativa_colheita,
        progresso_cultivo: progresso_cultivo || 0,
        quantidade_rega,
        etiqueta_sol,
        etiqueta_dificuldade,
        etiqueta_agua,
        etiqueta_tempo,
    };

    connection.query('INSERT INTO cultivos SET ?', dadosCultivo, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Erro ao inserir cultivo.');
        }

        res.status(201).send('Cultivo inserido com sucesso!');
    });
});

module.exports = router;