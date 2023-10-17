const url = "http://localhost:8080/login";

document.getElementById("botaoLogin").addEventListener('click', (event) => {
    event.preventDefault();
    login();
})

function login(){
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var dadosCliente = {
        'email': userName,
        'password': password
    }

    const requestOptions = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCliente)
      };

    fetch(url, requestOptions)
    .then(response => {
    if (response.status == 403) {
        throw new Error('Usuario ou senha inválidos');
    }
    return response.json(); // Converte a resposta em JSON
    })
    .then(data => {
        sessionStorage.setItem('token', data.token);
        window.location.href = '../html/home.html';
    })
    .catch(error => {
        if(error.message == "Failed to fetch"){
            document.getElementById('textoResposta').textContent = 'Sistema fora temporariamente';
        }else {
            document.getElementById('textoResposta').textContent = error.message;
        }
        exibirConfirmacao();
    });
}

function exibirConfirmacao() {
   
    const divTeste = document.getElementById('modalId');
    divTeste.style.display = 'block';

    // Remova a confirmação após alguns segundos (opcional)
    setTimeout(function () {
        divTeste.remove();
        location.reload();
    }, 5000); // Remove a confirmação após 5 segundos
}