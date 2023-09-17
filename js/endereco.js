var cepPreenchido = false;

document.getElementById('campoCEP').addEventListener('blur', function () {
    if (document.getElementById('campoCEP').value.trim() !== '') {
        cepPreenchido = true;
    }
    chamarBackend()
});

function chamarBackend() {
    if(cepPreenchido){
        var campoCEP = document.getElementById('campoCEP');
        var valorCEP = campoCEP.value;

        var urlBackend = 'https://viacep.com.br/ws/' + valorCEP + '/json';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', urlBackend, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var resposta = JSON.parse(xhr.responseText);

                document.getElementById('campoCidade').value = resposta.localidade;
                document.getElementById('campoEstado').value = resposta.uf;
                document.getElementById('campoLogradouro').value = resposta.logradouro;
                document.getElementById('campoBairro').value = resposta.bairro;
            } else {
                console.error('Erro na chamada para o Backend. Código de status:', xhr.status);
            }
        };
        xhr.send();
    }
}