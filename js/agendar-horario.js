document.addEventListener('DOMContentLoaded', function () {
    const enviarButton = document.getElementById('cadastrarAgendamento');

    enviarButton.addEventListener('click', function (event) {
    event.preventDefault();

    const url = 'http://localhost:8080/agendamento';

        var cpf = document.getElementById('inputCPFCliente').value;
        var horario = document.getElementById('inputHorarioCliente').value;
        var formaDePagamento = document.getElementById('inputFormaPagamento').value;
        var statusPagamento =  document.getElementById('inputStatusPagamento').value;

        console.log(formaDePagamento);

        if (cpf === '' || horario === '' || formaDePagamento === '' || statusPagamento === '') {
            alert('Por favor, preencha todos os campos antes de enviar.');
            return false;
          }

        var dadosCliente = {
            "cpf": cpf,
            "horario": horario,
            "formaPagamento": formaDePagamento,
            "statusPagamento": statusPagamento,
        };

        const requestOptions = {
            method: 'POST', // Método HTTP (pode ser GET, POST, PUT, DELETE, etc.)
            headers: {
              'Content-Type': 'application/json', // Tipo de conteúdo do corpo da requisição
              'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(dadosCliente) // Converte os dados em JSON e os coloca no corpo da requisição
          };

          fetch(url, requestOptions)
          .then(response => {
            if (!response.ok) {
                console.log(response.status)
                if(response.status == 400){
                    throw new Error("Horario já reservado")
                }else if(response.status == 404){
                    throw new Error("Cliente não existe")
                }else if(!response.ok){
                    throw new Error("Erro no servidor. Tente mais tarde")
                }
            }
            return response.json();
          })
          .then(data => {
            document.getElementById('textoRespostaAgendamento').textContent = 'Agendamento efetuado com Sucesso';
            exibirConfirmacao();
          })
          .catch(error => {
            console.log(error.message);
            document.getElementById('textoRespostaAgendamento').textContent = error.message;
            exibirConfirmacao();
          });
    });
});

function exibirConfirmacao() {

    const divTeste = document.getElementById('modalIdAgendamento');
    divTeste.style.display = 'block';
  
    var botaoFechar = document.getElementById("botao-fechar");
  
    botaoFechar.addEventListener('click', function (event) {
        divTeste.remove();
        location.reload();
    })
  
    // Remova a confirmação após alguns segundos (opcional)
    setTimeout(function () {
        divTeste.remove();
        location.reload();
    }, 5000); // Remove a confirmação após 5 segundos
  }