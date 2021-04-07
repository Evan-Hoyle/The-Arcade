let currentPlayer = null;
let playerPits = [[0,0,0,0,0,0],[0,0,0,0,0,0]]
let playerMan = [0, 0];
const pipDiv = '<div class="pip"></div>';
let versusComp = false;

function gameStart() {
  versusComp = false;
  currentPlayer = whosFirst ()
  for (let i = 0; i < 6; i++) {
    playerPits [0][i] = 4;
    playerPits [1][i] = 4;
  }
  playerMan [0] = 0;
  playerMan [1] = 0;

  renderState ();
}
$ ('.newGame').click (gameStart);

function compGameStart () {
  versusComp = true;
  $ ('#player2 .name').text ('COMPUTER')
  currentPlayer = whosFirst ()
  for (let i = 0; i < 6; i++) {
    playerPits [0][i] = 4;
    playerPits [1][i] = 4;
  }
  playerMan [0] = 0;
  playerMan [1] = 0;

  renderState ();
  if (currentPlayer == 2) {
    compPlayer ();
  }
}
$ ('.compGame').click (compGameStart);

// render
function renderState() {
  
  for (let i = 1; i <= playerPits.length; i++) {
   displayMancala (i);

    for (let j = 1; j <= playerPits[i -1].length; j++) {

      displayPips (i, j);
    }
  
  }
  
  if (currentPlayer != null) {
  $ ('#playerTurn').text ($('#player' + currentPlayer + ' .name').text() + '\'s Turn')
  
  }else {
    $ ('#playerTurn').text ('');
  }
  
    
   
}

// Helper Functions
function whosFirst () {
 return Math.floor(Math.random() * 2) + 1;
}

function compPlayer () {
 let pit = 0;
 let currentPips = 0;
 while (currentPips == 0) {
  pit = Math.floor(Math.random() * 6) + 1;
  console.log (pit);
  currentPips = playerPits [1] [pit -1];
 }
 $ ('#player2pit' + pit).click ()
}

function checkForWin () {
  let isGameEnd = true;
  for (let i = 0; i < playerPits.length; i++) {
    isGameEnd = true;
 
     for (let j = 0; j < playerPits[i].length; j++) {
        if (playerPits[i] [j] != 0) {
          isGameEnd = false;
          break;
        }
       
     }
   if (isGameEnd == true) {
     break;
   } 
   
  }
   
   return isGameEnd;
}

function displayPlayerWin () {
  
  for (let i = 0; i < playerPits.length; i++) {
   
 
     for (let j = 0; j < playerPits[i].length; j++) {
      playerMan [i] += playerPits [i] [j];
      playerPits [i] [j] = 0;
      
     }
   
   }
   if (playerMan [0] > playerMan [1]) {
   $ ('#playerWin').text ($('#player1 .name').text() + ' Wins');
  
  }else if (playerMan [1] > playerMan [0]) {
    $ ('#playerWin').text ($('#player2 .name').text() + ' Wins');  
  
  }else {
    $ ('#playerWin').text ('Draw');
  }

}

function displayPips (player, pit) {
  let currentPips = playerPits [player -1] [pit -1];
  let pipCount = '';
  for (let i = 0; i < currentPips; i++) {
    pipCount = pipCount + pipDiv;
  }
  $ ('#player' + player + 'pit' + pit).html (pipCount);
}

function displayMancala (player) {
  let currentPips = playerMan [player -1];
  let pipCount = '';
  for (let i = 0; i < currentPips; i++) {
    pipCount = pipCount + pipDiv;
  }
  $ ('#man' + player).html (pipCount);
}
// listeners
function nameInput () {
  let playerNameInput = prompt ('Enter Name Here');

  if (playerNameInput != null) { 
    
    $ (this).prev ().text (playerNameInput);

    }

}
$ ('.player .edit').click (nameInput);


function onBoardClick() {
  let player = $(this).data ('player');
  let pit = $(this).data ('pit');
  
  let currentPips = playerPits [player -1] [pit -1];
  if (currentPlayer == player && currentPips > 0) {
       
    playerPits [player -1] [pit -1] = 0;
    let currentPosition = 0;
    for (let i = 0; i < currentPips; i++, currentPosition++) {
      if (pit + currentPosition < 6) {
     
        playerPits [player -1] [pit + currentPosition]++;     
    
      }else if (pit + currentPosition == 6 && player == currentPlayer){
        playerMan [player -1]++;
      }else {
        pit = 0; 
        if (player == 1) {
          player = 2;
        }else {
          player = 1;
        }
         currentPosition = 0;
         playerPits [player -1] [pit + currentPosition]++;
      }
    renderState ();
    }
    let lastPit = playerPits [player -1] [pit + currentPosition -1];
    let reversePlayer = 0;
    if (player == 1) {
      reversePlayer = 2;
    }else {
      reversePlayer = 1;
    }
    let oppositePit = Math.abs((pit + currentPosition) -7)
    let oppositeLastPit = playerPits [reversePlayer -1] [oppositePit -1];
    if (lastPit == 1 && oppositeLastPit > 0) {
      playerMan [currentPlayer -1] += lastPit;
      playerPits [player -1] [pit + currentPosition -1] = 0;
      
      playerMan [currentPlayer -1] += oppositeLastPit;
      playerPits [reversePlayer -1] [oppositePit -1] = 0;
    }

    if (pit + currentPosition != 7) {    
        if (currentPlayer == 1) {
          currentPlayer = 2;
          
        
          }else {
            currentPlayer = 1;
        }
      }  
     
         
  }
  if (checkForWin()) {
    displayPlayerWin();
    currentPlayer = null;
  } else if (versusComp == true && currentPlayer == 2) {
    setTimeout (compPlayer, 1000);  
  }
  renderState();
}

$('.pit').on ('click', onBoardClick);