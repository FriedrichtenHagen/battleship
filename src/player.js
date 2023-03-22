({gameboard} = require("./gameboard.js"));


function player(name){
    return {
        name: name,
        turn: false,
        board: gameboard(),
        hitCoordinates: [],
        makeAMove(coordinates){
            // check if coordinates have already been hit
            if(!checkIfArrayContainsCoordinate(this.hitCoordinates, coordinates)){
                // send attack to board
                this.board.recieveAttack(coordinates)
                // add coordinates to array of hit coordinates
                this.hitCoordinates.push(coordinates)
            }
        },
        makeARandomMove(){
            let randomX = Math.floor(6*Math.random())
            let randomY = Math.floor(6*Math.random())
            let randomCo = [randomX, randomY]
            this.makeAMove(randomCo)
        }
    } 
}

function checkIfArrayContainsCoordinate(array, coordinate){
    let isCoordinateInArray = false
    array.forEach(arrayCoordinate => {
        // transform array into string to allow comparison
        let arrayCoordinateString = JSON.stringify(arrayCoordinate)
        let coordinateString = JSON.stringify(coordinate)
        // save the ship that was hit by the attack coordinates
        if(coordinateString === arrayCoordinateString){
            isCoordinateInArray = true
        }
    })
    return isCoordinateInArray
}


module.exports = {player, checkIfArrayContainsCoordinate}