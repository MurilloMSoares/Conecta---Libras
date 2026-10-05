/* ========================================
   CONECTALIBRAS - APP
   Funções compartilhadas
======================================== */


/* ----------------------------------------
   CHAVE DO ARMAZENAMENTO
---------------------------------------- */

const CHAVE_CONECTALIBRAS = "conectaLibrasDados";


/* ----------------------------------------
   PEGAR DADOS
---------------------------------------- */

function obterDados() {

    const dadosSalvos =
        localStorage.getItem(CHAVE_CONECTALIBRAS);

    if (!dadosSalvos) {

        return {
            mensagemCliente: "",
            respostaAtendente: "",
            horarioMensagem: "",
            horarioResposta: ""
        };

    }

    try {

        return JSON.parse(dadosSalvos);

    } catch (erro) {

        console.error(
            "Erro ao ler dados:",
            erro
        );

        return {
            mensagemCliente: "",
            respostaAtendente: "",
            horarioMensagem: "",
            horarioResposta: ""
        };

    }
}


/* ----------------------------------------
   SALVAR DADOS
---------------------------------------- */

function salvarDados(dados) {

    localStorage.setItem(
        CHAVE_CONECTALIBRAS,
        JSON.stringify(dados)
    );

}


/* ----------------------------------------
   ENVIAR MENSAGEM DO CLIENTE
---------------------------------------- */

function enviarMensagemCliente(mensagem) {

    const dados = obterDados();

    dados.mensagemCliente = mensagem;

    dados.horarioMensagem =
        new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    salvarDados(dados);

}


/* ----------------------------------------
   ENVIAR RESPOSTA DO ATENDENTE
---------------------------------------- */

function enviarRespostaAtendente(resposta) {

    const dados = obterDados();

    dados.respostaAtendente = resposta;

    dados.horarioResposta =
        new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    salvarDados(dados);

}