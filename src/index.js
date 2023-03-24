import {player} from "./player.js"
import {gameboard, testBoard} from "./gameboard.js"
import {ship} from "./ship.js"
import {paintShips} from "./dom.js"



// main game loop

// create both players
const human = player("Friedrich")
const computer = player("Computer")
// preset the ships
// place human ships
human.gameboard.placeShipX([0,0],4)
human.gameboard.placeShipY([2,3],3)
human.gameboard.placeShipY([3,1],2)
// place computer ships
computer.gameboard.placeShipX([1,0],4)
computer.gameboard.placeShipX([5,3],3)
computer.gameboard.placeShipY([0,5],2)

// paint the ships onto board
paintShips(human.gameboard, "player1")
paintShips(human.gameboard, "player2")


// display human ships on field
// add eventlistener to all computer fields
    // make a human move (on computers field)computer.makeAMove([row, column])
        // displayMoves on DOM (hits, misses)
    // make a computer move( on the human field) human.makeARandomMove()







// // make human moves
// human.makeAMove([1,2])
// human.makeAMove([1,4])

// // place computer ships
// computer.gameboard.placeShipX([1,0],4)
// computer.gameboard.placeShipX([5,3],3)
// computer.gameboard.placeShipY([0,5],2)

// // make human moves
// computer.makeARandomMove()
// computer.makeARandomMove()
// computer.makeARandomMove()
// computer.makeARandomMove()
// computer.makeARandomMove()

// console.log(human.gameboard.board, computer.gameboard.board)


