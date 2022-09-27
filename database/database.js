const Sequelize = require("sequelize");

// Novo Banco de dados Sequelize | nome do esquema | usuario(padrão): root | senha: 182122 
const connection = new Sequelize('guiaperguntas', 'root', '182122', {
    host: 'localhost', // onde está rodando
    dialect: 'mysql', // qual tipo de banco de dados vai ser a conexão
    logging: false
});

module.exports = connection;