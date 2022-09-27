const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('resposta', { // Model para Resposta
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({ force: false }); // Sincronizar a tabela | Não força caso já exista a tabela

module.exports = Resposta; // Para usar o model fora do arquivo