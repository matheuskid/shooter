const quadrado = 100;

//player 1 variables
let player1 = {municao: 3,
                coluna: 545,
                linha: 45,
                bala: [{aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false},
                        {aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false},
                        {aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false}],
                vida: 5};
                
//player 2 variables
let player2 = {municao: 3,
                coluna: 545,
                linha: 45,
                bala: [{aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false},
                        {aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false},
                        {aux: 1, coluna: 545, linha: 45, momento: 0, disparada: false}],
                vida: 5};

function setup() {
  createCanvas(600, 300);
}

function atirar() {
  if(p1_atira == 1) {
    text((atira_auxiliar_p1), 200, 10)
    if((millis() - momento_tiro_p1).toFixed(0) > 500 * atira_auxiliar_p1) {
      p1_tiro_col += 100;
      atira_auxiliar_p1++;
    }
  }

  if(p2_atira == 1) {
    text((atira_auxiliar_p2), 10, 10)
    if((millis() - momento_tiro_p2).toFixed(0) > 500 * atira_auxiliar_p2) {
      p2_tiro_col -= 100;
      atira_auxiliar_p2++;
    }
  }
}


function checa_acertou() {
  for(let i = 0; i < 3; i++) {
    if(player1.bala[i].coluna == player2.coluna && player1.bala[i].coluna == player2.coluna) {
      player2.vida -= 1;
      player1.bala[i].coluna = 45;
      player1.bala[i].linha = player1.linha;
    }
  
    if(player2.bala[i].coluna == player2.coluna && player1.bala[i].coluna == player2.coluna) {
      player1.vida -= 1;
      player2.bala[i].coluna = 45;
      player2.bala[i].linha = player2.linha;
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
      player1.bala[i].coluna = 45;
      player1.bala[i].linha = player1.linha;
    }
  
    if(player2.bala[i].coluna < 45) {
      player2.bala[i].coluna = 545;
      player2.bala[i].linha = player2.linha;
    }
  }
}

function draw() {
  checa_acertou();
  checa_bala();
  checa_posicao();

  background(220);
  draw_matriz();
  draw_p1_vida();
  draw_p2_vida();
  draw_p1();
  draw_p2();

  draw_balas();
  atirar();
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
  square(45, player1.linha, 10);
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
  square(545, player2.linha, 10);
}

function draw_p2_vida() {
  fill(255, 0, 0);
  if(player2.vida == 0) {
    fill(000)
    //square(0, 600, 10)
  }
  for(let i = 0; i < player2.vida; i++) {
    square(600 - (i * 5), 0, 5) 
  }
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
      square(600 - (i * 5), 5, 5);
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
    if(player1.municao > 1) {
      player1.bala[player1.municao].disparada = true;
      player1.bala[player1.municao].momento = millis();
      player1.municao -= 1;
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
    if(player2.municao > 1) {
      player2.bala[player2.municao].disparada = true;
      player2.bala[player2.municao].momento = millis();
      player2.municao -= 1;
    }
  }
}
