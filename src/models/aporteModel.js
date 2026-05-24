var database = require("../database/config")


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(aporteInicial, aporteMensal, tempoAnos, fkUsuario) {
    console.log("ACESSEI O APORTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", aporteInicial, aporteMensal, tempoAnos, fkUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO aporte (aporteInicial, aporteMensal, tempoAnos, fkUsuario) VALUES ('${aporteInicial}', '${aporteMensal}', '${tempoAnos}', '${fkUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function patrimonio(idUsuario) {
    console.log("ACESSEI O APORTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function patrimonio()");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT
        tipo,
        aporteInicial + aporteMensal * (tempoAnos * 12) AS totalInvestido,
        TRUNCATE(aporteInicial * POWER(1 + (rentabilidade / 100), tempoAnos)
        +
        (aporteMensal * (POWER(1 + (rentabilidade / 100), tempoAnos) - 1) / (POWER(1 + (rentabilidade / 100), 1/12) - 1)), 2) AS montanteFinal,
        TRUNCATE(aporteInicial * POWER(1 + (rentabilidade / 100), tempoAnos)
        +
        (aporteMensal * (POWER(1 + (rentabilidade / 100), tempoAnos) - 1) / (POWER(1 + (rentabilidade / 100), 1/12) - 1)) - (aporteInicial + aporteMensal * (tempoAnos * 12)), 2) AS totalJuros
        FROM aporte
        JOIN usuario ON fkUsuario = usuario.id
        JOIN perfil ON fkPerfil = perfil.id
        WHERE usuario.id = ${idUsuario};
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    patrimonio,
};