let amo;
let amo_fliped;
let bullet;
let bullet_fliped;
let cenario;
let empate;
let heart;
let img_player1;
let img_player2;
let jogar = false;
let menu;
let player1;
let player2;
let title;
let win_red;
let win_blue;

function setup() {
  createCanvas(600, 300);
}

function atirar() {
  for(let i = 0; i < 3; i++) {
    if(player1.bala[i].disparada == true) {
      if((millis() - player1.bala[i].momento).toFixed(0) > 500 * player1.bala[i].aux) {
        player1.bala[i].coluna += 100;
        player1.bala[i].aux++;
      }
    }
  }

  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true) {
      if((millis() - player2.bala[i].momento).toFixed(0) > 500 * player2.bala[i].aux) {
        player2.bala[i].coluna -= 100;
        player2.bala[i].aux++;
      }
    }
  }
}

function checa_acertou() {
  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true) {
      if(player2.bala[i].coluna == player1.coluna && player2.bala[i].linha == player1.linha) {
        player1.vida -= 1;
        player2.bala[i].aux = 1;
      }
    }

    if(player1.bala[i].disparada == true) {
      if(player1.bala[i].coluna == player2.coluna && player1.bala[i].linha == player2.linha) {
        player2.vida -= 1;
        player1.bala[i].aux = 1;
      }
    }
  }
}

function checa_posicao() {
  if(player1.linha < 0) {
    player1.linha = 235;
  }
  if(player2.linha < 0) {
    player2.linha = 235;
  }

  if(player1.linha > 300) {
    player1.linha = 35;
  }
  if(player2.linha > 300) {
    player2.linha = 35;
  }
}

function checa_bala() {
  for(let i = 0; i < 3; i++) {
    if(player1.bala[i].coluna > 545) {
      player1.bala[i].aux = 1;
    }
  
    if(player2.bala[i].coluna < 45) {
      player2.bala[i].aux = 1;
    }
  }
}

function cria_player(){
  player1 = {
  municao: 3,
  coluna: 35,
  linha: 35,
  bala: [{aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false}],
  vida: 5,
  recarregando: false,
  reload_momento: 0
  };

  player2 = {
  municao: 3,
  coluna: 535,
  linha: 35,
  bala: [{aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false}],
  vida: 5,
  recarregando: false,
  reload_momento: 0
  };
}

function draw() {
  if(jogar) {
    checa_acertou();
    checa_bala();
    checa_posicao();

    background(220);
    draw_matriz();
    draw_vidas();
    draw_players();

    recarregar();
    draw_balas();
    atirar();

  } else {
    draw_matriz();
    image(menu, 202, 130, 200, 80);

    if(player1 == undefined && player2 == undefined) {
      image(title, 199, 50, 200, 80);
    } else {
      fim_de_jogo(); 
    }
  }
}

function draw_balas() {
  fill(255, 204, 0);
  for(let i = 0; i < 3; i++) {
    if(player1.bala[i].disparada == true) {
      image(bullet, player1.bala[i].coluna + 23, player1.bala[i].linha + 19, 30, 30);
    } else {
      image(amo, i * 20, 10, 30, 30);
    }
  }

  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true) {
      image(bullet_fliped, player2.bala[i].coluna - 13, player2.bala[i].linha - 8, 30, 30);
    } else {
      image(amo_fliped, 575 - (i * 20), 10, 30, 30);
    }
  }
}

function draw_matriz() {
  fill(255, 248, 220);
  for(let l = 0; l < 6; l++) {
    for(let c = 0; c < 3; c++) {
      image(cenario, l * 100, c * 100, 0);
    }
  }
}

function draw_players() {
  image(img_player2, player2.coluna, player2.linha, 40, 40);
  image(img_player1, player1.coluna, player1.linha, 40, 40);
}

function draw_vidas() {
  if(player1.vida == 0 || player2.vida == 0) {
    jogar = false;
  }

  for(let i = 0; i < player1.vida; i++) {
    image(heart, i * 15, 0, 25, 25) 
  }
  for(let i = 0; i < player2.vida; i++) {
    image(heart, (575 - (i * 15)), 0, 25, 25) 
  }
}

function fim_de_jogo(){
  if(player1.vida == 0 && player2.vida > 0) {
    image(win_blue, 180, 40, 250, 80);
  } else if(player2.vida == 0 && player1.vida > 0) {
    image(win_red, 150, 40, 300, 80);
  } else if(player1.vida == 0 && player2.vida == 0) {
    image(empate, 150, 40, 300, 80); 
  }  
}

function preload(){
  win_blue = loadImage('imagens/azul_ganhou.jpg');
  win_red = loadImage('imagens/vermelho_ganhou.jpg');
  empate = loadImage('imagens/empate.jpg');
  menu = loadImage('imagens/Menu.jpg');
  title = loadImage('imagens/Shooter.jpg');
  heart = loadImage('imagens/heart.jpg');
  amo = loadImage('imagens/amo.jpg');
  amo_fliped = loadImage('imagens/amo_fliped.jpg');
  bullet = loadImage('imagens/bullet.jpg');
  bullet_fliped = loadImage('imagens/bullet_fliped.jpg');
  cenario = loadImage('imagens/ground.jpg');
  img_player1 = loadImage('imagens/player1.jpg');
  img_player2 = loadImage('imagens/player2.jpg');
}

function recarregar() {
  if(player1.recarregando == true) {
    if((millis() - player1.reload_momento).toFixed(0) > 4000) {
      for(let i = 0; i < 3; i++) {
        player1.bala[i].disparada = false;
      }
      player1.municao = 3;
      player1.recarregando = false;
    }
  }

  if(player2.recarregando == true) {
    if((millis() - player2.reload_momento).toFixed(0) > 4000) {
      for(let i = 0; i < 3; i++) {
        player2.bala[i].disparada = false;
      }
      player2.municao = 3;
      player2.recarregando = false;
    }
  }
}

function keyPressed() {
  //menu comands
  if(keyCode === 13){
    jogar = true;
    cria_player();
  }

  if(jogar == false && keyCode === 27){
    window.close();
  }

  // player 1 comands
  if(keyCode === 87) {
    player1.linha -= 100;
  }
  if(keyCode === 83) {
    player1.linha += 100;
  }
  if(keyCode === 68) {
    if(player1.municao >= 1 && player1.recarregando == false) {
      player1.bala[player1.municao - 1].disparada = true;
      player1.bala[player1.municao - 1].coluna = player1.coluna;
      player1.bala[player1.municao - 1].linha = player1.linha;
      player1.bala[player1.municao - 1].momento = millis();
      player1.municao -= 1;
    }
  }

  if(keyCode === 65) {
    if(player1.recarregando == false) {
      player1.recarregando = true;
      player1.reload_momento = millis();
    }
  }

  // player 2 comands
  if(keyCode === UP_ARROW) {
    player2.linha -= 100;
  }
  if(keyCode === DOWN_ARROW) {
    player2.linha += 100;
  }
  if(keyCode === LEFT_ARROW) {
    if(player2.municao >= 1 && player2.recarregando == false) {
      player2.bala[player2.municao - 1].disparada = true;
      player2.bala[player2.municao - 1].coluna = player2.coluna;
      player2.bala[player2.municao - 1].linha = player2.linha;
      player2.bala[player2.municao - 1].momento = millis();
      player2.municao -= 1;
    }
  }

  if(keyCode === RIGHT_ARROW) {
    if(player2.recarregando == false) {
      player2.recarregando = true;
      player2.reload_momento = millis();
    }
  }
}
