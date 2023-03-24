/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((module) => {


function paintShips(){
    
}

module.exports = {paintShips}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

({ship} = __webpack_require__(/*! ./ship.js */ "./src/ship.js"));

function gameboard(){
    return {
        board: [
            // [row,column] (from 0-5)
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
            ["x","x","x","x","x","x"],
        ],
        ships: [],
        gameOver: false,
        placeShipX(startCo, length){
            // calculate the coord. of the ship
            let calcCoord = []
            for(let i=0; i<(length); i++){
                let additionalCo = [startCo[0], startCo[1]+i]
                calcCoord.push(additionalCo)
            }
            calcCoord.forEach(coordinate => {
                // problem: the array gets inserted as such: [[1,2]]
                this.board[coordinate[0]][coordinate[1]] = "S"                
            });
            // create ship
            let newShip = ship(calcCoord)
            // add new ship to ships array
            this.ships.push(newShip)
        },
        placeShipY(startCo, length){
            // calculate the coord. of the ship
            let calcCoord = []
            for(let i=0; i<(length); i++){
                let additionalCo = [startCo[0]+i, startCo[1]]
                calcCoord.push(additionalCo)
            }
            calcCoord.forEach(coordinate => {
                // problem: the array gets inserted as such: [[1,2]]
                this.board[coordinate[0]][coordinate[1]] = "S"                
            });
            // create ship
            let newShip = ship(calcCoord)
            // add new ship to ships array
            this.ships.push(newShip)
        },
        recieveAttack(attackCo){
            // a ship is hit
            if(this.board[attackCo[0]][attackCo[1]]==="S"){
                // find the correct ship object
                let hitShip;
                // go through each ship on gameboard
                this.ships.forEach((ship, shipsIndex) => {
                    // go through each coordinate of the ship
                    ship.coordinates.forEach((shipCoordinate) => {
                        // transform array into string to allow comparison
                        let coordinateString = JSON.stringify(shipCoordinate)
                        let attackCoString = JSON.stringify(attackCo)
                        // save the ship that was hit by the attack coordinates
                        if(coordinateString === attackCoString){
                            hitShip = ship
                        }
                    })
                });
                // add hit to ship
                hitShip.hit()

                if(hitShip.isSunk()){
                    hitShip.sunk = true
                }
                // mark hit on board
                this.board[attackCo[0]][attackCo[1]] = "H"
            } else if(this.board[attackCo[0]][attackCo[1]]==="x"){
                // an empty field was hit

                // mark miss on board
                this.board[attackCo[0]][attackCo[1]] = "M"
            }
            // check if all ships are sunk
            let sunkCounter=0;
            this.ships.forEach(ship => {
                if(ship.sunk){
                    sunkCounter++
                }
            })
            // check for game over
            if(sunkCounter===this.ships.length){
                this.gameOver = true
            }
            
        },
    }
}
const testBoard = gameboard()
testBoard.placeShipX([0,0], 3)



module.exports = {gameboard, testBoard}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

({gameboard} = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js"));
({ship} = __webpack_require__(/*! ./ship.js */ "./src/ship.js"));

function player(name){
    return {
        name: name,
        turn: false,
        gameboard: gameboard(),
        hitCoordinates: [],
        makeAMove(coordinates){
            // check if coordinates have already been hit
            if(!checkIfArrayContainsCoordinate(this.hitCoordinates, coordinates)){
                // send attack to board
                this.gameboard.recieveAttack(coordinates)
                // add coordinates to array of hit coordinates
                this.hitCoordinates.push(coordinates)
            }
        },
        makeARandomMove(){
            let randomX = Math.floor(6*Math.random())
            let randomY = Math.floor(6*Math.random())
            let randomCo = [randomX, randomY]
            this.makeAMove(randomCo)
        }
    } 
}

function checkIfArrayContainsCoordinate(array, coordinate){
    let isCoordinateInArray = false
    array.forEach(arrayCoordinate => {
        // transform array into string to allow comparison
        let arrayCoordinateString = JSON.stringify(arrayCoordinate)
        let coordinateString = JSON.stringify(coordinate)
        // save the ship that was hit by the attack coordinates
        if(coordinateString === arrayCoordinateString){
            isCoordinateInArray = true
        }
    })
    return isCoordinateInArray
}


module.exports = {player, checkIfArrayContainsCoordinate}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

function ship(coordinates){
    return {
        sunk: false,
        hits: 0,
        coordinates: coordinates,
        hit(){
            this.hits += 1
            return this.hits
        },
        isSunk(){
            if(this.hits===this.length()){
                return true
            }
            else{
                return false
            }
        },
        length(){
            let coordinateArray = this.coordinates
            return coordinateArray.length
        },
    }
}
const testShip = ship(3)


module.exports = {ship}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dom_js__WEBPACK_IMPORTED_MODULE_3__);







// main game loop
// preset the ships
// place human ships
human.gameboard.placeShipX([0,0],4)
human.gameboard.placeShipY([2,3],3)
human.gameboard.placeShipY([3,1],2)
// place computer ships
computer.gameboard.placeShipX([1,0],4)
computer.gameboard.placeShipX([5,3],3)
computer.gameboard.placeShipY([0,5],2)

// paint the ships onto board
;(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.paintShips)()


// display human ships on field
// add eventlistener to all computer fields
    // make a human move (on computers field)computer.makeAMove([row, column])
        // displayMoves on DOM (hits, misses)
    // make a computer move( on the human field) human.makeARandomMove()




const human = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.player)("Friedrich")
const computer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.player)("Computer")


