// cifra - cifra - ... - cifra - n_cifre_corrette - n_cifre_in_pos_corrette

let seq = [];
let board = [];
let player_guess = [];

let grid_offset;
let btn_offset = 60;
let btn_size = 40;

let origin_offset = 150;
let info_offset = 0;

let guesses = 8;
let digits = 4;

let attempt = 0;
let current_digit = 0;
let gameover = false;

let restartbtn;
let digit_sel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  this.focus();
  
  width_offset = (windowWidth / 2) - (((digits + 2) * btn_offset) / 2);

  for(let i = 0; i < digits; i++){
    let r = Math.floor((Math.random() * 9) + 1);
    if(!seq.includes(r)){
      seq[i] = r;
    } else {
      i -= 1;
    }
  }
  
  console.log(seq);
  
  for(let i = 0; i < guesses; i++){
    let row = [];
    for(let j = 0; j < digits + 2; j++){
      
      if(j >= digits){
        info_offset = 40;
      }
      
      input = createInput();
      input.position(info_offset + width_offset + btn_offset * j, origin_offset + btn_offset * i);
      input.size(btn_size, btn_size);
      input.attribute('disabled', '');
      input.addClass('text-box');
      row.push(input);
      
      info_offset = 0;
      
    }
    board.push(row);
  }
  
  restartbtn = createButton('Restart');
  restartbtn.position(windowWidth / 2, origin_offset + btn_offset * guesses + 20);
  restartbtn.addClass('button-11');
  restartbtn.mousePressed(restart);
  
  /*
  button = createButton("submit");
  button.position(30, 30);
  button.mousePressed(drawName);
  */
}

function drawName(){
  attempt++;
  current_digit++;
}

function draw() {
  background(28);
  
  textSize(15);
  fill(200);
  text("Your Guesses", width_offset, origin_offset - 20);
  text("# Right\nDigits", width_offset + 40 + btn_offset * digits, origin_offset - 30);
  text("# Right\nPositions", width_offset + 40 + btn_offset * (digits + 1), origin_offset - 30);
  
  let title = createElement('h1', 'Mastermind');
  title.addClass('title');
  title.position(width_offset,10);
  
  for(let i = 0; i < guesses; i++){
    for(let j = 0; j < digits + 2; j++){
      if(i == attempt && j == current_digit && j < digits){
        board[i][j].removeAttribute('disabled');
      } else {
        board[i][j].attribute('disabled', '');
      }
    }
  }
  
}

function keyPressed(){
  
  if(!gameover){
    
    let n = null;

    if(keyCode >= 49 && keyCode <= 57){
      
      n = keyCode - 48;

      if(current_digit < digits){
        board[attempt][current_digit].value(n);
        if(current_digit < digits - 1){
          current_digit++;
        }
      }
      
    } else if(keyCode == 8){
      board[attempt][current_digit].value('');
      
      if(current_digit > 0){
        current_digit--;
      }
      
    } else if(keyCode == 13 && current_digit == digits - 1 && board[attempt][current_digit].value() != ""){
      checkNumber();
      
      if(!gameover){
        current_digit = 0;
        attempt++;

        if(attempt == guesses){
          gameover = true;
          
          for(let i = 0; i < digits; i++){
            board[attempt - 1][i].addClass('lost');
          }
        }
      }
    }
    
  }
  
}

function checkNumber(){
  let guessed = true;
  let numcorretti = 0;
  let poscorrette = 0;
  
  for(let i = 0; i < digits; i++){
    player_guess.push(parseInt(board[attempt][i].value()));
    
    if(player_guess[i] != seq[i]){
      guessed = false;
    }
    
    if(player_guess[i] == seq[i]){
      poscorrette++;
    }
    
  }
  
  // Count the correct numbers
  let uniq_guess = [...new Set(player_guess)];
  
  for(let i = 0; i < uniq_guess.length; i++){
    if(seq.includes(uniq_guess[i])){
      numcorretti++;
    }
  }
  
  board[attempt][digits].value(numcorretti);
  board[attempt][digits + 1].value(poscorrette);

  if(guessed){
    console.log("indovinato!!");
    
    for(let i = 0; i < 10; i++){
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
    }
    
    gameover = true;
    
    for(let i = 0; i < digits; i++){
      board[attempt][i].addClass('won');
    }
    
    board[attempt][current_digit].attribute('disabled', '');
    
  }
  
  player_guess = [];
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function restart(){
  for(let i = 0; i < digits; i++){
    let r = Math.floor((Math.random() * 9) + 1);
    if(!seq.includes(r)){
      seq[i] = r;
    } else {
      i -= 1;
    }
  }
  
  console.log(seq);
  
  for(let i = 0; i < guesses; i++){
    for(let j = 0; j < digits + 2; j++){
      board[i][j].value("");
      if(board[i][j].hasClass('won')){
        board[i][j].removeClass('won');
      }
      if(board[i][j].hasClass('lost')){
        board[i][j].removeClass('lost');
      }
    }
  }
  
  attempt = 0;
  current_digit = 0;
  gameover = false;
}

function selChanged(){
  for(let i = 0; i < guesses; i++){
    for(let j = 0; j < digits + 2; j++){
      board[i][j].remove();
    }
  }
  
  digits = parseInt(digit_sel.value());
  
  width_offset = (windowWidth / 2) - (((digits + 2) * btn_offset) / 2);

  for(let i = 0; i < 4; i++){
    let r = Math.floor((Math.random() * 9) + 1);
    if(!seq.includes(r)){
      seq[i] = r;
    } else {
      i -= 1;
    }
  }
  
  console.log(seq);
  
  for(let i = 0; i < guesses; i++){
    let row = [];
    for(let j = 0; j < digits + 2; j++){
      
      if(j >= digits){
        info_offset = 40;
      }
      
      input = createInput();
      input.position(info_offset + width_offset + btn_offset * j, origin_offset + btn_offset * i);
      input.size(btn_size, btn_size);
      input.attribute('disabled', '');
      input.addClass('text-box');
      row.push(input);
      
      info_offset = 0;
      
    }
    board.push(row);
  }
  
  restartbtn = createButton('Restart');
  restartbtn.position(windowWidth / 2, origin_offset + btn_offset * guesses + 20);
  restartbtn.mousePressed(restart);
  
  digit_sel = createSelect();
  digit_sel.option('4');
  digit_sel.option('5');
  digit_sel.option('6');
  digit_sel.option('7');
  digit_sel.option('8');
  digit_sel.position(width_offset - 150, origin_offset + 100);
  digit_sel.changed(selChanged);
}

