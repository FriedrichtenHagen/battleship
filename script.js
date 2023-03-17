function ship(coordinates){
    return {
        sunk: false,
        hits: 0,
        coordinates: coordinates,
        hit(){
            this.hits += 1
            return this.hits
        },
        isSunk(){
            if(this.hits===this.length()){
                return true
            }
            else{
                return false
            }
        },
        length(){
            let coordinateArray = this.coordinates
            return coordinateArray.length
        },
    }
}
const testShip = ship(3)

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
            let calcCoord = [startCo]
            for(let i=1; i<(length-1); i++){
                let additionalCo = [startCo[0], startCo[1]+1]
                calcCoord.push(additionalCo)
            }
            calcCoord.forEach(coordinate => {
                // problem: the array gets inserted as such: [[1,2]]
                this.board[coordinate] = "S"                
            });

            // create ship
            let newShip = ship(coordinates)
            // add new ship to ships array
            
        },
        placeShipY(coordinates){

        }
    }
}
const testBoard = gameboard()
module.exports = {ship, gameboard}
// export {ship}