({ship, gameboard} = require("./script.js"))



test('test placing a ship onto the board', () => {
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
expect(gameboardTest.ships[0]).toStrictEqual("masdf"
)



});


