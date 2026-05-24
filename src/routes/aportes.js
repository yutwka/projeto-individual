var express = require("express");
var router = express.Router();

var aporteController = require("../controllers/aporteController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    aporteController.cadastrar(req, res);
})

router.get("/patrimonio/:idUsuario", function (req, res) {
    aporteController.patrimonio(req, res);
})

module.exports = router;
