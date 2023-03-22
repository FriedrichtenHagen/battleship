({gameboard} = require("/home/friedrichtenhagen/battleship/src/gameboard.js"));
({player} = require("/home/friedrichtenhagen/battleship/src/player.js"));

test('check the hit counter array', () => {
    const testPlayer = player("Friedrich")
    const startCoords = [1,2]
    testPlayer.makeAMove(startCoords)


    expect(testPlayer.hitCoordinates).toStrictEqual([[1,2]])
});

test('check if making the same move several times is possible', () => {
    const testPlayer = player("Friedrich")
    const startCoords = [1,2]
    testPlayer.makeAMove(startCoords)
    testPlayer.makeAMove(startCoords)
    testPlayer.makeAMove(startCoords)
    testPlayer.makeAMove(startCoords)

    expect(testPlayer.hitCoordinates).toStrictEqual([[1,2]])
});
test('check if move shows up on board', () => {
    const testPlayer = player("Friedrich")
    const startCoords = [1,2]
    testPlayer.makeAMove(startCoords)


    expect(testPlayer.board.board).toStrictEqual([
        ["x","x","x","x","x","x"],
        ["x","x","M","x","x","x"],
        ["x","x","x","x","x","x"],
        ["x","x","x","x","x","x"],
        ["x","x","x","x","x","x"],
        ["x","x","x","x","x","x"],
    ])
});


