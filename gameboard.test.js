({ship, gameboard} = require("./script.js"))



test('test placing a ship onto the board', () => {
    const shipCoords = [[1,2],[1,3],[1,4]]
    const gameboardTest = gameboard()
    gameboardTest.placeShip(shipCoords)

expect(gameboardTest.ships).toStrictEqual([123])
});


