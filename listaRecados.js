const usuarioLogado = buscarDadosLocalStorage('usuarioLogado')
document.addEventListener('DOMContentLoaded', () => {

    if (!usuarioLogado.nome) {
        window.location.href = 'index.html'
        return
    } else {
        mostrarRecados()
    }
})

const listaRecados = usuarioLogado.recados

const modalCadastro = new bootstrap.Modal('#modal-criar')

const formulario = document.getElementById('form-recados')

const tbody = document.getElementById('recados')

const feedbackHTML = window.document.getElementById('feedback')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const descricao = document.getElementById('descricao')
    console.log(descricao)

    descricao.addEventListener('focus', () => {
        EsconderAlerta(feedbackHTML)
        return
    })

    const detalhamento = document.getElementById('detalhamento')
    console.log(detalhamento)



    detalhamento.addEventListener('focus', () => {
        EsconderAlerta(feedbackHTML)
        return
    })

    if(!descricao.value || !detalhamento.value){
        mostrarAlerta(feedbackHTML, 'Preencha todos os campos!')
        return
    }

    // const aviso = document.getElementById('aviso')

    // if (listaRecados.length == 15) {
    //     aviso.innerHTML = 'Você atingiu o número máximo de recados, exclua algum para continuar adicionando!'
    //     setTimeout(() => { aviso.innerHTML = '' }, 2500)

    //     return
    // }

    const novoRecado = {
        descricao: descricao.value,
        detalhamento: detalhamento.value
    }

    listaRecados.push(novoRecado)
    salvarRecados()
    modalCadastro.hide()

    formulario.reset()

    mostrarRecados()
})

///funcao exluir e atualizar recado

function mostrarRecados() {
    tbody.innerHTML = ''

    listaRecados.forEach((valor, index) => {
        tbody.innerHTML += 
    `<tr id='${index}'>
    <td>${index + 1}</td>
    <td>${valor.descricao}</td>
    <td>${valor.detalhamento}</td>
    <td class="text-center">
        <button class="btn bg-none border-0 aria-label="Editar" onclick="editar(${index})" >
            <i class="bi bi-pencil-square text-primary fs-5"></i>
        </button>
        <button class="btn bg-none border-0 aria-label="Apagar" onclick="apagar(${index})" >
            <i class="bi bi-trash3 text-danger fs-5"></i>
        </button>
    </td>
</tr>`
    })
}

function editar(indice) {
    const modalEditar = new bootstrap.Modal('#modal-atualizar')

    const formulario = document.getElementById('form-atualizar')

    const feedback = document.getElementById('feedback')

    modalEditar.show()

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault()

        const descricaoAtualizada = document.getElementById('atualizar-descricao')

        const detalhamentoatualizado = document.getElementById('atualizar-detalhamento')

        if(!descricaoAtualizada.value || !detalhamentoatualizado.value){
            mostrarAlerta(feedback, 'Preencha todos os campos!')
            return
        }

        listaRecados[indice].descricao = descricaoAtualizada.value
        listaRecados[indice].detalhamento = detalhamentoatualizado.value

        modalEditar.hide()

        salvarRecados()
        mostrarRecados()

        formulario.reset()
    })
}

function apagar(indice) {
    usuarioLogado.recados.splice(indice, 1)

    const remover = document.getElementById(indice)
    remover.remove()

    salvarRecados()
    mostrarRecados()
}

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
        return {}
    }
}

function salvarRecados() {
    const listaUsuario = buscarDadosLocalStorage('cadastros')

    const acharUsuario = listaUsuario.findIndex((valor) => valor.nome === usuarioLogado.nome)

    listaUsuario[acharUsuario].recados = listaRecados
    usuarioLogado.recados = listaRecados

    guardarLocalStorage('usuarioLogado', usuarioLogado)
    guardarLocalStorage('cadastros', listaUsuario)
}

const botaoSair = document.getElementById('botao-sair')

botaoSair.addEventListener('click', () => {

    salvarRecados()

    localStorage.removeItem('usuarioLogado')

    window.location.href = './index.html'

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