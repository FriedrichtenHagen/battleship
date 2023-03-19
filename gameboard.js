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
                this.ships.forEach(ship => {
                    if(ship.coordinates.includes(attackCo)){
                        hitShip = ship
                    }
                });
                hitShip.hit()
                hitShip.isSunk()

                // mark hit,miss on board

                return hitShip
            } else{
                // an empty field was hit


                return false
            }
        },
    }
}
const testBoard = gameboard()


module.exports = {gameboard}