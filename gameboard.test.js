({gameboard} = require("./gameboard.js"));
({ship} = require("./ship.js"));

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
test('check recieving a bomb', () => {
    // setup a board with a placed ship
    const gameboardTest = gameboard()
    gameboardTest.board = 
    [
        // [row,column] (from 0-5)
        ["x","x","x","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","x","x","x","x"],
    ]
    expect(gameboardTest.recieveAttack([1,2])).toBe(true)
});
test('check revieving a bomb', () => {
    // setup a board with a placed ship
    const gameboardTest = gameboard()
    gameboardTest.board = 
    [
        // [row,column] (from 0-5)
        ["x","x","x","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","S","x","x","x"],
        ["x","x","x","x","x","x"],
    ]
    expect(gameboardTest.recieveAttack([3,3])).toBe(false)
});

