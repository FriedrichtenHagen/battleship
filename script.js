function ship(length){
    return {
        length: length,
        sunk: false,
        hits: 0,
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
const testShip = ship(4)


