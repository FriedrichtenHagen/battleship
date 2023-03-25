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
// paintShips(computer.gameboard, "player1")
paintShips(human.gameboard, "human")


// add eventlistener to all computer fields
const computerFields = document.querySelectorAll(".field1")
computerFields.forEach(computerField => {
    computerField.addEventListener("click", ()=> {
        // human move
        let clickedCoordinate = [parseInt(computerField.dataset.row), parseInt(computerField.dataset.column)]
        console.log(clickedCoordinate)
        // send (legal) attack to computer board
        if(computer.makeAMove(clickedCoordinate)){
            paintShips(computer.gameboard, "computer")

            if(computer.gameboard.gameOver){
                alert("gameover")
            }

            // random computer move on human board
            human.makeARandomMove()
            paintShips(human.gameboard, "human")

            if(human.gameboard.gameOver){
                alert("gameover")
            }
        }
    })
})








/* 
add a win or lose condition 
    add gameover message
*/


