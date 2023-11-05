const url = 'http://localhost:8080/customer';

var bootstrapModalEditar = new bootstrap.Modal(modalEditar);

listarClientes();

function listarClientes() {

    var modalExcluir = document.getElementById("ExemploModalCentralizado");
    var modalEditar = document.getElementById('modalEditar');

    var tabelaDados = document.getElementById('tabelaDados');
    tabelaDados.innerHTML = "";

    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      };

    fetch(url, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na requisição'); // Trate erros de resposta aqui
            }
            return response.json(); // Converte a resposta em JSON
          })
          .then(data => {
            for (var i = 0; i < data.length; i++) {

              var row = tabelaDados.insertRow();
              var number = row.insertCell(0);
              var cellNome = row.insertCell(1);
              var cellCpf = row.insertCell(2);
              var cellTelefone = row.insertCell(3);
              var cellBotaoEditar = row.insertCell(4);
              var cellBotaoExcluir = row.insertCell(5);

              number.innerHTML = i + 1;
              cellNome.innerHTML = data[i].name;
              cellCpf.innerHTML = data[i].cpf;
              cellTelefone.innerHTML = data[i].telefone;

              // Crie um botão de editar e adicione-o à coluna cellBotaoEditar
              var buttonEditar = document.createElement("button");
              buttonEditar.innerHTML = "Editar"; // Texto do botão
              buttonEditar.classList.add("btn");
              buttonEditar.classList.add("btn-outline-primary");
              buttonEditar.setAttribute("data-index", data[i].id);

              buttonEditar.addEventListener("click", function(event) {
                var botaoClicadoEditar = event.target;
                var indice = botaoClicadoEditar.getAttribute("data-index");
       
                new bootstrap.Modal(modalEditar);
                bootstrapModalEditar.show();
                
                buscarPorId(indice);
              })


              // Crie um botão de Excluir e adicione-o à coluna cellBotaoExcluir
              var buttonExcluir = document.createElement("button");
              buttonExcluir.innerHTML = "Excluir"; // Texto do botão
              buttonExcluir.classList.add("btn");
              buttonExcluir.classList.add("btn-outline-danger");
              buttonExcluir.setAttribute("data-toggle", "modal");
              buttonExcluir.setAttribute("data-target", "#ExemploModalCentralizado");
              buttonExcluir.setAttribute("data-index", data[i].id);

              buttonExcluir.addEventListener("click", function(event) {
                var botaoClicado = event.target;
                var indice = botaoClicado.getAttribute("data-index");
            
                var bootstrapModal = new bootstrap.Modal(modalExcluir);
                bootstrapModal.show();
                confirmarExclusao(indice, bootstrapModal)
              });
              
              cellBotaoEditar.appendChild(buttonEditar);
              cellBotaoExcluir.appendChild(buttonExcluir);
            }

          })
          .catch(error => {
    
          }); 
}

function confirmarExclusao(id, bootstrapModal){
  var btnConfirmarExclusao  = document.getElementById("excluir-cliente");

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  };

  const urlDelete = url + "/" + id;

  btnConfirmarExclusao.addEventListener("click", function(event) {
  
    fetch(urlDelete, requestOptions)
    .then(res => {
      bootstrapModal.hide();
      location.reload()
    })
  }); 
}

function buscarPorId(id){
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
  };

  const urlId = url + "/" + id;

  fetch(urlId, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição'); // Trate erros de resposta aqui
    }
    return response.json(); // Converte a resposta em JSON
  })
  .then(data => {
    document.getElementById('campoIdEditar').value = data.id;
    document.getElementById('campoNomeEditar').value = data.name;
    document.getElementById('campoSobreNomeEditar').value = data.sobreNome;
    document.getElementById('campoCpfEditar').value = data.cpf;
    document.getElementById('campoTelefoneEditar').value = data.telefone;
    document.getElementById('campoEmailEditar').value = data.email;
    document.getElementById('campoCEPEditar').value = data.cep;
    document.getElementById('campoLogradouroEditar').value = data.logradouro;
    document.getElementById('campoNumeroEditar').value = data.numero;
    document.getElementById('campoBairroEditar').value = data.bairro;
    document.getElementById('campoCidadeEditar').value = data.cidade;
    document.getElementById('campoEstadoEditar').value = data.estado;
  })
  .catch(error => {

  })
}

function exibirConfirmacaoDeAtualizacao() {
  bootstrapModalEditar.hide();

  const divTeste = document.getElementById('modalIdAtualizado');
  divTeste.style.display = 'block';

  var botaoFechar = document.getElementById("botao-fechar");

  //Remova a confirmação após alguns segundos (opcional)
  setTimeout(function () {
    divTeste.remove();
    location.reload();
}, 5000); // Remove a confirmação após 5 segundos

  console.log("aiaiaia");
  botaoFechar.addEventListener('click', function (event) {
      divTeste.remove();
      location.reload();
  })
}

var botaoAtualizar = document.getElementById('atualizarCliente')

botaoAtualizar.addEventListener('click', (event) => {
  event.preventDefault();
  
  var idCliente = document.getElementById('campoIdEditar').value;

  var dadosCliente = {
    "nome": document.getElementById('campoNomeEditar').value,
    "cpf": document.getElementById('campoCpfEditar').value,
    "telefone": document.getElementById('campoTelefoneEditar').value,
    "sobreNome": document.getElementById('campoSobreNomeEditar').value,
    "email": document.getElementById('campoEmailEditar').value,
    "cep": document.getElementById('campoCEPEditar').value,
    "logradouro":  document.getElementById('campoLogradouroEditar').value,
    "numero": document.getElementById('campoNumeroEditar').value,
    "bairro": document.getElementById('campoBairroEditar').value,
    "cidade": document.getElementById('campoCidadeEditar').value,
    "estado": document.getElementById('campoEstadoEditar').value,
  }

  const requestOptions = {
    method: 'PUT', // Método HTTP (pode ser GET, POST, PUT, DELETE, etc.)
    headers: {
      'Content-Type': 'application/json', // Tipo de conteúdo do corpo da requisição
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
    body: JSON.stringify(dadosCliente) // Converte os dados em JSON e os coloca no corpo da requisição
  };

  const urlIdPut = url + "/" + idCliente;

  fetch(urlIdPut, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição'); // Trate erros de resposta aqui
    }
    return response.json(); // Converte a resposta em JSON
  })
  .then(data => {
    document.getElementById('textoRespostaAtualizarCliente').textContent = 'Cliente atualizado com Sucesso';
    exibirConfirmacaoDeAtualizacao();
  })
  .catch(error => {
    document.getElementById('textoRespostaAtualizarCliente').textContent = 'Erro ao atualizar o cliente. Sistema indisponível';
    exibirConfirmacaoDeAtualizacao();
  });
});