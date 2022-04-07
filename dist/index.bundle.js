/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Ball.ts":
/*!*********************!*\
  !*** ./src/Ball.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ball\": () => (/* binding */ Ball)\n/* harmony export */ });\n/**\n * Class of a ball on the board\n */\nclass Ball {\n    /** Static array containing possible colors of balls */\n    static colors = [\n        \"#f00\",\n        \"#0f0\",\n        \"#00f\",\n        \"#ff0\",\n        \"#0ff\",\n        \"#f0f\",\n        \"#000\"\n    ];\n    /** Coords of the ball */\n    coords;\n    /** Color of the ball */\n    color;\n    /** If ball is selected */\n    selected;\n    /**\n     * Constructs new Ball object\n     * @param coords Coords of the ball\n     * @param color Color of the ball\n     */\n    constructor(coords, color) {\n        this.coords = coords;\n        this.color = color;\n    }\n    /**\n     * Returns ball coords\n     * @returns Coords of the ball\n     */\n    getCoords() {\n        return this.coords;\n    }\n    /**\n     * Returns ball color\n     * @returns Color of the ball\n     */\n    getColor() {\n        return this.color;\n    }\n    /**\n     * Returns if the ball is selected\n     * @returns Boolean determining if the ball is selected\n     */\n    isSelected() {\n        return this.selected;\n    }\n    /**\n     * Changes the value of property selected\n     * @param val Sets the value to the param if given, inverses it if not\n     */\n    changeSelected(val) {\n        this.selected = val === undefined ? !this.selected : val;\n    }\n    /**\n     * Moves the ball to given coords\n     * @param coords Coords to move the ball to\n     */\n    moveTo(coords) {\n        this.coords = coords;\n    }\n}\n\n\n\n//# sourceURL=webpack://balls/./src/Ball.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.ts\");\n/* harmony import */ var _other__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./other */ \"./src/other.ts\");\n/* harmony import */ var _findPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./findPath */ \"./src/findPath.ts\");\n/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators */ \"./src/decorators.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\n/** Class of a game */\nclass Game {\n    /** Array of every ball present in the game */\n    balls;\n    /** Array of colors of the next 3 balls to be added */\n    next;\n    /** Determines if any action is possible */\n    stop;\n    /** Determines how many balls in a line is needed to kill them */\n    killAmount;\n    /** Points of the current game */\n    points = 0;\n    /** Number of possible colors, up to 7 (used for debugging) */\n    colorsAmount;\n    /** Determines by how many degrees to rotate the board */\n    rotate = -45;\n    /**\n     * Constructs new Game object\n     * @param rules Rules of the game to be created\n     */\n    constructor(rules) {\n        this.balls = [];\n        this.killAmount = rules.killAmount;\n        this.colorsAmount = rules.colorsAmount;\n        this.next = [(0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(this.colorsAmount), (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(this.colorsAmount), (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(this.colorsAmount)];\n        this.stop = false;\n    }\n    /**\n     * Starts the game\n     */\n    startGame() {\n        this.buildBoard();\n        this.add3();\n    }\n    /**\n     * Builds a new board from scratch\n     */\n    buildBoard() {\n        let board = document.getElementById(\"board\");\n        board.innerHTML = \"\";\n        for (let i = 0; i < 81; i++) {\n            let cell = document.createElement(\"div\");\n            cell.className = \"cell\";\n            cell.addEventListener(\"mouseover\", () => this.showPath({ x: i % 9, y: Math.floor(i / 9) }));\n            cell.addEventListener(\"click\", () => this.moveTo({ x: i % 9, y: Math.floor(i / 9) }));\n            board.appendChild(cell);\n        }\n    }\n    /**\n     * Adds 3 balls to the game\n     */\n    add3() {\n        for (let i = 0; i < 3; i++) {\n            this.addBall();\n        }\n        this.drawBalls();\n        for (const [index, color] of this.next.entries()) {\n            document.getElementsByClassName(\"next\")[index]\n                .style.backgroundColor = _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball.colors[color];\n        }\n        if (this.balls.length === 81) {\n            this.stop = true;\n            setTimeout(() => {\n                alert(`You die. Points earned: ${this.points}`);\n                location.reload();\n            }, 500);\n        }\n    }\n    /**\n     * Adds a ball to the game\n     */\n    addBall() {\n        if (this.balls.length === 81)\n            return;\n        let coords = {\n            x: (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(9),\n            y: (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(9)\n        };\n        while (this.balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_1__.objEqual)(ball.getCoords(), coords)).length > 0) {\n            coords.x = (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(9);\n            coords.y = (0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(9);\n        }\n        let newBall = new _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(coords, this.next.shift());\n        this.balls.push(newBall);\n        this.points += this.checkForKill(newBall);\n        this.next.push((0,_other__WEBPACK_IMPORTED_MODULE_1__.rng)(this.colorsAmount));\n    }\n    /**\n     * Draws balls on the board\n     */\n    drawBalls() {\n        this.buildBoard();\n        for (const ball of this.balls) {\n            let coords = ball.getCoords();\n            let cell = document.getElementsByClassName(\"cell\")[coords.y * 9 + coords.x];\n            let ballDiv = document.createElement(\"div\");\n            ballDiv.className = \"ball\";\n            ballDiv.style.backgroundColor = _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball.colors[ball.getColor()];\n            if (ball.isSelected())\n                ballDiv.className += \" selected\";\n            cell.appendChild(ballDiv);\n            ballDiv.parentNode.addEventListener(\"click\", () => {\n                this.selectBall(ball);\n            });\n        }\n        document.getElementById(\"points\").innerText = this.points.toString();\n    }\n    /**\n     * Selects a ball if it is movable\n     * @param selected The ball to be selected\n     */\n    selectBall(selected) {\n        if (this.stop)\n            return;\n        let coords = selected.getCoords();\n        let neighbors = [\n            { x: coords.x, y: coords.y - 1 },\n            { x: coords.x + 1, y: coords.y },\n            { x: coords.x, y: coords.y + 1 },\n            { x: coords.x - 1, y: coords.y }\n        ];\n        for (const neighbor of neighbors) {\n            if (neighbor.x > 8 || neighbor.x < 0 || neighbor.y > 8 || neighbor.y < 0)\n                continue;\n            if (this.balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_1__.objEqual)(ball.getCoords(), neighbor)).length > 0)\n                continue;\n            for (const ball of this.balls) {\n                if (ball === selected)\n                    ball.changeSelected();\n                else\n                    ball.changeSelected(false);\n            }\n            this.drawBalls();\n            break;\n        }\n    }\n    /**\n     * Draws the path on the board when hovering over a tile\n     * @param to Destination of the path from selected ball\n     */\n    showPath(to) {\n        if (this.stop)\n            return;\n        let cells = document.getElementsByClassName(\"cell\");\n        for (const cell of cells) {\n            cell.className = \"cell\";\n        }\n        if (this.balls.filter(ball => ball.isSelected() === true).length === 0 ||\n            this.balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_1__.objEqual)(ball.getCoords(), to)).length > 0)\n            return;\n        let from = this.balls.filter(ball => ball.isSelected() === true)[0].getCoords();\n        let path = (0,_findPath__WEBPACK_IMPORTED_MODULE_2__.findPath)(from, to, this.balls);\n        if (path.length !== 0)\n            path.push(from);\n        for (const tile of path) {\n            let tileDiv = cells[tile.y * 9 + tile.x];\n            tileDiv.className += \" path\";\n        }\n    }\n    /**\n     * Calls the function to move the ball and does everything needed to be done to continue the game\n     * @param to Coordinate to move the selected ball to\n     */\n    moveTo(to) {\n        if (this.stop)\n            return;\n        let cells = Array.from(document.getElementsByClassName(\"cell\"));\n        let pathCells = cells.filter(cell => cell.className.indexOf(\"path\") !== -1);\n        let ball = this.balls.filter(ball => ball.isSelected() === true)[0];\n        if (pathCells.length === 0) {\n            if (ball !== undefined && !(0,_other__WEBPACK_IMPORTED_MODULE_1__.objEqual)(ball.getCoords(), to))\n                ball.changeSelected();\n            this.drawBalls();\n            return;\n        }\n        let ballDiv = pathCells.filter(cell => cell.children.length > 0)[0].children[0];\n        ballDiv.className = \"ball\";\n        cells[to.y * 9 + to.x].appendChild(ballDiv);\n        ball.moveTo(to);\n        ball.changeSelected();\n        let newPoints = this.checkForKill(ball);\n        this.points += newPoints;\n        this.stop = true;\n        for (const cell of pathCells) {\n            cell.style.backgroundColor = \"#999\";\n        }\n        setTimeout(() => {\n            this.stop = false;\n            if (!newPoints)\n                this.add3();\n            else\n                this.drawBalls();\n        }, 1000);\n    }\n    /**\n     * Checks if game should kill balls, calls a function to kill them and returns points earned if that's the case\n     * @param ball Ball which the function should check\n     */\n    checkForKill(ball) {\n        let directions = [\n            { x: -1, y: 0 },\n            { x: 0, y: -1 },\n            { x: -1, y: -1 },\n            { x: -1, y: 1 }\n        ];\n        let ballsConnected = [];\n        for (const direction of directions) {\n            let ballsConnInDir = this.getNeighborBalls(ball, direction);\n            ballsConnInDir = [...ballsConnInDir, ...this.getNeighborBalls(ball, { x: direction.x * -1, y: direction.y * -1 })];\n            ballsConnected.push(ballsConnInDir);\n        }\n        let newPoints = 0;\n        for (const ballsConnInDir of ballsConnected) {\n            if (ballsConnInDir.length >= this.killAmount - 1) {\n                newPoints += ballsConnInDir.length;\n                this.killBalls(ballsConnInDir);\n            }\n        }\n        if (newPoints) {\n            newPoints++;\n            this.killBalls([ball]);\n        }\n        return newPoints;\n    }\n    /**\n     * Gets the array of balls needed to know if they're killable\n     * @param ball Ball that is looked for correct neighbors\n     * @param direction Direction in which it checks for neighbors\n     * @returns Array of neighboring balls that match the color\n     */\n    getNeighborBalls(ball, direction) {\n        let coords = ball.getCoords();\n        let color = ball.getColor();\n        let ballsConn = [];\n        for (let neighbor = this.getBallIfCorrect({\n            x: coords.x + direction.x,\n            y: coords.y + direction.y\n        }, color); neighbor !== undefined; neighbor = this.getBallIfCorrect({\n            x: neighbor.getCoords().x + direction.x,\n            y: neighbor.getCoords().y + direction.y\n        }, color)) {\n            ballsConn.push(neighbor);\n        }\n        return ballsConn;\n    }\n    /**\n     * Gets a ball of given coords and color\n     * @param coords Coords of the ball we're looking for\n     * @param color Color of the ball we're looking for\n     * @returns The ball we're looking for if it exists, undefined if it doesn't\n     */\n    getBallIfCorrect(coords, color) {\n        return this.balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_1__.objEqual)(ball.getCoords(), coords) && ball.getColor() === color)[0];\n    }\n    /**\n     * Kills balls given\n     * @param balls Balls to kill\n     */\n    killBalls(balls) {\n        this.balls = this.balls.filter(ball => !balls.includes(ball));\n    }\n}\n__decorate([\n    _decorators__WEBPACK_IMPORTED_MODULE_3__.rotateBoard\n], Game.prototype, \"add3\", null);\n\n\n\n//# sourceURL=webpack://balls/./src/Game.ts?");

/***/ }),

