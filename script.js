//canvas
let canvasElement = document.querySelector("#myCanvas");
let contexto = canvasElement.getContext("2d");

//bola
let bolaX = 10;
let bolaY = 10;
let bola_velX = 5;
let bola_velY = 5;
let bola_dirX = 1;
let bola_dirY = 1;

//Jogador 1
let p1_Y = 200;
let p1_vel = 5;
let p1_move_cima = false;
let p1_move_baixo = false;
let p1_W = 25;	//largura 
let p1_H = 150;	//altura 
let p1_X = 30; //x
let p1_pontos = 0;

//Jogador 2
let p2_vel = 5;
let p2_Y = 200;
let p2_move_cima = false;
let p2_move_baixo = false; 
let p2_W = 25;	//largura 
let p2_H = 150;	//altura 
let p2_X = 745;	//x 
let p2_pontos = 0;


function Loop()
{  
requestAnimationFrame(Loop);
AtualizarLogicamente();
AtualizarGraficamente();
}
function AtualizarLogicamente(){
//Movimento bola
bolaX += bola_velX * bola_dirX
bolaY += bola_velY * bola_dirY
//Inputs
document.addEventListener("keydown", TeclaPressionada);
document.addEventListener("keyup", TeclaSolta);
//Campo do jogador 2(direita)
if (bolaX + 10 >= canvasElement.width){
    iniciarBola(1)
}
//Campo do jogador 1(esquerda)
if (bolaX - 10 <= 0){
    iniciarBola(2)
}
//Colisão vertical
if (bolaY + 10 >= canvasElement.height ||bolaY - 10 <= 0 ){
    bola_dirY *= -1
}
//colidir com o p1
if(bolaX >= p1_X && bolaX <= p1_X + p1_W && bolaY >= p1_Y && bolaY <= p1_Y + p1_H){
    bola_velX = 5;
}
//colidir com o p2
if(bolaX >= p2_X && bolaX <= p2_X + p2_W && bolaY >= p2_Y && bolaY <= p2_Y + p2_H){
    bola_velX = -5;
}
//jogador 1 movimento
if (p1_move_cima && p1_Y > 0 ){
    p1_Y -= p1_vel; 
}
if (p1_move_baixo && p1_Y + 150 < canvasElement.height){
    p1_Y += p1_vel; 
}
 //jogador 2 movimento
if (p2_move_cima && p2_Y > 0){
    p2_Y -= p2_vel;
}
if (p2_move_baixo && p2_Y + 150 < canvasElement.height){
    p2_Y += p2_vel; 
}

}
function AtualizarGraficamente(){
DesenhaBackground();
//Pontos P1
contexto.font = "100px monospace";//tamanho e fonte do texto
contexto.fillStyle = "Black";//cor do texto
contexto.fillText(p1_pontos, 75, 100);// texto, X e Y
//Pontos P2
contexto.font = "100px monospace";//tamanho e fonte do texto
contexto.fillStyle = "Black";//cor do texto
contexto.fillText(p2_pontos,675, 100);// texto, X e Y
//Bola
contexto.fillStyle = "Orange";
contexto.beginPath();
contexto.arc(bolaX, bolaY, 10, 0, Math.PI * 2, true);
contexto.fill();
 //Jogador 1
contexto.fillStyle = "Black";
contexto.fillRect(p1_X, p1_Y, p1_W, p1_H);
//Jogador 2
contexto.fillStyle = "Black";
contexto.fillRect(p2_X, p2_Y, p2_W, p2_H);
}

function DesenhaBackground()
{
 contexto.fillStyle = "#7adf5c";
contexto.fillRect(0, 0, 1300, 1000);
}
function TeclaPressionada(e)
{
if (e.keyCode == 87){
    p1_move_cima = true
}
if (e.keyCode == 83){
    p1_move_baixo = true
}
if (e.keyCode == 38){
    p2_move_cima = true
}
if (e.keyCode == 40){
    p2_move_baixo = true
}
}
function TeclaSolta(e)
{  
if (e.keyCode == 87){
    p1_move_cima = false
}
if (e.keyCode == 83){
    p1_move_baixo = false
}
if (e.keyCode == 38){
    p2_move_cima = false
}
if (e.keyCode == 40){
    p2_move_baixo = false
}
}
function iniciarBola(jogador){
//Pontuar os jogadores
if(jogador == 1){
    p1_pontos += 1
}
else{
    p2_pontos += 1
}
//Voltar a bola para o meio
bolaX = canvasElement.width / 2
bolaY = canvasElement.height/ 2
}
//Chamada
Loop();