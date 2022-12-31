// const dataNascimento = document.querySelector("#nascimento");

// dataNascimento.addEventListener("blur", (evento) => {
//     validaDataNascimento(evento.target)
// });


export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {

        input.parentElement.classList.remove("input-conatainer--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "mostraMensagemDeErro(tipoDeInput, input)";
    }
}

// vetor de strings
const tiposDeErro = [
    "customError",
    "patterMismatch",
    "typeMismatch",
    "valueMissing",
]

const mensagemDeErro = {

    nome: {
        valueMissing: "O campo nome não pode estar vazio."
    },
    email: {
        typeMismatch: "O emai digitado não é válido.",
        valueMissing: "O campo de e-mail não pode estar vazio."
    },
    senha: {
        patterMismatch: "A senha deve conter somente letras minusculas.",
        valueMissing: "O campo da senha não pode estar vazio."
    },
    dataNascimento: {
        customError: "Você deve ser maior que 18 anos para se cadastrar.",
        valueMissing: "O campo data de nascimento não pode estar vazio."
    }
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = "";
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro];
        }
    })

    return mensagem;
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    let mensagem = "";

    maiorQue18(dataRecebida);

    if (!maiorQue18(dataRecebida)) {
        mensagem = "Você deve ser maior que 18 anos para se cadastrar.";
    }

    input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
    const dataAtual = new Date();

    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual;

}