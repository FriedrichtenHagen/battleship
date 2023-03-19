({ship} = require("./ship.js"))
// import {ship} from "./script.js"

test('test ship length', () => {
  const battleship = ship([[1,2],[1,3]])
  expect(battleship.length()).toBe(2);
});

test('test ship sunk status', () => {
  expect(ship([[1,2],[1,3]]).sunk).toBe(false);
});

test('hit method', () => {
  expect(ship([[1,2],[1,3]]).hit()).toBe(1);
});

test('sunk method', () => {
  const battleship = ship([[1,2],[1,3],[1,4]])
  battleship.hit()
  battleship.hit()
  battleship.hit()
  expect(battleship.isSunk()).toBe(true);
});



