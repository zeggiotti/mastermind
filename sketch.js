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

let origin_offset = 80;

let gameover = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  this.focus();
  
  width_offset = (displayWidth / 3) - ((digits + 2) / 2);

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
      input = createInput();
      input.position(width_offset + btn_offset * j, origin_offset + btn_offset * i);
      input.size(btn_size, btn_size);
      input.attribute('disabled', '');
      row.push(input);
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
  background(220);
  
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
        current_digit++;
      }
      
    } else if(keyCode == 8){
      
      if(current_digit > 0){
        board[attempt][current_digit].value('');
        current_digit--;
      }
      
    } else if(keyCode == 13 && current_digit == digits){
      checkNumber();
      
      current_digit = 0;
      attempt++;

      if(attempt == guesses){
        gameover = true;
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
    gameover = true;
  }
  
  player_guess = [];
}

