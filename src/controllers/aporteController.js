var aporteModel = require("../models/aporteModel");
// var aquarioModel = require("../models/aquarioModel");

function cadastrar(req, res) {
    var aporteInicial = req.body.aporteInicialServer;
    var aporteMensal = req.body.aporteMensalServer;
    var tempoAnos = req.body.tempoAnosServer;
    var fkUsuario = req.body.fkUsuarioServer;

    // Faça as validações dos valores
    if (aporteMensal == undefined) {
        res.status(400).send("Seu aporte mensal está undefined!");
    } else if (tempoAnos == undefined) {
        res.status(400).send("Seu tempo de aporte está undefined!");
    } else if(fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        aporteModel.cadastrar(aporteInicial, aporteMensal, tempoAnos, fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}