/***/ "./src/decorators.ts":
/*!***************************!*\
  !*** ./src/decorators.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"rotateBoard\": () => (/* binding */ rotateBoard)\n/* harmony export */ });\n/** Decorator that rotates the board after new balls are added */\nfunction rotateBoard(target, name, descriptor) {\n    let oryg = descriptor.value;\n    descriptor.value = function (...args) {\n        this.rotate += 45;\n        let board = document.getElementById(\"board\");\n        board.style.transform = `rotate(${this.rotate}deg)`;\n        let result = oryg.apply(this, args);\n        return result;\n    };\n}\n\n\n\n//# sourceURL=webpack://balls/./src/decorators.ts?");

/***/ }),

/***/ "./src/findPath.ts":
/*!*************************!*\
  !*** ./src/findPath.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findPath\": () => (/* binding */ findPath)\n/* harmony export */ });\n/* harmony import */ var _other__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./other */ \"./src/other.ts\");\n\n/**\n * Finds the shortest path between two tiles\n * @param start Coordinates of the beggining\n * @param end Coordinates of the end\n * @param balls Array of every ball on the board - they are considered obstacles\n * @returns If path exists: Array of coords of every step needed to get to the end. If not: Empty array\n */\nfunction findPath(start, end, balls) {\n    let obstacles = [];\n    for (let ball of balls) {\n        let coords = ball.getCoords();\n        obstacles.push(coords);\n    }\n    let [arrBoard, arrPath] = getStartArrays();\n    let i = 0;\n    while (arrPath[end.y][end.x] === \"\") {\n        let parentVal = i ? i.toString() : 'S';\n        let parents = [];\n        for (let y in arrBoard) {\n            for (let x in arrBoard[y]) {\n                if (arrBoard[y][x] === parentVal)\n                    parents.push({ x: parseInt(x), y: parseInt(y) });\n            }\n        }\n        if (parents.length === 0)\n            break;\n        for (let parent of parents) {\n            let neighbors = [\n                { x: parent.x, y: parent.y - 1 },\n                { x: parent.x + 1, y: parent.y },\n                { x: parent.x, y: parent.y + 1 },\n                { x: parent.x - 1, y: parent.y }\n            ];\n            for (let neighbor of neighbors) {\n                if (arrBoard[neighbor.y] !== undefined) {\n                    if (arrBoard[neighbor.y][neighbor.x] === '0' || arrBoard[neighbor.y][neighbor.x] === 'E') {\n                        arrBoard[neighbor.y][neighbor.x] = (i + 1).toString();\n                        arrPath[neighbor.y][neighbor.x] =\n                            `${arrPath[parent.y][parent.x]}${neighbor.y}${neighbor.x},`;\n                    }\n                }\n            }\n        }\n        i++;\n    }\n    return arrPath[end.y][end.x].split(',').slice(0, -1).map(coord => { return { x: parseInt(coord.split('')[1]), y: parseInt(coord.split('')[0]) }; });\n    function getStartValue(coords) {\n        let val;\n        if ((0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, start))\n            val = \"S\";\n        else if ((0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, end))\n            val = \"E\";\n        else if (obstacles.filter(val => (0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, val)).length !== 0)\n            val = \"X\";\n        else\n            val = \"0\";\n        return val;\n    }\n    function getStartArrays() {\n        let arrBoard = [];\n        for (let y = 0; y < 9; y++) {\n            arrBoard.push([]);\n            for (let x = 0; x < 9; x++) {\n                arrBoard[y].push(getStartValue({ x, y }));\n            }\n        }\n        let arrPath = [];\n        for (let y = 0; y < 9; y++) {\n            arrPath.push([]);\n            for (let x = 0; x < 9; x++) {\n                arrPath[y].push('');\n            }\n        }\n        return [arrBoard, arrPath];\n    }\n}\n\n\n\n//# sourceURL=webpack://balls/./src/findPath.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nlet rules = { killAmount: 5, colorsAmount: 7 };\nlet game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(rules);\ngame.startGame();\n\n\n//# sourceURL=webpack://balls/./src/main.ts?");

/***/ }),

/***/ "./src/other.ts":
/*!**********************!*\
  !*** ./src/other.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"objEqual\": () => (/* binding */ objEqual),\n/* harmony export */   \"rng\": () => (/* binding */ rng)\n/* harmony export */ });\n/**\n * Checks if given objects are equal to each other\n * @param obj1 Object 1\n * @param obj2 Object 2\n * @returns True if objects are equal, false otherwise\n */\nfunction objEqual(obj1, obj2) {\n    return JSON.stringify(obj1) === JSON.stringify(obj2);\n}\n/**\n * Gives a random integer from range <0; n)\n * @param n Upper limit of range\n * @returns Random integer contained in <0; n)\n */\nfunction rng(n) {\n    return Math.floor(Math.random() * n);\n}\n\n\n\n//# sourceURL=webpack://balls/./src/other.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;