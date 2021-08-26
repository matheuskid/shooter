const quadrado = 100;

//player 1 variables
let player1 = {
  municao: 3,
  coluna: 45,
  linha: 45,
  bala: [{aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false}],
  vida: 5,
  recarregando: false,
  reload_momento: 0};
                
//player 2 variables
let player2 = {
  municao: 3,
  coluna: 545,
  linha: 45,
  bala: [{aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false},
         {aux: 1, coluna: 0, linha: 0, momento: 0, disparada: false}],
  vida: 5,
  recarregando: false,
  reload_momento: 0};

function setup() {
  createCanvas(600, 300);
}

function atirar() {
  for(let i = 0; i < 3; i++) {
    if(player1.bala[i].disparada == true && player1.recarregando == false) {
      if((millis() - player1.bala[i].momento).toFixed(0) > 500 * player1.bala[i].aux) {
        player1.bala[i].coluna += 100;
        player1.bala[i].aux++;
      }
    }
  }

  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true && player2.recarregando == false) {
      if((millis() - player2.bala[i].momento).toFixed(0) > 500 * player2.bala[i].aux) {
        player2.bala[i].coluna -= 100;
        player2.bala[i].aux++;
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

function checa_posicao() {
  if(player1.linha < 0) {
    player1.linha = 245;
  }
  if(player2.linha < 0) {
    player2.linha = 245;
  }

  if(player1.linha > 300) {
    player1.linha = 45;
  }
  if(player2.linha > 300) {
    player2.linha = 45;
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
      square(player1.bala[i].coluna, player1.bala[i].linha, 5);
    } else {
      square(i * 5, 5, 5);
    }
  }

  for(let i = 0; i < 3; i++) {
    if(player2.bala[i].disparada == true) {
      square(player2.bala[i].coluna, player2.bala[i].linha, 5);
    } else {
      square(595 - (i * 5), 5, 5);
    }
  }
}

function draw_matriz() {
  fill(155);
  for(let l = 0; l < 6; l++) {
    for(let c = 0; c < 3; c++) {
      square(l * 100, c * 100, quadrado);
    }
  }
}

function draw_p1() {
  fill(000)
  square(player1.coluna, player1.linha, 10);
}

function draw_p1_vida() {
  fill(255, 0, 0);
  if(player1.vida == 0) {
    fill(000)
    //square(0, 0, 10)
  }
  for(let i = 0; i < player1.vida; i++) {
    square(i * 5, 0, 5) 
  }
}

function draw_p2() {
  fill(000)
  square(player2.coluna, player2.linha, 10);
}

function draw_p2_vida() {
  fill(255, 0, 0);
  if(player2.vida == 0) {
    fill(000)
    //square(0, 600, 10)
  }
  for(let i = 0; i < player2.vida; i++) {
    square(595 - (i * 5), 0, 5) 
  }
}

function recarregar() {
  if(player1.recarregando == true) {
    if((millis() - player1.reload_momento).toFixed(0) > 1000) {
      for(let i = 0; i < 3; i++) {
        player1.bala[i].disparada = false;
      }
      player1.municao = 3;
      player1.recarregando = false;
    }
  }

  if(player2.recarregando == true) {
    if((millis() - player2.reload_momento).toFixed(0) > 1000) {
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
    if(player1.municao >= 1) {
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
    if(player2.municao >= 1) {
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
