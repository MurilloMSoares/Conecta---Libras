/* ========================================
   CONECTALIBRAS
   FUNCIONALIDADES DO ATENDENTE
======================================== */


/* ----------------------------------------
   ELEMENTOS
---------------------------------------- */

const solicitacaoCliente =
    document.getElementById(
        "solicitacaoCliente"
    );

const campoResposta =
    document.getElementById(
        "campoResposta"
    );

const btnResponder =
    document.getElementById(
        "btnResponder"
    );

const respostaEnviada =
    document.getElementById(
        "respostaEnviada"
    );


/* ----------------------------------------
   ESCAPAR HTML
---------------------------------------- */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


/* ----------------------------------------
   MOSTRAR SOLICITAÇÃO
---------------------------------------- */

function atualizarSolicitacao() {

    const dados =
        obterDados();


    if (
        dados.mensagemCliente &&
        dados.mensagemCliente.trim() !== ""
    ) {

        solicitacaoCliente.innerHTML = `
            <p>
                ${escaparHTML(dados.mensagemCliente)}
            </p>
        `;

    } else {

        solicitacaoCliente.innerHTML = `
            <span>
                Nenhuma solicitação recebida.
            </span>
        `;

    }


    if (
        dados.respostaAtendente &&
        dados.respostaAtendente.trim() !== ""
    ) {

        respostaEnviada.textContent =
            "Última resposta: " +
            dados.respostaAtendente;

    }

}


/* ----------------------------------------
   RESPONDER
---------------------------------------- */

btnResponder.addEventListener(
    "click",
    function () {

        const resposta =
            campoResposta.value.trim();


        if (!resposta) {

            alert(
                "Digite uma resposta antes de enviar."
            );

            campoResposta.focus();

            return;

        }


        enviarRespostaAtendente(
            resposta
        );


        respostaEnviada.textContent =
            "✓ Resposta enviada: " +
            resposta;


        campoResposta.value = "";


        btnResponder.textContent =
            "✓ Resposta enviada!";


        setTimeout(
            function () {

                btnResponder.textContent =
                    "📤 Enviar resposta";

            },
            2000
        );

    }
);


/* ----------------------------------------
   CARREGAR AO ABRIR
---------------------------------------- */

atualizarSolicitacao();


/* ----------------------------------------
   ATUALIZAÇÃO AUTOMÁTICA
---------------------------------------- */

setInterval(
    atualizarSolicitacao,
    1000
);


/* ----------------------------------------
   ATUALIZAÇÃO ENTRE ABAS
---------------------------------------- */

window.addEventListener(
    "storage",
    function (evento) {

        if (
            evento.key ===
            CHAVE_CONECTALIBRAS
        ) {

            atualizarSolicitacao();

        }

    }
);