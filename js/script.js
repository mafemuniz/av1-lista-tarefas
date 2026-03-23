const tarefas = [];

const form = document.querySelector("#form-tarefa");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const mensagem = document.querySelector("#mensagem");

function validarTarefa(texto) {
  if (texto.trim() === "") {
    mensagem.textContent = "A tarefa não pode estar vazia.";
    return false;
  }
  mensagem.textContent = "";
  return true;
}

function renderTarefas() {
  lista.textContent = "";

  tarefas.forEach(function (tarefa, index) {
    const li = document.createElement("li");

    const texto = document.createElement("p");
    texto.textContent = tarefa;

    // BOTÃO EDITAR
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";

    btnEditar.addEventListener("click", function () {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = tarefa;

      const btnSalvar = document.createElement("button");
      btnSalvar.textContent = "Salvar";

      btnSalvar.addEventListener("click", function () {
        if (!validarTarefa(inputEdit.value)) return;

        tarefas[index] = inputEdit.value;
        renderTarefas();
      });

      li.textContent = "";
      li.appendChild(inputEdit);
      li.appendChild(btnSalvar);
    });

    // BOTÃO EXCLUIR
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", function () {
      tarefas.splice(index, 1);
      renderTarefas();
    });

    li.appendChild(texto);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = input.value;

  if (!validarTarefa(texto)) {
    return;
  }

  tarefas.push(texto);
  input.value = "";
  renderTarefas();
});

mensagem.classList.add("erro");