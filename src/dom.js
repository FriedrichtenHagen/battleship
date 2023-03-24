
function paintShips(gameboard, player){
    const gameboardArray = gameboard.board
    let field;
    if(player === "player1"){
        field = ".field1"

    }else if(player === "player2"){
        field = ".field2"
    }
    for(let r=0; r<gameboardArray.length; r++){
        for(let c=0; c<gameboardArray[r].length; c++){
            // loop through the whole two dimensional array
            // gameboardArray[r][c]
            let currentField = document.querySelector(`${field}[data-row="${r}"][data-column="${c}"]`)
            currentField.textContent = gameboardArray[r][c]
            // maybe add cooler animation at this point
            // ...

        }
    }
}

module.exports = {paintShips}