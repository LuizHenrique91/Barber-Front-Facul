const url = 'http://localhost:8080/customer';


function mostrarNomes() {

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
            console.log(data)
            
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

              // Crie um botão de Excluir e adicione-o à coluna cellBotaoExcluir
              var buttonExcluir = document.createElement("button");
              buttonExcluir.innerHTML = "Excluir"; // Texto do botão
              buttonExcluir.classList.add("btn");
              buttonExcluir.classList.add("btn-outline-danger");
              
              cellBotaoEditar.appendChild(buttonEditar);
              cellBotaoExcluir.appendChild(buttonExcluir);
            }

          })
          .catch(error => {
    
          }); 
}

mostrarNomes();