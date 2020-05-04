//create board array with 9 indexes
//set player "X" to -1 and "O" to 1
//when checking for win, check to see if board[gameWinScenarios[i][0]] + board[gameWinScenarios[i][1]] + board[gameWinScenarios[i][2]] === -3 or 3
//if -3 -> "X" wins
//if 3 -> "O" wins
let board = [null, null, null, null, null, null, null, null, null]
const gameWinScenarios = [
[0,1,2], [3,4,5], [6,7,8], 
[0,3,6], [1,4,7], [2,5,8], 
[0,4,8], [2,4,6]
]

let turn = -1;
let winner = null;
document.getElementById('play-again-btn').addEventListener("click", init);

function init() {
  //re-initialize our fresh game vars
  turn = -1;
  winner = null;
  board = [null, null, null, null, null, null, null, null, null];
  //grab the sections and rows that sit on the DOM
  let sections = document.querySelectorAll('section');
  let rows = document.querySelectorAll('.row');

  //Loop thru our collection of sections
  for(let i = 0; i < sections.length; i++) {
    console.log("SECTIONS i ", sections[i])
    //add an event listener to each square, take advantage of event delegation
    sections[i].addEventListener("click", (event) => {
      squareClicked(event)
    })
  }
  for(let i = 0; i < rows.length; i++) {
    console.log("ROW i ", rows[i])
    //set each squares innerHTML to empty string
    rows[i].innerHTML = '';
  }
  console.log("TURN ", turn)
  //hide play again button, and set header text
  document.getElementById('play-again-btn').style.visibility = 'hidden';
  document.querySelector(".message").textContent = "Go Get `Em Tiger!"
}



function squareClicked(event) {
  //Set the innerHTML of the square clicked to whatever the value is of this.turn("X" or "O")
  event.target.innerHTML = `<h1>${turn === -1 ? "X" : "O"}</h1>`;
  //event.target.id is currently "cell-(whatever cell number)"
    //Must covert last character to number and push it to the corresponding turn array (X: [] or O: [])
  console.log("EVENT Target ", event.target.id)
  //e.g. -> cell-5 would place either 1 or -1 at index 5 of our board
  board[event.target.id.charAt(5)] = turn;
  turn *= -1;
  // this[this.turn].push(parseInt(event.target.id.charAt(5)));
  // this.numTurns++
  //everytime we click a sqr, check for a win
  checkForWin();
}

function checkForWin() {
  //loop through our game win scenarios array of nested arrays
  for(let i = 0; i < gameWinScenarios.length; i++) {
    //check to see if any index trios in our board are occupied completely.
      //i.e. if index 1, 4, 7 in our board are all occupied by -1, then the absolute value of -1 + -1 + -1 is 3, which means we have a winner
    if(Math.abs(board[gameWinScenarios[i][0]] + board[gameWinScenarios[i][1]] + board[gameWinScenarios[i][2]]) === 3) {
      //then we say that the winner is whatever turn sits at the first index of the win scenario trio
        //i.e. 1, 4, 7 -> board[1] === -1 -> X wins
      winner = board[gameWinScenarios[i][0]];
    }
  } 
  render();
}

function render() {
  if(winner === -1) {
    document.querySelector(".message").textContent = "X Wins!"
    document.getElementById('play-again-btn').style.visibility = 'visible'
    
  } else if(winner === 1) {
    document.querySelector(".message").textContent = "O Wins!"
    document.getElementById('play-again-btn').style.visibility = 'visible'
  } else if(!board.includes(null)) {
    document.querySelector(".message").textContent = "Cats Game!"
    document.getElementById('play-again-btn').style.visibility = 'visible';
  }
}

init();








/* BELOW IS MY FIRST (LESS OPTIMAL) SOLUTION */
// const game = {
//   turn: "X",
//   X: [],
//   O: [],
//   numTurns: 0,
//   gameWinScenarios: [
//     [1,2,3], [4,5,6], [7,8,9], 
//     [1,4,7], [2,5,8], [3,6,9], 
//     [1,5,9], [3,5,7]
//   ],
//   initialize: function() {
//     this.turn = "X";
//     let sections = document.querySelectorAll('section')
//     for(let i = 0; i < sections.length; i++) {
//       sections[i].addEventListener("click", (event) => {
//         console.log("THIS IS ", this)
//         this.squareClicked(event)
//       })
//     }
//   },
//   squareClicked: function(event) {
//     //Set the innerHTML of the square clicked to whatever the value is of this.turn("X" or "O")
//     event.target.innerHTML = `<h1>${this.turn}</h1>`;
//     //event.target.id is currently "cell-(whatever cell number)"
//       //Must covert last character to number and push it to the corresponding turn array (X: [] or O: [])
//     this[this.turn].push(parseInt(event.target.id.charAt(5)));
//     this.numTurns++

//     this.checkForWin();
//     this.turn = this.turn === "X" ? "O" : "X";
//   },
//   checkForWin: function() {
//     //game win scenarios:
//       /* [[1,2,3], [4,5,6], [7,8,9]
//        [1,4,7], [2,5,8], [3,6,9]
//        [1,5,9], [3,5,7]] */
//     //iterate over gameWinScenarios and check to see if the current turn array includes every element of any array
//     console.log(this.numTurns)
//     let isWin = null;
//     return this.gameWinScenarios.forEach((array, idx) => {    
//       //each array contains a possible win scenario
//       isWin = this.arrayContainsArray(array, this[this.turn])
//       console.log(isWin)
//       if(isWin) {
//         alert(`Congratulations ${this.turn}, you won!`)
//       } else if(!isWin && this.numTurns === 9) {
//         this.numTurns = 0;
//         alert("CATS GAME BABY!!")
//       }
//     })
//   },
//   arrayContainsArray: function(superSet, subSet) {
    
//     //how can we optimize?
//     return superSet.every(function(value) {
//       return (subSet.indexOf(value) >= 0)
//     })
//   }
// }

// game.initialize()


//create a function that initializes the game with fresh variables
//create a function that populates the board with X or O when div is clicked and changes users turn
//create a function that checks for winner