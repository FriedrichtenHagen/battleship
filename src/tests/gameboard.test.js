({gameboard} = require("/home/friedrichtenhagen/battleship/src/gameboard.js"));
({ship} = require("/home/friedrichtenhagen/battleship/src/ship.js"));

// test placing horizontally
test('place ship on board horizontally: check the array representation', () => {
    const startCoords = [1,2]
    const gameboardTest = gameboard()
    gameboardTest.placeShipX(startCoords, 4)

    expect(gameboardTest.board).toStrictEqual(
        [
            // [row,column] (from 0-5)
            ["x","x","x","x","x","x"],
            ["x","x","S","S","S","S"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
        ]
    )
});
test('place ship on board: gameboard.ships array', () => {
    const startCoords = [1,2]
    const gameboardTest = gameboard()
    gameboardTest.placeShipX(startCoords, 4)

    expect(gameboardTest.ships.length).toBe(1)
});
// test placing vertically
test('place ship on board vertically: check the array representation', () => {
    const startCoords = [1,2]
    const gameboardTest = gameboard()
    gameboardTest.placeShipY(startCoords, 4)

    expect(gameboardTest.board).toStrictEqual(
        [
            // [row,column] (from 0-5)
            ["x","x","x","x","x","x"],
            ["x","x","S","x","x","x"],
            ["x","x","S","x","x","x"],
            ["x","x","S","x","x","x"],
            ["x","x","S","x","x","x"],
            ["x","x","x","x","x","x"],
        ]
    )
});


// test recieving an attack
test('a attack on the board transfering to the ships hits', () => {
    // setup a board with a placed ship
    let player1 = gameboard()
    player1.placeShipX([0,0], 3)
    player1.recieveAttack([0,2])

    expect(player1.ships[0].hits).toBe(1)
});
test('check the resulting board after a attack', () => {
    // setup a board with a placed ship
    let player1 = gameboard()
    player1.placeShipX([0,0], 3)
    player1.recieveAttack([0,2])
    player1.recieveAttack([1,3])
    player1.recieveAttack([4,4])

    expect(player1.board).toStrictEqual(
        [
            // [row,column] (from 0-5)
            ["S","S","H","x","x","x"],
            ["x","x","x","M","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","M","x"],
            ["x","x","x","x","x","x"],
        ]
    )
});


test('if the gameover check works', () => {
    // setup a board with a placed ship
    let player1 = gameboard()
    player1.placeShipX([0,0], 3)
    player1.recieveAttack([0,0])
    player1.recieveAttack([0,1])
    player1.recieveAttack([0,2])

    expect(player1.recieveAttack([0,2])).toBe("game over")
});