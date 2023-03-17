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
        boardCoordinatesX: [1,2,3,4,5,6,7,8],
        boardCoordinatesY: [1,2,3,4,5,6,7,8],
        ships: [],
        placeShip(coordinates){
            let newShip = ship(coordinates)
            // add new ship to ships array
            this.ships.push(newShip)
        }
    }
}

module.exports = {ship, gameboard}
// export {ship}