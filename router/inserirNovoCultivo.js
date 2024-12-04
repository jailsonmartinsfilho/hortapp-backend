const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.post('/inserirNovoCultivo', (req, res) => {

    console.log(req.body)
    
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


    // Data atual como início do cultivo
    const data_inicio = new Date();

    // Calcula a data estimada de colheita
    const data_estimativa_colheita = new Date(data_inicio);
    data_estimativa_colheita.setDate(data_inicio.getDate() + tempo_cultivo);

    // Dados do cultivo a serem inseridos no banco de dados
    const dadosCultivo = {
        email_usuario,
        nome_planta,
        nome_cientifico,
        data_inicio: data_inicio,  // Formato de data (YYYY-MM-DD)
        data_estimativa_colheita: data_estimativa_colheita,  // Formato de data
        progresso_cultivo: progresso_cultivo || 0,  // Caso o progresso não seja informado, iniciar como 0
        quantidade_rega,
        etiqueta_sol,
        etiqueta_dificuldade,
        etiqueta_agua,
        etiqueta_tempo,
    };

    // Insere os dados no banco de dados
    connection.query('INSERT INTO cultivos SET ?', dadosCultivo, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Erro ao inserir cultivo.');
        }
    
        res.status(201).send('Cultivo inserido com sucesso!');
    });
});

module.exports = router;
