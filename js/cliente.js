/* ========================================
   CONECTALIBRAS
   FUNCIONALIDADES DO CLIENTE
======================================== */


/* ----------------------------------------
   ELEMENTOS
---------------------------------------- */

const btnMicrofone =
    document.getElementById("btnMicrofone");

const iconeMicrofone =
    document.getElementById("iconeMicrofone");

const statusMicrofone =
    document.getElementById("statusMicrofone");

const textoTranscrito =
    document.getElementById("textoTranscrito");

const campoMensagem =
    document.getElementById("campoMensagem");

const btnEnviar =
    document.getElementById("btnEnviar");

const respostaAtendente =
    document.getElementById("respostaAtendente");


/* ----------------------------------------
   VARIÁVEL DA MENSAGEM
---------------------------------------- */

let mensagemAtual = "";


/* ----------------------------------------
   MICROFONE
---------------------------------------- */

let reconhecimento = null;

let ouvindo = false;


/* ----------------------------------------
   VERIFICAR SUPORTE
---------------------------------------- */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    reconhecimento = new SpeechRecognition();

    reconhecimento.lang = "pt-BR";

    reconhecimento.continuous = true;

    reconhecimento.interimResults = true;


    /* ------------------------------------
       QUANDO COMEÇAR A OUVIR
    ------------------------------------ */

    reconhecimento.onstart = function () {

        ouvindo = true;

        btnMicrofone.classList.add("ouvindo");

        iconeMicrofone.textContent = "🔴";

        statusMicrofone.textContent =
            "Ouvindo... fale agora";

    };


    /* ------------------------------------
       RESULTADO DA FALA
    ------------------------------------ */

    reconhecimento.onresult = function (evento) {

        let textoFinal = "";

        let textoParcial = "";


        for (
            let i = evento.resultIndex;
            i < evento.results.length;
            i++
        ) {

            const resultado =
                evento.results[i];

            if (resultado.isFinal) {

                textoFinal +=
                    resultado[0].transcript;

            } else {

                textoParcial +=
                    resultado[0].transcript;

            }

        }


        const textoCompleto =
            textoFinal || textoParcial;


        if (textoCompleto.trim() !== "") {

            mensagemAtual =
                textoCompleto.trim();

            campoMensagem.value = mensagemAtual;

            textoTranscrito.textContent =
                mensagemAtual;

        }

    };


    /* ------------------------------------
       QUANDO PARAR
    ------------------------------------ */

    reconhecimento.onend = function () {

        ouvindo = false;

        btnMicrofone.classList.remove(
            "ouvindo"
        );

        iconeMicrofone.textContent = "🎤";

        statusMicrofone.textContent =
            "Opcional: toque para falar";

    };


    /* ------------------------------------
       ERRO
    ------------------------------------ */

    reconhecimento.onerror = function (evento) {

        console.error(
            "Erro no reconhecimento:",
            evento.error
        );

        ouvindo = false;

        btnMicrofone.classList.remove(
            "ouvindo"
        );

        iconeMicrofone.textContent = "🎤";

        statusMicrofone.textContent =
            "Não foi possível utilizar o microfone";

    };


    /* ------------------------------------
       CLIQUE NO MICROFONE
    ------------------------------------ */

    btnMicrofone.addEventListener(
        "click",
        function () {

            if (ouvindo) {

                reconhecimento.stop();

            } else {

                try {

                    reconhecimento.start();

                } catch (erro) {

                    console.error(erro);

                }

            }

        }
    );


} else {

    statusMicrofone.textContent =
        "Seu navegador não suporta reconhecimento de voz";

    btnMicrofone.disabled = true;

}


/* ----------------------------------------
   MENSAGEM DIGITADA
---------------------------------------- */

campoMensagem.addEventListener(
    "input",
    function () {

        mensagemAtual =
            campoMensagem.value.trim();

        textoTranscrito.textContent =
            mensagemAtual ||
            "Sua mensagem aparecerá aqui...";

    }
);


/* ----------------------------------------
   ENVIAR MENSAGEM
---------------------------------------- */

btnEnviar.addEventListener(
    "click",
    function () {

        const mensagem =
            campoMensagem.value.trim() ||
            mensagemAtual.trim();


        if (!mensagem) {

            alert(
                "Digite ou fale uma mensagem antes de enviar."
            );

            return;

        }


        enviarMensagemCliente(mensagem);


        btnEnviar.textContent =
            "✓ Mensagem enviada!";


        setTimeout(
            function () {

                btnEnviar.textContent =
                    "📤 Enviar mensagem";

            },
            2000
        );

    }
);


/* ----------------------------------------
   ATALHOS RÁPIDOS
---------------------------------------- */

const atalhos =
    document.querySelectorAll(".atalho");


atalhos.forEach(
    function (atalho) {

        atalho.addEventListener(
            "click",
            function () {

                const mensagem =
                    atalho.dataset.mensagem;


                mensagemAtual = mensagem;

                campoMensagem.value = mensagem;


                textoTranscrito.textContent =
                    mensagem;


                enviarMensagemCliente(
                    mensagem
                );


                btnEnviar.textContent =
                    "✓ Mensagem enviada!";


                setTimeout(
                    function () {

                        btnEnviar.textContent =
                            "📤 Enviar mensagem";

                    },
                    2000
                );

            }
        );

    }
);


/* ----------------------------------------
   VERIFICAR RESPOSTA DO ATENDENTE
---------------------------------------- */

function atualizarResposta() {

    const dados =
        obterDados();


    if (
        dados.respostaAtendente &&
        dados.respostaAtendente.trim() !== ""
    ) {

        respostaAtendente.innerHTML = `
            <p>${escaparHTML(dados.respostaAtendente)}</p>
        `;

    }

}


/* ----------------------------------------
   PROTEÇÃO CONTRA HTML
---------------------------------------- */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent = texto;

    return elemento.innerHTML;

}


/* ----------------------------------------
   ATUALIZAÇÃO AUTOMÁTICA
---------------------------------------- */

atualizarResposta();


setInterval(
    atualizarResposta,
    1000
);


/* ----------------------------------------
   ATUALIZAÇÃO QUANDO MUDA DE ABA
---------------------------------------- */

window.addEventListener(
    "storage",
    function (evento) {

        if (
            evento.key ===
            CHAVE_CONECTALIBRAS
        ) {

            atualizarResposta();

        }

    }
);