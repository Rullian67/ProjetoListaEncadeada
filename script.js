let minhaLista = new LinkedList(); // Alterado para let para permitir reatribuição

// Função para adicionar um elemento no início
function adicionarElementoInicio() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    minhaLista.addFirst(novaTarefa);
    console.log(minhaLista.toString());
    // Limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
}

// Função para adicionar um elemento no final
function adicionarElementoFinal() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    minhaLista.addLast(novaTarefa);
    console.log(minhaLista.toString());
    // Limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
}

// Função para adicionar um elemento em um índice específico
function adicionarIndice() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();
    const posicao = parseInt(document.getElementById("txtIndice").value.trim());

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    minhaLista.addAtIndex(posicao, novaTarefa);
    
    // Limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
    atualizarLista();
}

// Função para remover o primeiro elemento da lista
function removerElementoInicio() {
    if (!minhaLista.isEmpty()) {
        const tarefaRealizada = minhaLista.removeFirst();
        mostrarMensagemRemocao(tarefaRealizada);
        atualizarLista();
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para remover o último elemento da lista
function removerElementoFinal() {
    if (!minhaLista.isEmpty()) {
        const tarefaRealizada = minhaLista.removeLast();
        mostrarMensagemRemocao(tarefaRealizada);
        atualizarLista();
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para mostrar uma mensagem de remoção
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML = "Tarefa realizada: " + tarefaRealizada.descricao;
    mensagem.style.display = "block";
}

// Função para atualizar a exibição da lista
function atualizarLista() {
    const listaTarefas = document.getElementById("list_listadeTarefas");
    const lblTarefas = document.getElementById("lblmostraTarefas");
    listaTarefas.innerHTML = ""; // Limpar antes de mostrar
    if (!minhaLista.isEmpty()) {
        lblTarefas.innerHTML = "Lista de Tarefas";
        for (const tarefa of minhaLista) {
            const novaLinha = document.createElement("li");
            novaLinha.innerHTML = tarefa.toString();
            listaTarefas.appendChild(novaLinha);
        }
    } else {
        lblTarefas.innerHTML = "Lista de Tarefas Vazia";
    }
}

// Função para obter a data atual
function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}

// Função para obter a hora atual
function obterHoraAtual() {
    const data = new Date();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = data.getSeconds().toString().padStart(2, '0');
    return `${hora}:${minuto}:${segundo}`;
}

// Função para calcular a diferença entre duas horas
function calcularDiferencaHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);

    const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

    const horas = Math.floor(diferencaSegundos / 3600);
    const minutos = Math.floor((diferencaSegundos % 3600) / 60);
    const segundos = diferencaSegundos % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Função para calcular a diferença entre duas datas em dias
function calcularDiferencaDias(dataInicial, dataFinal) {
    const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
    const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
    const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
    const dataIni = new Date(anoIni, mesIni - 1, diaIni);
    const dataFim = new Date(anoFim, mesFim - 1, diaFim);
    const diferencaMs = dataFim - dataIni;
    const diferencaDias = Math.floor(diferencaMs / msPorDia);
    return diferencaDias;
}

// Função para converter uma data para o formato ISO 8601
function converterDataFormatoISO8601(data) {
    const partes = data.split('/');
    const dia = partes[0].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[2];
    return `${ano}-${mes}-${dia}`;
}

// Função para comparar duas tarefas por data e hora
function comparaTarefasDataHora(tarefa1, tarefa2) {
    const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
    const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
    if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
        return tarefa1;
    } else {
        return tarefa2;
    }
}

// Função para salvar a lista no LocalStorage
function saveLinkedListToLocalStorage() {
    console.log("saveLinkedListToLocalStorage");
    let listaParaSalvar = [];
    for (const item of minhaLista) {
        listaParaSalvar.push({
            _descricao: item.descricao,
            _prioridade: item.prioridade,
            _data: item.data,
            _hora: item.hora
        });
        console.log(item.toString());
    }
    let jsonStr = JSON.stringify(listaParaSalvar);
    console.log(jsonStr);
    localStorage.setItem('myLinkedList', jsonStr);
    alert("Lista salva com sucesso!");
}

