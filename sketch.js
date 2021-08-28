let heart;
let amo;
let amo_fliped;
let bullet;
let bullet_fliped;
let cenario;
let img_player1;
let img_player2;

//player 1 variables
let player1 = 
{
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
//player 2 variables
let player2 = 
{
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

function preload(){
  heart = loadImage('heart.jpg');
  amo = loadImage('amo.jpg');
  amo_fliped = loadImage('amo_fliped.jpg');
  bullet = loadImage('bullet.jpg');
  bullet_fliped = loadImage('bullet_fliped.jpg');
  cenario = loadImage('ground.jpg');
  img_player1 = loadImage('player1.jpg');
  img_player2 = loadImage('player2.jpg');
}

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

function checa_acertou_p1() {
  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true) {
      if(player2.bala[i].coluna == player1.coluna && player2.bala[i].linha == player1.linha) {
        player1.vida -= 1;
        player2.bala[i].aux = 1;
      }
    }
  }
}

function checa_acertou_p2() {
  for(let i = 0; i < 3; i++) {
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

function draw() {
  checa_acertou_p1();
  checa_acertou_p2();
  checa_bala();
  checa_posicao();

  background(220);
  draw_matriz();
  draw_p1_vida();
  draw_p2_vida();
  draw_p1();
  draw_p2();

  recarregar();
  draw_balas();
  atirar();
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

function draw_p1() {
  fill(000)
  image(img_player1, player1.coluna, player1.linha, 40, 40);
}

function draw_p1_vida() {
  fill(255, 0, 0);
  if(player1.vida == 0) {
    fill(000)
    //square(0, 0, 10)
  }
  for(let i = 0; i < player1.vida; i++) {
    image(heart, i * 15, 0, 25, 25) 
  }
}

function draw_p2() {
  fill(000)
  image(img_player2, player2.coluna, player2.linha, 40, 40);
}

function draw_p2_vida() {
  fill(255, 0, 0);
  if(player2.vida == 0) {
    fill(000)
    //square(0, 600, 10)
  }
  for(let i = 0; i < player2.vida; i++) {
    image(heart, (575 - (i * 15)), 0, 25, 25) 
  }
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

  if(keyCode === 82) {
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
