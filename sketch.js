const quadrado = 100;
//player 2 variables
let p1_atira = 0;
let p1_coluna = 45;
let p1_tiro_lpos;
let p1_lpos = 45;
let p1_vida = 5;
//player 2 variables
let p2_atira = 0;
let p2_coluna = 545;
let p2_tiro_lpos;
let p2_lpos = 45;
let p2_vida = 5;

let start, current;

function setup() {
  createCanvas(600, 300);
}

function draw_p1_vida() {
  fill(255, 0, 0);
  if(p1_vida == 0) {
    fill(000)
    //square(0, 0, 10)
  }
  for(let i = 0; i < p1_vida; i++) {
    square(i * 5, 0, 5) 
  }
}

function draw_p2_vida() {
  fill(255, 0, 0);
  if(p2_vida == 0) {
    fill(000)
    //square(0, 600, 10)
  }
  for(let i = 0; i < p2_vida; i++) {
    square(575 + (i * 5), 0, 5) 
  }
}

function checa_acertou() {
  if(p2_coluna == p1_coluna && p2_tiro_lpos == p1_lpos) {
    p1_vida -= 1;
  }
  if(p1_coluna == p2_coluna && p1_tiro_lpos == p2_lpos) {
    p2_vida -= 1;
  }
}

function checa_posicao() {
  if(p1_lpos < 0) {
    p1_lpos = 245;
  }
  if(p2_lpos < 0) {
    p2_lpos = 245;
  }

  if(p1_lpos > 300) {
    p1_lpos = 45;
  }
  if(p2_lpos > 300) {
    p2_lpos = 45;
  }
}

function checa_tiro() {
  if(p1_coluna > 600) {
    p1_atira = 0;
    p1_coluna = 45;
    p1_tiro_lpos = 0;
  }

  if(p2_coluna < 45) {
    p2_atira = 0;
    p2_coluna = 545;
    p2_tiro_lpos = 0;
  }
}

function draw() {
  checa_posicao();
  checa_tiro();

  background(220);
  draw_matriz();
  checa_acertou();
  draw_p1_vida();
  draw_p2_vida();
  draw_p1();
  draw_p2();

  draw_tiro();
  atirar();
}

function atirar() {
  if(p1_atira == 1) {
    wait(500);
    p1_coluna += 100;
  }
  
  if(p2_atira == 1) {
    wait(500);
    p2_coluna -= 100;
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
  square(45, p1_lpos, 10);
}

function draw_p2() {
  fill(000)
  square(545, p2_lpos, 10);
}



function draw_tiro() {
  fill(255, 204, 0);
  if(p1_atira == 1) {
    square(p1_coluna, p1_tiro_lpos, 5);
  } else {
    square(p1_coluna, p1_lpos, 5);
  }

  if(p2_atira == 1) {
    square(p2_coluna, p2_tiro_lpos, 5);
  } else {
    square(p2_coluna, p2_lpos, 5);
  }
}

function keyPressed() {
  // player 1 comands
  if(keyCode === 87) {
    p1_lpos -= 100;
  }
  if(keyCode === 83) {
    p1_lpos += 100;
  }
  if(keyCode === 68) {
    p1_atira = 1;
    p1_tiro_lpos = p1_lpos;
  }

  // player 2 comands
  if(keyCode === UP_ARROW) {
    p2_lpos -= 100;
  }
  if(keyCode === DOWN_ARROW) {
    p2_lpos += 100;
  }
  if(keyCode === LEFT_ARROW) {
    p2_atira = 1;
    p2_tiro_lpos = p2_lpos;
  }
}

function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}
