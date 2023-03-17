({ship, gameboard} = require("./script.js"))

test('test gameboard coordinates', () => {
    const coord = [1,2,3,4,5,6,7,8]
    const gameboardTest = gameboard()
    expect(gameboardTest.boardCoordinatesX).toStrictEqual(coord)
    expect(gameboardTest.boardCoordinatesY).toStrictEqual(coord)
  });


  