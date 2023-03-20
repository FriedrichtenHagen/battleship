({ship} = require("./ship.js"));

function gameboard(){
    return {
        board: [
            // [row,column] (from 0-5)
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
        ],
        ships: [],
        placeShipX(startCo, length){
            // calculate the coord. of the ship
            let calcCoord = []
            for(let i=0; i<(length); i++){
                let additionalCo = [startCo[0], startCo[1]+i]
                calcCoord.push(additionalCo)
            }
            calcCoord.forEach(coordinate => {
                // problem: the array gets inserted as such: [[1,2]]
                this.board[coordinate[0]][coordinate[1]] = "S"                
            });
            // create ship
            let newShip = ship(calcCoord)
            // add new ship to ships array
            this.ships.push(newShip)
        },
        placeShipY(startCo, length){
            // calculate the coord. of the ship
            let calcCoord = []
            for(let i=0; i<(length); i++){
                let additionalCo = [startCo[0]+i, startCo[1]]
                calcCoord.push(additionalCo)
            }
            calcCoord.forEach(coordinate => {
                // problem: the array gets inserted as such: [[1,2]]
                this.board[coordinate[0]][coordinate[1]] = "S"                
            });
            // create ship
            let newShip = ship(calcCoord)
            // add new ship to ships array
            this.ships.push(newShip)
        },
        recieveAttack(attackCo){
            // a ship is hit
            if(this.board[attackCo[0]][attackCo[1]]==="S"){
                // find the correct ship object
                let hitShip;
                // go through each ship on gameboard
                this.ships.forEach((ship, shipsIndex) => {
                    // go through each coordinate of the ship
                    ship.coordinates.forEach((shipCoordinate) => {
                        // transform array into string to allow comparison
                        let coordinateString = JSON.stringify(shipCoordinate)
                        let attackCoString = JSON.stringify(attackCo)
                        // save the ship that was hit by the attack coordinates
                        if(coordinateString === attackCoString){
                            hitShip = ship
                        }
                    })
                });
                // add hit to ship
                hitShip.hit()

                // mark hit on board
                this.board[attackCo[0]][attackCo[1]] = "H"
            } else if(this.board[attackCo[0]][attackCo[1]]==="x"){
                // an empty field was hit

                // mark miss on board
                this.board[attackCo[0]][attackCo[1]] = "M"
            }
            // check if all ships are sunk


            
        },
    }
}
const testBoard = gameboard()
testBoard.placeShipX([0,0], 3)
console.log("gamebaordd")


module.exports = {gameboard, testBoard}