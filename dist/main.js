/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
                return "game over"
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


function player(name){
    return {
        name: name,
        turn: false,
        board: gameboard(),
        hitCoordinates: [],
        makeAMove(coordinates){
            // check if coordinates have already been hit
            if(!checkIfArrayContainsCoordinate(this.hitCoordinates, coordinates)){
                // send attack to board
                this.board.recieveAttack(coordinates)
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






// main game loop






const testtttt = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__.gameboard)()
window.testtttt = testtttt
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxFQUFFLE1BQU0sRUFBRSxtQkFBTyxDQUFDLGdDQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsWUFBWTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFlBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQSxrQkFBa0I7Ozs7Ozs7Ozs7QUNsR2xCLEVBQUUsV0FBVyxFQUFFLG1CQUFPLENBQUMsMENBQWdCOzs7QUFHdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7OztBQUdBLGtCQUFrQjs7Ozs7Ozs7OztBQzFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQSxrQkFBa0I7Ozs7Ozs7VUMxQmxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOZ0M7QUFDbUI7QUFDdkI7Ozs7QUFJNUI7Ozs7Ozs7QUFPQSxpQkFBaUIsd0RBQVM7QUFDMUIsMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoe3NoaXB9ID0gcmVxdWlyZShcIi4vc2hpcC5qc1wiKSk7XG5cbmZ1bmN0aW9uIGdhbWVib2FyZCgpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGJvYXJkOiBbXG4gICAgICAgICAgICAvLyBbcm93LGNvbHVtbl0gKGZyb20gMC01KVxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICBdLFxuICAgICAgICBzaGlwczogW10sXG4gICAgICAgIHBsYWNlU2hpcFgoc3RhcnRDbywgbGVuZ3RoKXtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgY29vcmQuIG9mIHRoZSBzaGlwXG4gICAgICAgICAgICBsZXQgY2FsY0Nvb3JkID0gW11cbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPChsZW5ndGgpOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsQ28gPSBbc3RhcnRDb1swXSwgc3RhcnRDb1sxXStpXVxuICAgICAgICAgICAgICAgIGNhbGNDb29yZC5wdXNoKGFkZGl0aW9uYWxDbylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGNDb29yZC5mb3JFYWNoKGNvb3JkaW5hdGUgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHByb2JsZW06IHRoZSBhcnJheSBnZXRzIGluc2VydGVkIGFzIHN1Y2g6IFtbMSwyXV1cbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2Nvb3JkaW5hdGVbMF1dW2Nvb3JkaW5hdGVbMV1dID0gXCJTXCIgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzaGlwXG4gICAgICAgICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoY2FsY0Nvb3JkKVxuICAgICAgICAgICAgLy8gYWRkIG5ldyBzaGlwIHRvIHNoaXBzIGFycmF5XG4gICAgICAgICAgICB0aGlzLnNoaXBzLnB1c2gobmV3U2hpcClcbiAgICAgICAgfSxcbiAgICAgICAgcGxhY2VTaGlwWShzdGFydENvLCBsZW5ndGgpe1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBjb29yZC4gb2YgdGhlIHNoaXBcbiAgICAgICAgICAgIGxldCBjYWxjQ29vcmQgPSBbXVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8KGxlbmd0aCk7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxDbyA9IFtzdGFydENvWzBdK2ksIHN0YXJ0Q29bMV1dXG4gICAgICAgICAgICAgICAgY2FsY0Nvb3JkLnB1c2goYWRkaXRpb25hbENvKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsY0Nvb3JkLmZvckVhY2goY29vcmRpbmF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcHJvYmxlbTogdGhlIGFycmF5IGdldHMgaW5zZXJ0ZWQgYXMgc3VjaDogW1sxLDJdXVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZVswXV1bY29vcmRpbmF0ZVsxXV0gPSBcIlNcIiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNoaXBcbiAgICAgICAgICAgIGxldCBuZXdTaGlwID0gc2hpcChjYWxjQ29vcmQpXG4gICAgICAgICAgICAvLyBhZGQgbmV3IHNoaXAgdG8gc2hpcHMgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXdTaGlwKVxuICAgICAgICB9LFxuICAgICAgICByZWNpZXZlQXR0YWNrKGF0dGFja0NvKXtcbiAgICAgICAgICAgIC8vIGEgc2hpcCBpcyBoaXRcbiAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbYXR0YWNrQ29bMF1dW2F0dGFja0NvWzFdXT09PVwiU1wiKXtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHNoaXAgb2JqZWN0XG4gICAgICAgICAgICAgICAgbGV0IGhpdFNoaXA7XG4gICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIHNoaXAgb24gZ2FtZWJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwLCBzaGlwc0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdvIHRocm91Z2ggZWFjaCBjb29yZGluYXRlIG9mIHRoZSBzaGlwXG4gICAgICAgICAgICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZXMuZm9yRWFjaCgoc2hpcENvb3JkaW5hdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBhcnJheSBpbnRvIHN0cmluZyB0byBhbGxvdyBjb21wYXJpc29uXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHNoaXBDb29yZGluYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFja0NvU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXR0YWNrQ28pXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIHRoZSBzaGlwIHRoYXQgd2FzIGhpdCBieSB0aGUgYXR0YWNrIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb29yZGluYXRlU3RyaW5nID09PSBhdHRhY2tDb1N0cmluZyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0U2hpcCA9IHNoaXBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgaGl0IHRvIHNoaXBcbiAgICAgICAgICAgICAgICBoaXRTaGlwLmhpdCgpXG5cbiAgICAgICAgICAgICAgICBpZihoaXRTaGlwLmlzU3VuaygpKXtcbiAgICAgICAgICAgICAgICAgICAgaGl0U2hpcC5zdW5rID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBtYXJrIGhpdCBvbiBib2FyZFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29bMF1dW2F0dGFja0NvWzFdXSA9IFwiSFwiXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dPT09XCJ4XCIpe1xuICAgICAgICAgICAgICAgIC8vIGFuIGVtcHR5IGZpZWxkIHdhcyBoaXRcblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgbWlzcyBvbiBib2FyZFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbYXR0YWNrQ29bMF1dW2F0dGFja0NvWzFdXSA9IFwiTVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcbiAgICAgICAgICAgIGxldCBzdW5rQ291bnRlcj0wO1xuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHNoaXAuc3Vuayl7XG4gICAgICAgICAgICAgICAgICAgIHN1bmtDb3VudGVyKytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGdhbWUgb3ZlclxuICAgICAgICAgICAgaWYoc3Vua0NvdW50ZXI9PT10aGlzLnNoaXBzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZ2FtZSBvdmVyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgIH1cbn1cbmNvbnN0IHRlc3RCb2FyZCA9IGdhbWVib2FyZCgpXG50ZXN0Qm9hcmQucGxhY2VTaGlwWChbMCwwXSwgMylcblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge2dhbWVib2FyZCwgdGVzdEJvYXJkfSIsIih7Z2FtZWJvYXJkfSA9IHJlcXVpcmUoXCIuL2dhbWVib2FyZC5qc1wiKSk7XG5cblxuZnVuY3Rpb24gcGxheWVyKG5hbWUpe1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHR1cm46IGZhbHNlLFxuICAgICAgICBib2FyZDogZ2FtZWJvYXJkKCksXG4gICAgICAgIGhpdENvb3JkaW5hdGVzOiBbXSxcbiAgICAgICAgbWFrZUFNb3ZlKGNvb3JkaW5hdGVzKXtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGNvb3JkaW5hdGVzIGhhdmUgYWxyZWFkeSBiZWVuIGhpdFxuICAgICAgICAgICAgaWYoIWNoZWNrSWZBcnJheUNvbnRhaW5zQ29vcmRpbmF0ZSh0aGlzLmhpdENvb3JkaW5hdGVzLCBjb29yZGluYXRlcykpe1xuICAgICAgICAgICAgICAgIC8vIHNlbmQgYXR0YWNrIHRvIGJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5yZWNpZXZlQXR0YWNrKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgIC8vIGFkZCBjb29yZGluYXRlcyB0byBhcnJheSBvZiBoaXQgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICB0aGlzLmhpdENvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ha2VBUmFuZG9tTW92ZSgpe1xuICAgICAgICAgICAgbGV0IHJhbmRvbVggPSBNYXRoLmZsb29yKDYqTWF0aC5yYW5kb20oKSlcbiAgICAgICAgICAgIGxldCByYW5kb21ZID0gTWF0aC5mbG9vcig2Kk1hdGgucmFuZG9tKCkpXG4gICAgICAgICAgICBsZXQgcmFuZG9tQ28gPSBbcmFuZG9tWCwgcmFuZG9tWV1cbiAgICAgICAgICAgIHRoaXMubWFrZUFNb3ZlKHJhbmRvbUNvKVxuICAgICAgICB9XG4gICAgfSBcbn1cblxuZnVuY3Rpb24gY2hlY2tJZkFycmF5Q29udGFpbnNDb29yZGluYXRlKGFycmF5LCBjb29yZGluYXRlKXtcbiAgICBsZXQgaXNDb29yZGluYXRlSW5BcnJheSA9IGZhbHNlXG4gICAgYXJyYXkuZm9yRWFjaChhcnJheUNvb3JkaW5hdGUgPT4ge1xuICAgICAgICAvLyB0cmFuc2Zvcm0gYXJyYXkgaW50byBzdHJpbmcgdG8gYWxsb3cgY29tcGFyaXNvblxuICAgICAgICBsZXQgYXJyYXlDb29yZGluYXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoYXJyYXlDb29yZGluYXRlKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZVN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGUpXG4gICAgICAgIC8vIHNhdmUgdGhlIHNoaXAgdGhhdCB3YXMgaGl0IGJ5IHRoZSBhdHRhY2sgY29vcmRpbmF0ZXNcbiAgICAgICAgaWYoY29vcmRpbmF0ZVN0cmluZyA9PT0gYXJyYXlDb29yZGluYXRlU3RyaW5nKXtcbiAgICAgICAgICAgIGlzQ29vcmRpbmF0ZUluQXJyYXkgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc0Nvb3JkaW5hdGVJbkFycmF5XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7cGxheWVyLCBjaGVja0lmQXJyYXlDb250YWluc0Nvb3JkaW5hdGV9IiwiZnVuY3Rpb24gc2hpcChjb29yZGluYXRlcyl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3VuazogZmFsc2UsXG4gICAgICAgIGhpdHM6IDAsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICAgICAgaGl0KCl7XG4gICAgICAgICAgICB0aGlzLmhpdHMgKz0gMVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGl0c1xuICAgICAgICB9LFxuICAgICAgICBpc1N1bmsoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaGl0cz09PXRoaXMubGVuZ3RoKCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsZW5ndGgoKXtcbiAgICAgICAgICAgIGxldCBjb29yZGluYXRlQXJyYXkgPSB0aGlzLmNvb3JkaW5hdGVzXG4gICAgICAgICAgICByZXR1cm4gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aFxuICAgICAgICB9LFxuICAgIH1cbn1cbmNvbnN0IHRlc3RTaGlwID0gc2hpcCgzKVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge3NoaXB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIlxuaW1wb3J0IHtnYW1lYm9hcmQsIHRlc3RCb2FyZH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIlxuXG5cblxuLy8gbWFpbiBnYW1lIGxvb3BcblxuXG5cblxuXG5cbmNvbnN0IHRlc3R0dHR0ID0gZ2FtZWJvYXJkKClcbndpbmRvdy50ZXN0dHR0dCA9IHRlc3R0dHR0Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9