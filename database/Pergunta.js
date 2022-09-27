const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("perguntas", { // Model para pergunta
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela Conexão")
}) // SYNC = Sincronizar 

module.exports = Pergunta;