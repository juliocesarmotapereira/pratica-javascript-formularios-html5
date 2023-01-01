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
        input.parentElement.classList.add("input-container--invalido")
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = mostraMensagemDeErro(tipoDeInput, input);
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
    },
    cpf: {
        customError: 'O CPF digitado não é válido.',
        valueMissing: 'O campo de CPF não pode estar vazio.'
    }

}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)

    cpf: input => validaCPF(input)
}

// FUNÇÃO MOSTRA MENSAGEM DE ERRO 

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = "";
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemDeErro[tipoDeInput][erro];
        }
    })

    return mensagem;
}

// INFORMAÇÃO PESSOAIS

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

// VALIDANDO CPF

function validaCPF(input) {
    const  cpfFormatado = input.value.replace(/\D/g, ''); 
    let mensagem = '';

    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false;
        }
    })

    return cpfValido;
}


function checaEstruturaCPF(cpf) {

    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {
    
    if(multiplicador >= 12) {
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;

    const cpfSemDigitos = cpf.substr(0, multiplicador -1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for(let contador = 0; multiplicador > 1; multiplicador--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++;
    }

    if(digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false;
}

function confirmaDigito(soma) {

    return 11 - (soma % 11);
}


// CALCULO MATEMÁTICO VALIDAÇÃO DA API (EX: RECEITA FEDERAL)

// 123 456 798 09

// let soma = (11 * 1 ) + (10 * 2) + (9 * 3) ... (2 * 0);

// let digitoVerificador = 11 - (soma % 11);
