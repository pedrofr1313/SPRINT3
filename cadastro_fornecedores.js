//Caixa de seleção empresa/loja
var opcao2 = document.getElementById("opcao2");
var opcao1 = document.getElementById("opcao1")
var caixaTexto = document.getElementById("nomeEmpresaLoja");

opcao2.addEventListener("change", inputCaixaTexto);
opcao1.addEventListener("change",inputCaixaTexto);

function inputCaixaTexto() {

    if (opcao2.checked) {
        caixaTexto.style.display = "block";
    } else {
        caixaTexto.style.display = "none";
    }

    if (opcao1.checked) {
        caixaTexto.style.display = "none";
        document.getElementById('EmpresaLoja').removeAttribute('required');
    }
}

//Desmarcar Caixa de seleção opcao 1 e 2       
function desmarcarOpcao(id) {
    document.getElementById(id).checked = false;
  }




  //verificador de cpf  
  function validaCPF(cpfInput) {
    var cpf = cpfInput.value.replace(/[^\d]+/g,''); // remove todos os caracteres não numéricos
    if (cpf == '') {
        alert('Por favor, informe um CPF válido.');
        return false;
    }
    // Verifica se o CPF é válido utilizando o código de validação CPF que você forneceu anteriormente:
    if (!TestaCPF(cpf)) {
        alert('Por favor, informe um CPF válido.');
        cpfInput.value = ''; // limpa o campo de entrada
        return false;
    }
    return true;
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}


//validador de CEP
function validarCEP(cep) {
    return /^[0-9]{8}$/.test(cep);
}

function validarCep(input) {
    var cep = input.value.replace(/[^\d]+/g,'');
    var valido = validarCEP(cep);
    if (!valido) {
        input.classList.add('is-invalid');
        alert('CEP inválido');
    } else {
        input.classList.remove('is-invalid');
    }
}

var inputCep = document.getElementById('cep');
inputCep.addEventListener('blur', function() {
    validarCep(inputCep);
});




  //BANCO DE DADOS
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const servicos = document.querySelector('#serviços').value;
    const autonomo = document.querySelector('#opcao1').checked;
    const empresa = document.querySelector('#opcao2').checked;
    const nomeEmpresaLoja = document.querySelector('#EmpresaLoja').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const cpf = document.querySelector('#cpf').value;
    const senha = document.querySelector('#senha').value;
    const cep = document.querySelector('#cep').value;

    const novoPerfil = { 
      id: generateId(), // Adiciona o ID gerado ao novo perfil
      nome,
      servicos,
      autonomo,
      empresa,
      nomeEmpresaLoja,
      email,
      telefone,
      cpf,
      senha,
      cep,
    };

    let dbProvedores = localStorage.getItem('formData');

    if (!dbProvedores) {
      // Se não houver nenhum perfil salvo, criar um novo array e adicionar o perfil atual a ele
      dbProvedores = JSON.stringify({ provedores: [novoPerfil] });
    } else {
      // Se já houver um array, adicionar o novo perfil a ele
      const perfis = JSON.parse(dbProvedores);
      perfis.provedores.push(novoPerfil);
      dbProvedores = JSON.stringify(perfis);
    }

    localStorage.setItem('formData', dbProvedores);
    let url = "http://localhost:3000/contas"
    fazpost(url,novoPerfil);
    window.location.href = 'login.html';
  });

  // Função para gerar IDs únicos
function generateId() {
    let id = 0;
    let dbProvedores = localStorage.getItem('formData');
    if (dbProvedores) {
      const perfis = JSON.parse(dbProvedores);
      const ids = perfis.provedores.map(perfil => perfil.id);
      id = Math.max(...ids) + 1;
    }
    return id;
  }
  function fazpost(url, novoPerfil){
    console.log("body=", novoPerfil)
    let request = new XMLHttpRequest()
    request.open("POST", url,true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(novoPerfil))

    request.onload= function(){
        console.log(this.responseText)
    }
    return request.responseText
  }