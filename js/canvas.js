var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
pincel.font = "40px serif";

//Limites do Canvas
var xcanvas = tela.width;
var ycanvas = tela.height;
limparCanvas();

//Variáveis de posição de itens
var xo = xcanvas*0.15;
var yo = ycanvas*0.8;
var yBase = ycanvas*0.9;
var ymax = ycanvas*0.15;
var xf = xcanvas*0.3;
var yf = ycanvas*0.25;
var raioCabeca = (yf-ymax)*0.7;
var yPescoco = yf + 2*raioCabeca;
var yBunda = yPescoco + 2*(yf-ymax);
var yOmbro = yPescoco + 50;
var yMaos = yPescoco + 20;
var yPes = yBunda + 50;
var xMembrosDir = xf + 50;
var xMembrosEsq = xf - 50;
var xPrimeiraLinha = xo+ 100;
var xPrimeiraLetra = xPrimeiraLinha + 10;

//Posições para letras erradas (iteráveis)
var xLetraErrada = xo;
var yLetraErrada = ymax - 25;

//posições para fim de jogo
var xFinal = xcanvas*0.75;
var yFinal = ycanvas/2;

function limparCanvas() {
  pincel.clearRect(0,0,xcanvas,ycanvas);
  pincel.fillStyle = "white";
  pincel.fillRect(0,0,xcanvas,ycanvas);
  desenhaForca();
}

function desenhaForca() {
  pincel.fillStyle = "black";
  pincel.beginPath();
  pincel.moveTo(xo,yo);
  pincel.lineTo(xo+40,yBase);
  pincel.lineTo(xo-40,yBase);
  pincel.lineTo(xo,yo);
  pincel.lineTo(xo,ymax);
  pincel.lineTo(xf,ymax);
  pincel.lineTo(xf,yf);
  pincel.stroke();
   //reiniciar posições de letras erradas
  xLetraErrada = xo;
}

function desenhaLinhas(linhas) {
  limparCanvas();
  for (i=0;i<linhas;i++) {
    var xi = xPrimeiraLinha + i*75;
    var xf = xi + 50;

    pincel.fillStyle = "black";
    pincel.beginPath();

    pincel.moveTo(xi,yBase);
    pincel.lineTo(xf,yBase);
    pincel.stroke();
  }
}

function desenhaCabeca() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  var xc = xf;
  var yc = yf+raioCabeca;

  pincel.arc(xc,yc,raioCabeca,0,2*Math.PI);
  pincel.stroke();
}

function desenhaCorpo() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  pincel.moveTo(xf,yPescoco);
  pincel.lineTo(xf,yBunda);
  pincel.stroke();
}

function desenhaPernaDir() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  pincel.moveTo(xf,yBunda);
  pincel.lineTo(xMembrosDir,yPes);
  pincel.stroke();
}

function desenhaPernaEsq() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  pincel.moveTo(xf,yBunda);
  pincel.lineTo(xMembrosEsq,yPes);
  pincel.stroke();
}

function desenhaBracoDir() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  pincel.moveTo(xf,yOmbro);
  pincel.lineTo(xMembrosDir,yMaos);
  pincel.stroke();
}

function desenhaBracoEsq() {
  pincel.fillStyle = "black";
  pincel.beginPath();

  pincel.moveTo(xf,yOmbro);
  pincel.lineTo(xMembrosEsq,yMaos);
  pincel.stroke();
}

function desenhaLetraCerta(letra,indicesLetra,cor) {
      pincel.fillStyle = cor;
      indicesLetra.forEach(function(pos){
      pincel.fillText(letra,xPrimeiraLetra+75*pos,yBase-10);
    })
}

function desenhaLetraErrada(letra) {
  pincel.fillStyle = "red";
  pincel.fillText(letra,xLetraErrada,yLetraErrada);
  xLetraErrada += 50;
}

function desenhaBoneco(erros) {
  if (erros == 1){desenhaCabeca();}
  else if (erros == 2){desenhaCorpo();}
  else if (erros == 3){desenhaPernaDir();}
  else if (erros == 4){desenhaPernaEsq();}
  else if (erros == 5){desenhaBracoDir();}
  else if (erros == 6){desenhaBracoEsq();}
}

function desenhaVitoria() {
  pincel.fillStyle = "green";
  pincel.fillText("Você venceu!",xFinal,yFinal);
}

function desenhaDerrota() {
  pincel.fillStyle = "red";
  pincel.fillText("Você perdeu!",xFinal,yFinal);
}