// make human moves
human.makeAMove([1,2])
human.makeAMove([1,4])

// place computer ships
computer.gameboard.placeShipX([1,0],4)
computer.gameboard.placeShipX([5,3],3)
computer.gameboard.placeShipY([0,5],2)

// make human moves
computer.makeARandomMove()
computer.makeARandomMove()
computer.makeARandomMove()
computer.makeARandomMove()
computer.makeARandomMove()

console.log(human.gameboard.board, computer.gameboard.board)



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjs7Ozs7Ozs7OztBQ0xsQixFQUFFLE1BQU0sRUFBRSxtQkFBTyxDQUFDLGdDQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsWUFBWTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBLGtCQUFrQjs7Ozs7Ozs7OztBQ25HbEIsRUFBRSxXQUFXLEVBQUUsbUJBQU8sQ0FBQywwQ0FBZ0I7QUFDdkMsRUFBRSxNQUFNLEVBQUUsbUJBQU8sQ0FBQyxnQ0FBVzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBLGtCQUFrQjs7Ozs7Ozs7OztBQzFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQSxrQkFBa0I7Ozs7Ozs7VUMxQmxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQztBQUNpQjtBQUNyQjtBQUNLOzs7O0FBSW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQVU7OztBQUdWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0EsY0FBYyxrREFBTTtBQUNwQixpQkFBaUIsa0RBQU07OztBQUd2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmZ1bmN0aW9uIHBhaW50U2hpcHMoKXtcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7cGFpbnRTaGlwc30iLCIoe3NoaXB9ID0gcmVxdWlyZShcIi4vc2hpcC5qc1wiKSk7XG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGJvYXJkOiBbXG4gICAgICAgICAgICAvLyBbcm93LGNvbHVtbl0gKGZyb20gMC01KVxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICBdLFxuICAgICAgICBzaGlwczogW10sXG4gICAgICAgIGdhbWVPdmVyOiBmYWxzZSxcbiAgICAgICAgcGxhY2VTaGlwWChzdGFydENvLCBsZW5ndGgpe1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBjb29yZC4gb2YgdGhlIHNoaXBcbiAgICAgICAgICAgIGxldCBjYWxjQ29vcmQgPSBbXVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8KGxlbmd0aCk7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxDbyA9IFtzdGFydENvWzBdLCBzdGFydENvWzFdK2ldXG4gICAgICAgICAgICAgICAgY2FsY0Nvb3JkLnB1c2goYWRkaXRpb25hbENvKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsY0Nvb3JkLmZvckVhY2goY29vcmRpbmF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcHJvYmxlbTogdGhlIGFycmF5IGdldHMgaW5zZXJ0ZWQgYXMgc3VjaDogW1sxLDJdXVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZVswXV1bY29vcmRpbmF0ZVsxXV0gPSBcIlNcIiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNoaXBcbiAgICAgICAgICAgIGxldCBuZXdTaGlwID0gc2hpcChjYWxjQ29vcmQpXG4gICAgICAgICAgICAvLyBhZGQgbmV3IHNoaXAgdG8gc2hpcHMgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXdTaGlwKVxuICAgICAgICB9LFxuICAgICAgICBwbGFjZVNoaXBZKHN0YXJ0Q28sIGxlbmd0aCl7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNvb3JkLiBvZiB0aGUgc2hpcFxuICAgICAgICAgICAgbGV0IGNhbGNDb29yZCA9IFtdXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwobGVuZ3RoKTsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25hbENvID0gW3N0YXJ0Q29bMF0raSwgc3RhcnRDb1sxXV1cbiAgICAgICAgICAgICAgICBjYWxjQ29vcmQucHVzaChhZGRpdGlvbmFsQ28pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxjQ29vcmQuZm9yRWFjaChjb29yZGluYXRlID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwcm9ibGVtOiB0aGUgYXJyYXkgZ2V0cyBpbnNlcnRlZCBhcyBzdWNoOiBbWzEsMl1dXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtjb29yZGluYXRlWzBdXVtjb29yZGluYXRlWzFdXSA9IFwiU1wiICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2hpcFxuICAgICAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwKGNhbGNDb29yZClcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgc2hpcCB0byBzaGlwcyBhcnJheVxuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2lldmVBdHRhY2soYXR0YWNrQ28pe1xuICAgICAgICAgICAgLy8gYSBzaGlwIGlzIGhpdFxuICAgICAgICAgICAgaWYodGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dPT09XCJTXCIpe1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlIGNvcnJlY3Qgc2hpcCBvYmplY3RcbiAgICAgICAgICAgICAgICBsZXQgaGl0U2hpcDtcbiAgICAgICAgICAgICAgICAvLyBnbyB0aHJvdWdoIGVhY2ggc2hpcCBvbiBnYW1lYm9hcmRcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXAsIHNoaXBzSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGNvb3JkaW5hdGUgb2YgdGhlIHNoaXBcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5jb29yZGluYXRlcy5mb3JFYWNoKChzaGlwQ29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIGFycmF5IGludG8gc3RyaW5nIHRvIGFsbG93IGNvbXBhcmlzb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb29yZGluYXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoc2hpcENvb3JkaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0YWNrQ29TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhdHRhY2tDbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIHNoaXAgdGhhdCB3YXMgaGl0IGJ5IHRoZSBhdHRhY2sgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvb3JkaW5hdGVTdHJpbmcgPT09IGF0dGFja0NvU3RyaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRTaGlwID0gc2hpcFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBoaXQgdG8gc2hpcFxuICAgICAgICAgICAgICAgIGhpdFNoaXAuaGl0KClcblxuICAgICAgICAgICAgICAgIGlmKGhpdFNoaXAuaXNTdW5rKCkpe1xuICAgICAgICAgICAgICAgICAgICBoaXRTaGlwLnN1bmsgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIG1hcmsgaGl0IG9uIGJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dID0gXCJIXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmJvYXJkW2F0dGFja0NvWzBdXVthdHRhY2tDb1sxXV09PT1cInhcIil7XG4gICAgICAgICAgICAgICAgLy8gYW4gZW1wdHkgZmllbGQgd2FzIGhpdFxuXG4gICAgICAgICAgICAgICAgLy8gbWFyayBtaXNzIG9uIGJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dID0gXCJNXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuICAgICAgICAgICAgbGV0IHN1bmtDb3VudGVyPTA7XG4gICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICAgICAgaWYoc2hpcC5zdW5rKXtcbiAgICAgICAgICAgICAgICAgICAgc3Vua0NvdW50ZXIrK1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgZ2FtZSBvdmVyXG4gICAgICAgICAgICBpZihzdW5rQ291bnRlcj09PXRoaXMuc2hpcHMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgfVxufVxuY29uc3QgdGVzdEJvYXJkID0gZ2FtZWJvYXJkKClcbnRlc3RCb2FyZC5wbGFjZVNoaXBYKFswLDBdLCAzKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7Z2FtZWJvYXJkLCB0ZXN0Qm9hcmR9IiwiKHtnYW1lYm9hcmR9ID0gcmVxdWlyZShcIi4vZ2FtZWJvYXJkLmpzXCIpKTtcbih7c2hpcH0gPSByZXF1aXJlKFwiLi9zaGlwLmpzXCIpKTtcblxuZnVuY3Rpb24gcGxheWVyKG5hbWUpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHR1cm46IGZhbHNlLFxuICAgICAgICBnYW1lYm9hcmQ6IGdhbWVib2FyZCgpLFxuICAgICAgICBoaXRDb29yZGluYXRlczogW10sXG4gICAgICAgIG1ha2VBTW92ZShjb29yZGluYXRlcyl7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBjb29yZGluYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBoaXRcbiAgICAgICAgICAgIGlmKCFjaGVja0lmQXJyYXlDb250YWluc0Nvb3JkaW5hdGUodGhpcy5oaXRDb29yZGluYXRlcywgY29vcmRpbmF0ZXMpKXtcbiAgICAgICAgICAgICAgICAvLyBzZW5kIGF0dGFjayB0byBib2FyZFxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZWJvYXJkLnJlY2lldmVBdHRhY2soY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICAgICAgLy8gYWRkIGNvb3JkaW5hdGVzIHRvIGFycmF5IG9mIGhpdCBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaGl0Q29vcmRpbmF0ZXMucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFrZUFSYW5kb21Nb3ZlKCl7XG4gICAgICAgICAgICBsZXQgcmFuZG9tWCA9IE1hdGguZmxvb3IoNipNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgICAgbGV0IHJhbmRvbVkgPSBNYXRoLmZsb29yKDYqTWF0aC5yYW5kb20oKSlcbiAgICAgICAgICAgIGxldCByYW5kb21DbyA9IFtyYW5kb21YLCByYW5kb21ZXVxuICAgICAgICAgICAgdGhpcy5tYWtlQU1vdmUocmFuZG9tQ28pXG4gICAgICAgIH1cbiAgICB9IFxufVxuXG5mdW5jdGlvbiBjaGVja0lmQXJyYXlDb250YWluc0Nvb3JkaW5hdGUoYXJyYXksIGNvb3JkaW5hdGUpe1xuICAgIGxldCBpc0Nvb3JkaW5hdGVJbkFycmF5ID0gZmFsc2VcbiAgICBhcnJheS5mb3JFYWNoKGFycmF5Q29vcmRpbmF0ZSA9PiB7XG4gICAgICAgIC8vIHRyYW5zZm9ybSBhcnJheSBpbnRvIHN0cmluZyB0byBhbGxvdyBjb21wYXJpc29uXG4gICAgICAgIGxldCBhcnJheUNvb3JkaW5hdGVTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhcnJheUNvb3JkaW5hdGUpXG4gICAgICAgIGxldCBjb29yZGluYXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZSlcbiAgICAgICAgLy8gc2F2ZSB0aGUgc2hpcCB0aGF0IHdhcyBoaXQgYnkgdGhlIGF0dGFjayBjb29yZGluYXRlc1xuICAgICAgICBpZihjb29yZGluYXRlU3RyaW5nID09PSBhcnJheUNvb3JkaW5hdGVTdHJpbmcpe1xuICAgICAgICAgICAgaXNDb29yZGluYXRlSW5BcnJheSA9IHRydWVcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzQ29vcmRpbmF0ZUluQXJyYXlcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtwbGF5ZXIsIGNoZWNrSWZBcnJheUNvbnRhaW5zQ29vcmRpbmF0ZX0iLCJmdW5jdGlvbiBzaGlwKGNvb3JkaW5hdGVzKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdW5rOiBmYWxzZSxcbiAgICAgICAgaGl0czogMCxcbiAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgICAgICBoaXQoKXtcbiAgICAgICAgICAgIHRoaXMuaGl0cyArPSAxXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oaXRzXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3Vuaygpe1xuICAgICAgICAgICAgaWYodGhpcy5oaXRzPT09dGhpcy5sZW5ndGgoKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxlbmd0aCgpe1xuICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGVBcnJheSA9IHRoaXMuY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIHJldHVybiBjb29yZGluYXRlQXJyYXkubGVuZ3RoXG4gICAgICAgIH0sXG4gICAgfVxufVxuY29uc3QgdGVzdFNoaXAgPSBzaGlwKDMpXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7c2hpcH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3BsYXllcn0gZnJvbSBcIi4vcGxheWVyLmpzXCJcbmltcG9ydCB7Z2FtZWJvYXJkLCB0ZXN0Qm9hcmR9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiXG5pbXBvcnQge3NoaXB9IGZyb20gXCIuL3NoaXAuanNcIlxuaW1wb3J0IHtwYWludFNoaXBzfSBmcm9tIFwiLi9kb20uanNcIlxuXG5cblxuLy8gbWFpbiBnYW1lIGxvb3Bcbi8vIHByZXNldCB0aGUgc2hpcHNcbi8vIHBsYWNlIGh1bWFuIHNoaXBzXG5odW1hbi5nYW1lYm9hcmQucGxhY2VTaGlwWChbMCwwXSw0KVxuaHVtYW4uZ2FtZWJvYXJkLnBsYWNlU2hpcFkoWzIsM10sMylcbmh1bWFuLmdhbWVib2FyZC5wbGFjZVNoaXBZKFszLDFdLDIpXG4vLyBwbGFjZSBjb21wdXRlciBzaGlwc1xuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcFgoWzEsMF0sNClcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBYKFs1LDNdLDMpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwWShbMCw1XSwyKVxuXG4vLyBwYWludCB0aGUgc2hpcHMgb250byBib2FyZFxucGFpbnRTaGlwcygpXG5cblxuLy8gZGlzcGxheSBodW1hbiBzaGlwcyBvbiBmaWVsZFxuLy8gYWRkIGV2ZW50bGlzdGVuZXIgdG8gYWxsIGNvbXB1dGVyIGZpZWxkc1xuICAgIC8vIG1ha2UgYSBodW1hbiBtb3ZlIChvbiBjb21wdXRlcnMgZmllbGQpY29tcHV0ZXIubWFrZUFNb3ZlKFtyb3csIGNvbHVtbl0pXG4gICAgICAgIC8vIGRpc3BsYXlNb3ZlcyBvbiBET00gKGhpdHMsIG1pc3NlcylcbiAgICAvLyBtYWtlIGEgY29tcHV0ZXIgbW92ZSggb24gdGhlIGh1bWFuIGZpZWxkKSBodW1hbi5tYWtlQVJhbmRvbU1vdmUoKVxuXG5cblxuXG5jb25zdCBodW1hbiA9IHBsYXllcihcIkZyaWVkcmljaFwiKVxuY29uc3QgY29tcHV0ZXIgPSBwbGF5ZXIoXCJDb21wdXRlclwiKVxuXG5cbi8vIG1ha2UgaHVtYW4gbW92ZXNcbmh1bWFuLm1ha2VBTW92ZShbMSwyXSlcbmh1bWFuLm1ha2VBTW92ZShbMSw0XSlcblxuLy8gcGxhY2UgY29tcHV0ZXIgc2hpcHNcbmNvbXB1dGVyLmdhbWVib2FyZC5wbGFjZVNoaXBYKFsxLDBdLDQpXG5jb21wdXRlci5nYW1lYm9hcmQucGxhY2VTaGlwWChbNSwzXSwzKVxuY29tcHV0ZXIuZ2FtZWJvYXJkLnBsYWNlU2hpcFkoWzAsNV0sMilcblxuLy8gbWFrZSBodW1hbiBtb3Zlc1xuY29tcHV0ZXIubWFrZUFSYW5kb21Nb3ZlKClcbmNvbXB1dGVyLm1ha2VBUmFuZG9tTW92ZSgpXG5jb21wdXRlci5tYWtlQVJhbmRvbU1vdmUoKVxuY29tcHV0ZXIubWFrZUFSYW5kb21Nb3ZlKClcbmNvbXB1dGVyLm1ha2VBUmFuZG9tTW92ZSgpXG5cbmNvbnNvbGUubG9nKGh1bWFuLmdhbWVib2FyZC5ib2FyZCwgY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==