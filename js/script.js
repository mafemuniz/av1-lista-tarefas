const tarefas = [];
const form = document.querySelector("#form-tarefa");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagem = document.querySelector("#mensagem");

function validarTarefa(texto){
    if (texto.trim() === ""){
        mensagem.textContent = "A tarefa não pode estar vazia.";
        return false;
    }
    mensagem.textContent = "";
    return true;
}

function renderTarefas(){
    lista.textContent = "";

    tarefas.forEach(function(tarefa, index){
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarefa;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "editar";
        btnEditar.style.marginLeft = "10px";

        btnEditar.addEventListener("click", function(){
            const novoTexto = prompt("Editar tarefa:", tarefa);

            if(validarTarefa(novoTexto)){
                tarefas[index] = novoTexto;
                renderTarefas();
            }
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "excluir";
        btnExcluir.style.marginLeft = "5px";

        btnExcluir.addEventListener("click", function(){
            tarefas.splice(index, 1);
            renderTarefas();
        });

        li.appendChild(span);
        li.appendChild(btnEditar);
        li.appendChild(btnExcluir);

        lista.appendChild(li);
    });
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    const texto = input.value;

    if(!validarTarefa(texto)){
        return;
    }

    tarefas.push(texto);
    input.value = "";
    renderTarefas();
});

mensagem.classList.add("erro");