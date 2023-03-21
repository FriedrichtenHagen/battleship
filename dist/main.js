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

                // mark hit on board
                this.board[attackCo[0]][attackCo[1]] = "H"
            } else if(this.board[attackCo[0]][attackCo[1]]==="x"){
                // an empty field was hit

                // mark miss on board
                this.board[attackCo[0]][attackCo[1]] = "M"
            }
            // check if all ships are sunk


            
        },
    }
}
const testBoard = gameboard()
testBoard.placeShipX([0,0], 3)
console.log("gamebaordd")


module.exports = {gameboard, testBoard}

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

console.log("shippp")

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
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_1__);




// test

console.log(_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboard)


const testtttt = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboard)()
window.testtttt = testtttt
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxFQUFFLE1BQU0sRUFBRSxtQkFBTyxDQUFDLGdDQUFXOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsWUFBWTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFlBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLGtCQUFrQjs7Ozs7Ozs7OztBQ3ZGbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQjs7Ozs7OztVQzNCbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNObUQ7QUFDdkI7OztBQUc1Qjs7QUFFQSxZQUFZLG9EQUFTOzs7QUFHckIsaUJBQWlCLHdEQUFTO0FBQzFCLDBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIih7c2hpcH0gPSByZXF1aXJlKFwiLi9zaGlwLmpzXCIpKTtcblxuZnVuY3Rpb24gZ2FtZWJvYXJkKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYm9hcmQ6IFtcbiAgICAgICAgICAgIC8vIFtyb3csY29sdW1uXSAoZnJvbSAwLTUpXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgICAgICBbXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCIsXCJ4XCJdLFxuICAgICAgICAgICAgW1wieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiLFwieFwiXSxcbiAgICAgICAgICAgIFtcInhcIixcInhcIixcInhcIixcInhcIixcInhcIixcInhcIl0sXG4gICAgICAgIF0sXG4gICAgICAgIHNoaXBzOiBbXSxcbiAgICAgICAgcGxhY2VTaGlwWChzdGFydENvLCBsZW5ndGgpe1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBjb29yZC4gb2YgdGhlIHNoaXBcbiAgICAgICAgICAgIGxldCBjYWxjQ29vcmQgPSBbXVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8KGxlbmd0aCk7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxDbyA9IFtzdGFydENvWzBdLCBzdGFydENvWzFdK2ldXG4gICAgICAgICAgICAgICAgY2FsY0Nvb3JkLnB1c2goYWRkaXRpb25hbENvKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsY0Nvb3JkLmZvckVhY2goY29vcmRpbmF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcHJvYmxlbTogdGhlIGFycmF5IGdldHMgaW5zZXJ0ZWQgYXMgc3VjaDogW1sxLDJdXVxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbY29vcmRpbmF0ZVswXV1bY29vcmRpbmF0ZVsxXV0gPSBcIlNcIiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gY3JlYXRlIHNoaXBcbiAgICAgICAgICAgIGxldCBuZXdTaGlwID0gc2hpcChjYWxjQ29vcmQpXG4gICAgICAgICAgICAvLyBhZGQgbmV3IHNoaXAgdG8gc2hpcHMgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuc2hpcHMucHVzaChuZXdTaGlwKVxuICAgICAgICB9LFxuICAgICAgICBwbGFjZVNoaXBZKHN0YXJ0Q28sIGxlbmd0aCl7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIGNvb3JkLiBvZiB0aGUgc2hpcFxuICAgICAgICAgICAgbGV0IGNhbGNDb29yZCA9IFtdXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwobGVuZ3RoKTsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25hbENvID0gW3N0YXJ0Q29bMF0raSwgc3RhcnRDb1sxXV1cbiAgICAgICAgICAgICAgICBjYWxjQ29vcmQucHVzaChhZGRpdGlvbmFsQ28pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxjQ29vcmQuZm9yRWFjaChjb29yZGluYXRlID0+IHtcbiAgICAgICAgICAgICAgICAvLyBwcm9ibGVtOiB0aGUgYXJyYXkgZ2V0cyBpbnNlcnRlZCBhcyBzdWNoOiBbWzEsMl1dXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtjb29yZGluYXRlWzBdXVtjb29yZGluYXRlWzFdXSA9IFwiU1wiICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgc2hpcFxuICAgICAgICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwKGNhbGNDb29yZClcbiAgICAgICAgICAgIC8vIGFkZCBuZXcgc2hpcCB0byBzaGlwcyBhcnJheVxuICAgICAgICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2lldmVBdHRhY2soYXR0YWNrQ28pe1xuICAgICAgICAgICAgLy8gYSBzaGlwIGlzIGhpdFxuICAgICAgICAgICAgaWYodGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dPT09XCJTXCIpe1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgdGhlIGNvcnJlY3Qgc2hpcCBvYmplY3RcbiAgICAgICAgICAgICAgICBsZXQgaGl0U2hpcDtcbiAgICAgICAgICAgICAgICAvLyBnbyB0aHJvdWdoIGVhY2ggc2hpcCBvbiBnYW1lYm9hcmRcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXAsIHNoaXBzSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ28gdGhyb3VnaCBlYWNoIGNvb3JkaW5hdGUgb2YgdGhlIHNoaXBcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5jb29yZGluYXRlcy5mb3JFYWNoKChzaGlwQ29vcmRpbmF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3JtIGFycmF5IGludG8gc3RyaW5nIHRvIGFsbG93IGNvbXBhcmlzb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb29yZGluYXRlU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoc2hpcENvb3JkaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXR0YWNrQ29TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShhdHRhY2tDbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgdGhlIHNoaXAgdGhhdCB3YXMgaGl0IGJ5IHRoZSBhdHRhY2sgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvb3JkaW5hdGVTdHJpbmcgPT09IGF0dGFja0NvU3RyaW5nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRTaGlwID0gc2hpcFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBoaXQgdG8gc2hpcFxuICAgICAgICAgICAgICAgIGhpdFNoaXAuaGl0KClcblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgaGl0IG9uIGJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dID0gXCJIXCJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmJvYXJkW2F0dGFja0NvWzBdXVthdHRhY2tDb1sxXV09PT1cInhcIil7XG4gICAgICAgICAgICAgICAgLy8gYW4gZW1wdHkgZmllbGQgd2FzIGhpdFxuXG4gICAgICAgICAgICAgICAgLy8gbWFyayBtaXNzIG9uIGJvYXJkXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFthdHRhY2tDb1swXV1bYXR0YWNrQ29bMV1dID0gXCJNXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuXG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgIH1cbn1cbmNvbnN0IHRlc3RCb2FyZCA9IGdhbWVib2FyZCgpXG50ZXN0Qm9hcmQucGxhY2VTaGlwWChbMCwwXSwgMylcbmNvbnNvbGUubG9nKFwiZ2FtZWJhb3JkZFwiKVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge2dhbWVib2FyZCwgdGVzdEJvYXJkfSIsImZ1bmN0aW9uIHNoaXAoY29vcmRpbmF0ZXMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHN1bms6IGZhbHNlLFxuICAgICAgICBoaXRzOiAwLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgICAgIGhpdCgpe1xuICAgICAgICAgICAgdGhpcy5oaXRzICs9IDFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpdHNcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rKCl7XG4gICAgICAgICAgICBpZih0aGlzLmhpdHM9PT10aGlzLmxlbmd0aCgpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbGVuZ3RoKCl7XG4gICAgICAgICAgICBsZXQgY29vcmRpbmF0ZUFycmF5ID0gdGhpcy5jb29yZGluYXRlc1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVBcnJheS5sZW5ndGhcbiAgICAgICAgfSxcbiAgICB9XG59XG5jb25zdCB0ZXN0U2hpcCA9IHNoaXAoMylcblxuY29uc29sZS5sb2coXCJzaGlwcHBcIilcblxubW9kdWxlLmV4cG9ydHMgPSB7c2hpcH1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2dhbWVib2FyZCwgdGVzdEJvYXJkfSBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIlxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiXG5cblxuLy8gdGVzdFxuXG5jb25zb2xlLmxvZyhnYW1lYm9hcmQpXG5cblxuY29uc3QgdGVzdHR0dHQgPSBnYW1lYm9hcmQoKVxud2luZG93LnRlc3R0dHR0ID0gdGVzdHR0dHQiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=