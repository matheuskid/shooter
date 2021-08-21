const quadrado = 100;
let player_lpos = 45;
let coluna = 45;
let tiro = 0;
let start, current;

function setup() {
  createCanvas(600, 300);
}

function draw_matriz() {
  fill(155);
  for(let l = 0; l < 6; l++) {
    for(let c = 0; c < 3; c++) {
      square(l * 100, c * 100, quadrado);
    }
  }
}

function draw_player() {
  square(45, player_lpos, 10);
}

function draw() {
  if(player_lpos < 0) {
    player_lpos = 45 + 200;
  }
  if(player_lpos > 300) {
    player_lpos = 45;
  }
  if(coluna > 600) {
    tiro = 0;
    coluna = 45;
  }

  background(220);
  draw_matriz();
  draw_player();
  draw_tiro();
  atira();
}

function atira() {
  if(tiro == 1) {
    wait(500);
    coluna += 100;
  }
}

function draw_tiro() {
  fill(255, 204, 0)
  square(coluna, player_lpos, 5);
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    player_lpos -= 100;
  }
  if(keyCode === DOWN_ARROW) {
    player_lpos += 100;
  }
  if(keyCode === LEFT_ARROW) {
    tiro = 1;
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