// Função para carregar a lista do LocalStorage
function loadLinkedListFromLocalStorage() {
    console.log("loadLinkedListFromLocalStorage");
    let jsonStr = localStorage.getItem('myLinkedList');
    if (jsonStr) {
        let listaCarregada = JSON.parse(jsonStr);
        for (let i = 0; i < listaCarregada.length; i++) {
            let obj = listaCarregada[i];
            let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
            console.log(novaTarefa.toString());
            minhaLista.addLast(novaTarefa);
        }
        atualizarLista();
        alert("Lista carregada com sucesso!");
    }
}

// Função para adicionar uma tarefa ordenada por prioridade
function adicionarTarefaOrdenada() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = parseInt(document.getElementById("txtnovaPrioridade").value.trim(), 10);

    if (isNaN(prioridade)) {
        alert("Prioridade inválida. Deve ser um número.");
        return;
    }

    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
    let inserido = false;

    // Cria uma nova lista temporária para ordenação
    let novaLista = new LinkedList();

    // Itera sobre a lista existente e insere a nova tarefa na posição correta
    for (const tarefa of minhaLista) {
        if (!inserido && prioridade < tarefa.prioridade) {
            novaLista.addLast(novaTarefa);
            inserido = true;
        }
        novaLista.addLast(tarefa);
    }

    // Se a tarefa não foi inserida, adiciona ao final
    if (!inserido) {
        novaLista.addLast(novaTarefa);
    }

    minhaLista = novaLista; // Atualiza a lista com a lista ordenada
    atualizarLista();
}

// Função para mostrar a primeira tarefa
function mostrarPrimeiraTarefa() {
    if (!minhaLista.isEmpty()) {
        const tarefa = minhaLista.getFirst();
        alert("Tarefa no início: " + tarefa.toString());
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para remover a tarefa do início e mostrar o tempo gasto
// Função para remover a tarefa do início e mostrar o tempo gasto
function removerEMostrarTempo() {
  if (!minhaLista.isEmpty()) {
      const tarefaRemovida = minhaLista.removeFirst();
      const dataAtual = obterDataAtual();
      const horaAtual = obterHoraAtual();

      // Calcular diferença em dias
      const diasGastos = calcularDiferencaDias(tarefaRemovida.data, dataAtual);

      // Calcular diferença em horas e minutos
      const diferencaHoras = calcularDiferencaHoras(tarefaRemovida.hora, horaAtual);
      const [horasGastos, minutosGastos] = diferencaHoras.split(':').map(Number);

      // Formatar mensagem
      const mensagem = `Tarefa realizada: ${tarefaRemovida.descricao}<br>
                        Tempo gasto: ${diasGastos} dias, ${horasGastos} horas e ${minutosGastos} minutos.`;
      mostrarMensagemRemocao(mensagem);
      atualizarLista();
  } else {
      alert("Lista de Tarefas Vazia");
  }
}

// Função para mostrar uma mensagem de remoção
function mostrarMensagemRemocao(mensagem) {
  const mensagemElement = document.getElementById("mensagem-remocao");
  mensagemElement.innerHTML = mensagem;  // Permitir HTML
  mensagemElement.style.display = "block";
}


// Função para mostrar a tarefa mais antiga
function mostrarTarefaMaisAntiga() {
    if (!minhaLista.isEmpty()) {
        let tarefaMaisAntiga = minhaLista.getFirst();
        for (const tarefa of minhaLista) {
            if (comparaTarefasDataHora(tarefa, tarefaMaisAntiga) === tarefaMaisAntiga) {
                tarefaMaisAntiga = tarefa;
            }
        }
        alert("Tarefa mais antiga: " + tarefaMaisAntiga.toString());
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para remover uma tarefa selecionada
function removerTarefaSelecionada(descricao) {
    if (minhaLista.isEmpty()) {
        alert("Lista de Tarefas Vazia");
        return;
    }

    let atual = minhaLista.head;
    while (atual !== null) {
        if (atual.dado.descricao === descricao) {
            if (atual === minhaLista.head) {
                minhaLista.removeFirst();
            } else if (atual === minhaLista.tail) {
                minhaLista.removeLast();
            } else {
                // Remover um nó do meio
                atual.ant.prox = atual.prox;
                atual.prox.ant = atual.ant;
                minhaLista.length--;
            }
            atualizarLista();
            alert("Tarefa removida com sucesso.");
            return;
        }
        atual = atual.prox;
    }

    alert("Tarefa não encontrada.");
}
