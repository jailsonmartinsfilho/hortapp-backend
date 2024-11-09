const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hortapp',
  port: 3306
});

connection.connect((err) => {
    err ? console.error('Erro de conexão:', err) : console.log('database.js diz: Conectado ao banco de dados hortapp');
});

module.exports = connection;