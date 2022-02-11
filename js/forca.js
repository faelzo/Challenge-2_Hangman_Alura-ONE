//Elementos do HTML
var btnIniciar = document.querySelector("#iniciar-jogo");
var btnAdicionar = document.querySelector("#nova-palavra");
var inputAdicionar = document.querySelector("#input-nova-palavra");
var msgErro = document.querySelector("#mensagem-erro");

//Variáveis modificáveis pelo usuário
var listaPalavras = ["ALURA","ORACLE","BRUNO","BRENDA","PEIXE","VALLOUREC","JAVASCRIPT"];

//Variáveis de armazenamento
var resposta = "";
var letrasCertas = [];
var letrasErradas = [];
var noLetras = NaN;

//Status do jogo
var vitoria = false;
var derrota = false;

limparCanvas();

btnIniciar.addEventListener("click",function(){
  resposta = palavraSecreta();

  //reiniciar variáveis
  letrasCertas = [];
  letrasErradas = [];
  vitoria = false;
  derrota = false;

  console.log(resposta);
  noLetras = resposta.length;

  desenhaLinhas(noLetras);

  document.onkeypress = function(event){
    if(derrota==false&&vitoria==false){
      var codTecla = event.keyCode;
      var tecla = String.fromCharCode(codTecla);
      var letra = tecla.toUpperCase();
      if (ehLetra(tecla)&&letraInedita(letra)) {
        verificarLetra(letra);
      }
  }
  }
  })

btnAdicionar.addEventListener("click",function() {
  var novaPalavra = inputAdicionar.value.toUpperCase();
  if (validarNovaPalavra(novaPalavra)){
    listaPalavras.push(novaPalavra);
    inputAdicionar.value = "";
    msgErro.classList.add("invisivel");
  } else{
    msgErro.classList.remove("invisivel");
    inputAdicionar.focus();
  }
  console.log(listaPalavras);

})

function palavraSecreta() {

  indice = Math.round(Math.random()*(listaPalavras.length-1));
  return listaPalavras[indice];
}

function ehLetra(caractere) {
    return caractere.toLowerCase() != caractere.toUpperCase();
}

function validarNovaPalavra(palavra) {
  for(i=0;i<palavra.length;i++) {
    if (!ehLetra(palavra[i])) {return false}
  }
  return true;
}

function verificarLetra(letraTecla) {
  indicesLetra = [];
  for(i=0;i<resposta.length;i++){
    if(letraTecla==resposta[i]) {
      indicesLetra.push(i);
      letrasCertas.push(resposta[i]);
    }
  }
  if (indicesLetra.length>0){
    desenhaLetraCerta(letraTecla,indicesLetra,"black");
    verificarVitoria();
  } else {
      letrasErradas.push(letraTecla);
      desenhaLetraErrada(letraTecla);
      desenhaBoneco(letrasErradas.length);
      verificarDerrota();
  }
  console.log(letrasErradas);
  console.log(letrasCertas);
}

function verificarDerrota() {
  if (letrasErradas.length == 6) {
    desenhaDerrota();
    derrota = true;
    letrasFaltantesDerrota();
  }
}

function verificarVitoria() {
  if (letrasCertas.length == noLetras) {
    desenhaVitoria();
    vitoria = true;
  }
}

function letraInedita(letra) {
  return(!letrasCertas.includes(letra)&&!letrasErradas.includes(letra));
}

function letrasFaltantesDerrota() {
  for(i=0;i<resposta.length;i++) {
    letra = resposta[i];
    if (!letrasCertas.includes(letra)) {
      desenhaLetraCerta(letra,[i],"green");
    }
  }
}
