
function paintShips(gameboard, player){
    const gameboardArray = gameboard.board
    let field;
    // computer
    if(player === "computer"){
        field = ".field1"

        for(let r=0; r<gameboardArray.length; r++){
            for(let c=0; c<gameboardArray[r].length; c++){
                // loop through the whole two dimensional array
                // gameboardArray[r][c]
                let currentField = document.querySelector(`${field}[data-row="${r}"][data-column="${c}"]`)
                if(gameboardArray[r][c]==="H"||gameboardArray[r][c]==="M"){
                    currentField.textContent = gameboardArray[r][c]
                }
                
                // maybe add cooler animation at this point
                // ...
                // remove Eventlistener from that field
            }
        }

    // human
    }else if(player === "human"){
        field = ".field2"

        for(let r=0; r<gameboardArray.length; r++){
            for(let c=0; c<gameboardArray[r].length; c++){
                // loop through the whole two dimensional array
                // gameboardArray[r][c]
                let currentField = document.querySelector(`${field}[data-row="${r}"][data-column="${c}"]`)
                if(gameboardArray[r][c]==="S"||gameboardArray[r][c]==="H"||gameboardArray[r][c]==="M"){
                    currentField.textContent = gameboardArray[r][c]
                }
                
                // maybe add cooler animation at this point
                // ...
    
            }
        }
    }
}

module.exports = {paintShips}