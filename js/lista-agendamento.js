const url = 'http://localhost:8080/agendamento'

listarClientes();

function listarClientes() {

    var tabelaDados = document.getElementById('tabelaDadosAgendamento');
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
              var cellHorario = row.insertCell(3);
              var cellFormaPagamento = row.insertCell(4);
              var cellStatusPagamento = row.insertCell(5);

              number.innerHTML = i + 1;
              cellNome.innerHTML = data[i].nome;
              cellCpf.innerHTML = data[i].cpf;
              cellHorario.innerHTML = data[i].horario;
              cellFormaPagamento.innerHTML = data[i].formaPagamento;
              cellStatusPagamento.innerHTML = data[i].statusPagamento;
            }
          })
          .catch(error => {
    
          }); 
}