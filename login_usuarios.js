
    function login() {
    const email = document.querySelector('#LoginEmail').value;
    const senha = document.querySelector('#LoginSenha').value;
    console.log('email =', email)
    teste(email,senha);
    // Verificar se o email e a senha correspondem a um perfil existente
    const dbProvedores = JSON.parse(localStorage.getItem('formData'));
    const perfil = dbProvedores.provedores.find(perfil => perfil.email === email && perfil.senha === senha);

    if (perfil) {
      // Login bem-sucedido
      localStorage.setItem('loggedInUser', JSON.stringify(perfil));
      alert('Login bem-sucedido!');


    } else {
      // Login inválido
      alert('Email ou senha inválidos.');
    }
    
  }

  //Botao login
  document.getElementById('botaoLogin').addEventListener('click', login);

  function teste(email,senha){
  fetch('http://localhost:3000/contas')
.then(res => res.json())
.then(data => {
   for(let i=1; i<data.length; i++) {
     console.log('galo')
      let APIresponse = data[i]
      let email2 = APIresponse.email
      let senha2 = APIresponse.senha
      let nome = APIresponse.nome
      console.log('email =', email2)
      console.log('senha =', senha2)
      if(email === email2 && senha===senha2){
          console.log('funcionou')
          let url = "http://localhost:3000/logadas"
         fazpost(APIresponse,url)
         window.location.href = 'pagperfil.html';
      }
   }

})}
function fazpost(APIresponse, url){
    console.log("body=", APIresponse)
    let request = new XMLHttpRequest()
    request.open("POST", url,true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(APIresponse))

    request.onload= function(){
        console.log(this.responseText)
    }
    return request.responseText
  }