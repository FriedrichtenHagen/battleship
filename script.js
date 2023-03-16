function ship(coordinates){
    return {
        length(){
            let coordinateArray = this.coordinates
            return coordinateArray.length
        },
        sunk: false,
        hits: 0,
        coordinates: coordinates,
        hit(){
            this.hits += 1
            return this.hits
        },
        isSunk(){
            if(this.hits===this.length){
                return true
            }
            else{
                return false
            }
        }
    }
}
const testShip = ship(3)

function gameboard(){
    return {
        boardCoordinatesX: [1,2,3,4,5,6,7],
        boardCoordinatesY: [1,2,3,4,5,6,7],
        ships: [],
        placeShip(coordinates){
            let newShip = ship(coordinates)
            // add new ship to ships array
            this.ships.push(newShip)
        }
    }
}

module.exports = {ship}
// export {ship}