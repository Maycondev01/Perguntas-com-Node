const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine', 'ejs');
app.use(express.static("public")) // Informar aonde está os arquivos staticos

// Responsavel por traduzir os dados enviados pelo formulário para uma estrutura back-end
//Body Parser - Serve para eu pegar as requisições em Body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // Dados de formulário via Json.

// Rotas
// Encontrar tudo de Pergunta -> Raw = Dados de forma crua -> order -> Ordenar 
app.get('/', function (req, res) {
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC'] // ASC = CRESCENTE | DESC = DECRESCENTE
    ] }).then((perguntas) => {
        res.render("home", {
            perguntas: perguntas
        })
    })
});
// Renderizar a view perguntar
app.get("/perguntar", function (req, res) {
    res.render("perguntar");
});

// Criar dado 
app.post("/salvarpergunta", (req, res) => { // Rota Post é quando recebe dados de formulários
    var titulo = req.body.titulo;
    var descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    }).catch((e) => {
        console.log(e)
    })

});

app.get("/pergunta/:id", function(req,res) {
    var id = req.params.id;

    Pergunta.findOne({ // Model | Encontre Um Dado | Onde o Id = Id. Pesquiso uma pergunta no banco de dados
        where: {id: id} // Onde o Id recebe o Id
    }).then(pergunta => { // Se eu achar eu recebo na variável pergunta
        if(pergunta != undefined) { // Pergunta Acahada

            Resposta.findAll({ // Pesquiso por Respostas
                where: {perguntaId: pergunta.id}, // Onde tenha o perguntaId igual ao id de uma pergunta da página
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas // Passando respostas que eu pesquisei que tenham o perguntaId igual o id da pergunta da página para minha view
                });
            });
        } else { // Não Encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", function(req,res) { 
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId); // Exemplo: res.redirect("/pergunta/2")
    });
})


app.listen(3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Servidor Online!")
    }
})