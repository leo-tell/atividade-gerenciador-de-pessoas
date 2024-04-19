// Inicializa a lista de pessoas com os dados salvos no localStorage ou como um array vazio
let listaDePessoas = JSON.parse(localStorage.getItem('listaDePessoas')) || [];

// Função para gerar IDs únicos
function gerarID() {
    return Math.floor(Math.random() * 1000); // Gerar IDs entre 0 e 999
}

// Função para validar o input do usuário
function validarInput(input, campo) {
    while (true) {
        input = input.trim();
        if (input === "") {
            alert(`O campo ${campo} não pode ser vazio.`);
        } else if (/[\d]/.test(input)) {
            alert(`O campo ${campo} não pode conter números.`);
        } else if (/[^a-zA-Z\s]/.test(input)) {
            alert(`O campo ${campo} não pode conter caracteres especiais.`);
        } else {
            return input;
        }
        input = prompt(`Digite o ${campo} da pessoa:`);
    }
}

// Função para validar a idade
function validarIdade(idade) {
    while (true) {
        idade = idade.trim();
        if (idade === "") {
            alert("A idade não pode ser vazia.");
        } else if (isNaN(idade)) {
            alert("A idade deve ser um número.");
        } else if (idade > 120) {
            alert("A idade não pode ser maior que 120.");
        } else if (idade <= 0) {
            alert("A idade deve ser um número maior que zero.");
        } else if (!Number.isInteger(Number(idade))) {
            alert("A idade deve ser um número inteiro.");
        } else {
            return idade;
        }
        idade = prompt("Digite a idade da pessoa:");
    }
}

// Função para cadastrar uma pessoa
function cadastrarPessoa() {
    // Usa a função prompt para solicitar os dados da pessoa
    let nome = prompt("Digite o nome da pessoa:");
    nome = validarInput(nome, "nome");
    
    let sobrenome = prompt("Digite o sobrenome da pessoa:");
    sobrenome = validarInput(sobrenome, "sobrenome");
    
    let idade = prompt("Digite a idade da pessoa:");
    idade = validarIdade(idade);
    
    let cidade = prompt("Digite a cidade da pessoa:");
    cidade = validarInput(cidade, "cidade");
    
    // Cria um objeto pessoa com os dados coletados
    let pessoa = { id: gerarID(), nome: nome, sobrenome: sobrenome, idade: idade, cidade: cidade };
    
    // Adiciona a pessoa à lista de pessoas
    listaDePessoas.push(pessoa);
    // Salva a lista de pessoas no localStorage
    localStorage.setItem('listaDePessoas', JSON.stringify(listaDePessoas));
    alert("Pessoa cadastrada com sucesso!");
}

// Função para atualizar os dados de uma pessoa
function atualizarPessoa(id) {
    // Verifica se a pessoa com o ID fornecido existe
    let pessoa = listaDePessoas.find(pessoa => pessoa.id === id);
    if (!pessoa) {
        alert("Pessoa não encontrada!");
        return;
    }
    
    // Usa a função confirm para perguntar ao usuário quais campos eles gostariam de atualizar
    if (confirm("Você gostaria de atualizar o nome?")) {
        let nome = prompt("Digite o novo nome da pessoa:");
        nome = validarInput(nome, "nome");
        pessoa.nome = nome;
    }
    
    if (confirm("Você gostaria de atualizar o sobrenome?")) {
        let sobrenome = prompt("Digite o novo sobrenome da pessoa:");
        sobrenome = validarInput(sobrenome, "sobrenome");
        pessoa.sobrenome = sobrenome;
    }
    
    if (confirm("Você gostaria de atualizar a idade?")) {
        let idade = prompt("Digite a nova idade da pessoa:");
        idade = validarIdade(idade);
        pessoa.idade = idade;
    }
    
    if (confirm("Você gostaria de atualizar a cidade?")) {
        let cidade = prompt("Digite a nova cidade da pessoa:");
        cidade = validarInput(cidade, "cidade");
        pessoa.cidade = cidade;
    }
    
    // Salva a lista de pessoas no localStorage
    localStorage.setItem('listaDePessoas', JSON.stringify(listaDePessoas));
    alert("Pessoa atualizada com sucesso!");
}

// Função para deletar uma pessoa
function deletarPessoa(id) {
    const lengthBeforeDelete = listaDePessoas.length;
    // Filtra a lista de pessoas para remover a pessoa com o ID fornecido
    listaDePessoas = listaDePessoas.filter(pessoa => pessoa.id !== id);
    if (listaDePessoas.length === lengthBeforeDelete) {
        alert("Pessoa não encontrada!");
    } else {
        // Salva a lista de pessoas no localStorage
        localStorage.setItem('listaDePessoas', JSON.stringify(listaDePessoas));
        alert("Pessoa deletada com sucesso!");
    }
}

// Função para listar todas as pessoas
function listarPessoas() {
    // Retorna a lista de pessoas
    let lista = '';
    for (let pessoa of listaDePessoas) {
        lista += `ID: ${pessoa.id}, Nome: ${pessoa.nome}, Sobrenome: ${pessoa.sobrenome}, Idade: ${pessoa.idade}, Cidade: ${pessoa.cidade}\n`;
    }
    alert(lista);
}

// Função para exibir o menu e gerenciar as operações
function exibirMenu() {
    alert("Bem-vindo ao Gerenciador de Pessoas!");
    while (true) {
        let opcao = prompt("Digite a opção desejada:\n1. Cadastrar pessoa\n2. Atualizar pessoa\n3. Deletar pessoa\n4. Listar pessoas\n5. Sair");
        
        switch (opcao) {
            case "1":
                cadastrarPessoa();
                break;
            case "2":
                listarPessoas();
                let idAtualizar = prompt("Digite o ID da pessoa que deseja atualizar:");
                atualizarPessoa(Number(idAtualizar));
                break;
            case "3":
                listarPessoas();
                let idDeletar = prompt("Digite o ID da pessoa que deseja deletar:");
                deletarPessoa(Number(idDeletar));
                break;
            case "4":
                listarPessoas();
                break;
            case "5":
                return;
            default:
                alert("Opção inválida!");
        }
    }
}

// Inicia o programa
exibirMenu();
