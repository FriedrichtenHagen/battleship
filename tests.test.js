

({ship, sum} = require("./script.js"))
// import {ship} from "./script.js"

test('test ship length', () => {
    expect(ship([[1,2],[1,3]]).length).toBe(2);
  });
  test('test ship sunk status', () => {
    expect(ship([[1,2],[1,3]]).sunk).toBe(false);
  });
  test('hit method', () => {
    expect(ship([[1,2],[1,3]]).hit()).toBe(1);
  });
  test('sunk method', () => {
    expect(ship([]).isSunk()).toBe(true);
  });



