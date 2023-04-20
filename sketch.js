// cifra - cifra - ... - cifra - n_cifre_corrette - n_cifre_in_pos_corrette

let seq = [];
let board = [];
let player_guess = [];

let grid_offset;

let guesses = 10;
let digits = 4;
let attempt = 0;
let current_digit = 0;

let btn_offset = 60;
let btn_size = 40;

let origin_offset = 150;
let info_offset = 0;

let gameover = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  this.focus();
  
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



