const listaUsuario = buscarDadosLocalStorage('cadastros')


const feedbackHTML = window.document.getElementById('feedback')
const usuarioLogado = buscarDadosLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {

    if (usuarioLogado.nome) {
        window.location.href = 'listaRecados.html'
        return
    }
})

const formularioEntrarHTML = window.document.getElementById('formulario-entrar')

formularioEntrarHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputnome = window.document.getElementById('nome-usuario')


    inputnome.addEventListener('focus', () => {
        EsconderAlerta(feedbackHTML)
    })

    const inputsenha = window.document.getElementById('senha-usuario')


    inputsenha.addEventListener('focus', () => {
        EsconderAlerta(feedbackHTML)
    })

    if (!inputnome.value || !inputsenha.value) {
        mostrarAlerta(feedbackHTML, 'Preencha todos os campos!')
        return
    }
    const usuarioLogado = listaUsuario.find((valor) => valor.nome === inputnome.value && valor.senha === inputsenha.value)



    if (!usuarioLogado) {
        mostrarAlerta(feedbackHTML, 'Nome de usúario ou senha incorretos!' )
        return
    }

    guardarLocalStorage('usuarioLogado', usuarioLogado)

    formularioEntrarHTML.reset()

    console.log(usuarioLogado)

    setTimeout(() => { window.location.href = 'listaRecados.html' }, 1000)

})

function guardarLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}


function buscarDadosLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if (dadoJSON) {
        const dadosConvertidos = JSON.parse(dadoJSON)
        return dadosConvertidos
    }
    else {
        return []
    }
}

//JS MODAL
const modalCadastro = new bootstrap.Modal('#modal-cadastrar')

const formularioCadastrarHTML = window.document.getElementById('formulario-cadastro')

const feedbackModal = document.getElementById('feedback-modal')


formularioCadastrarHTML.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputnome = window.document.getElementById('nome-novo-usuario')


    inputnome.addEventListener('focus', () => {
        EsconderAlerta(feedbackModal)
    })

    const inputsenha = window.document.getElementById('senha-novo-usuario')


    inputsenha.addEventListener('focus', () => {
        EsconderAlerta(feedbackModal)
    })


    const inputsenhaconfirmar = window.document.getElementById('conferir-senha-novo-usuario')


    inputsenhaconfirmar.addEventListener('focus', () => {
        EsconderAlerta(feedbackModal)
    })

    const existe = listaUsuario.some((valor) => valor.nome === inputnome.value)

    if (existe) {
        mostrarAlerta(feedbackModal, 'Nome de usuário já existente! Tente novamente.')
        return
    }

    if (!inputnome.value || !inputsenha.value || !inputsenhaconfirmar.value) {
        mostrarAlerta(feedbackModal, 'Preencha todos os campos!')
        return
    }

    if (inputsenha.value !== inputsenhaconfirmar.value) {
        mostrarAlerta(feedbackModal, 'As senhas não conferem! Tente novamente.')
        return
    }


    const novoUsuario = {
        nome: inputnome.value,
        senha: inputsenha.value,
        recados: []
    }

    listaUsuario.push(novoUsuario)

    guardarLocalStorage('cadastros', listaUsuario)

    modalCadastro.hide()

    formularioCadastrarHTML.reset()
})

function mostrarAlerta(variavel, menssagem ){
    variavel.classList.add('alert')
    variavel.classList.add('alert-danger')
    variavel.innerHTML = menssagem
}

function EsconderAlerta(variavel){
    variavel.classList.remove('alert')
    variavel.classList.remove('alert-danger')
    variavel.innerHTML = '<p class="text-light m-0">feedback</p>'
}