document.addEventListener('DOMContentLoaded', function () {
    const enviarButton = document.getElementById('salvarCliente');

    enviarButton.addEventListener('click', function (event) {
    event.preventDefault();

    const url = 'http://localhost:8080/customer';

        var nome = document.getElementById('campoNome').value;
        var sobreNome = document.getElementById('campoSobreNome').value;
        var email = document.getElementById('campoEmail').value;
        var cep =  document.getElementById('campoCEP').value;
        var logradouro = document.getElementById('campoLogradouro').value;
        var numero = document.getElementById('campoNumero').value;
        var bairro = document.getElementById('campoBairro').value;
        var cidade = document.getElementById('campoCidade').value;
        var estado = document.getElementById('campoEstado').value;
        var cpf = document.getElementById('campoCpf').value;
        var telefone = document.getElementById('campoTelefone').value;

        var dadosCliente = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "sobreNome": sobreNome,
            "email": email,
            "cep": cep,
            "logradouro": logradouro,
            "numero": numero,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado,
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
              throw new Error('Erro na requisição'); // Trate erros de resposta aqui
            }
            return response.json(); // Converte a resposta em JSON
          })
          .then(data => {
            document.getElementById('textoResposta').textContent = 'Cliente cadastrado com Sucesso';
            exibirConfirmacao();
          })
          .catch(error => {
            document.getElementById('textoResposta').textContent = 'Erro ao cadastrar o cliente. Sistema indisponível';
            exibirConfirmacao();
          });
    });
});
        
function exibirConfirmacao() {

  const divTeste = document.getElementById('modalId');
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
        
