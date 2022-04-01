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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ball\": () => (/* binding */ Ball)\n/* harmony export */ });\nclass Ball {\n    static colors = [\n        \"#f00\",\n        \"#0f0\",\n        \"#00f\",\n        \"#ff0\",\n        \"#0ff\",\n        \"#f0f\",\n        \"#000\"\n    ];\n    coords;\n    color;\n    selected;\n    constructor(coords, color) {\n        this.coords = coords;\n        this.color = color;\n    }\n    getCoords() {\n        return this.coords;\n    }\n    getColor() {\n        return this.color;\n    }\n    isSelected() {\n        return this.selected;\n    }\n    changeSelected(val) {\n        this.selected = val === undefined ? !this.selected : val;\n    }\n    moveTo(coords) {\n        this.coords = coords;\n    }\n}\n\n\n\n//# sourceURL=webpack://balls/./src/Ball.ts?");

/***/ }),

/***/ "./src/findPath.ts":
/*!*************************!*\
  !*** ./src/findPath.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"findPath\": () => (/* binding */ findPath)\n/* harmony export */ });\n/* harmony import */ var _other__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./other */ \"./src/other.ts\");\n\nfunction findPath(start, end, balls) {\n    let obstacles = [];\n    for (let ball of balls) {\n        let coords = ball.getCoords();\n        obstacles.push(coords);\n    }\n    let [arrBoard, arrPath] = getStartArrays();\n    let i = 0;\n    while (arrPath[end.y][end.x] === \"\") {\n        let parentVal = i ? i.toString() : 'S';\n        let parents = [];\n        for (let y in arrBoard) {\n            for (let x in arrBoard[y]) {\n                if (arrBoard[y][x] === parentVal)\n                    parents.push({ x: parseInt(x), y: parseInt(y) });\n            }\n        }\n        if (parents.length === 0)\n            break;\n        for (let parent of parents) {\n            let neighbors = [\n                { x: parent.x, y: parent.y - 1 },\n                { x: parent.x + 1, y: parent.y },\n                { x: parent.x, y: parent.y + 1 },\n                { x: parent.x - 1, y: parent.y }\n            ];\n            for (let neighbor of neighbors) {\n                if (arrBoard[neighbor.y] !== undefined) {\n                    if (arrBoard[neighbor.y][neighbor.x] === '0' || arrBoard[neighbor.y][neighbor.x] === 'E') {\n                        arrBoard[neighbor.y][neighbor.x] = (i + 1).toString();\n                        arrPath[neighbor.y][neighbor.x] =\n                            `${arrPath[parent.y][parent.x]}${neighbor.y}${neighbor.x},`;\n                    }\n                }\n            }\n        }\n        i++;\n    }\n    return arrPath[end.y][end.x].split(',').slice(0, -1).map(coord => { return { x: parseInt(coord.split('')[1]), y: parseInt(coord.split('')[0]) }; });\n    function getStartValue(coords) {\n        let val;\n        if ((0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, start))\n            val = \"S\";\n        else if ((0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, end))\n            val = \"E\";\n        else if (obstacles.filter(val => (0,_other__WEBPACK_IMPORTED_MODULE_0__.objEqual)(coords, val)).length !== 0)\n            val = \"X\";\n        else\n            val = \"0\";\n        return val;\n    }\n    function getStartArrays() {\n        let arrBoard = [];\n        for (let y = 0; y < 9; y++) {\n            arrBoard.push([]);\n            for (let x = 0; x < 9; x++) {\n                arrBoard[y].push(getStartValue({ x, y }));\n            }\n        }\n        let arrPath = [];\n        for (let y = 0; y < 9; y++) {\n            arrPath.push([]);\n            for (let x = 0; x < 9; x++) {\n                arrPath[y].push('');\n            }\n        }\n        return [arrBoard, arrPath];\n    }\n}\n\n\n\n//# sourceURL=webpack://balls/./src/findPath.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.ts\");\n/* harmony import */ var _findPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./findPath */ \"./src/findPath.ts\");\n/* harmony import */ var _other__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./other */ \"./src/other.ts\");\n\n\n\nbuildBoard();\nlet balls = [];\nlet next = [];\nfor (let i = 0; i < 3; i++) {\n    next.push((0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(7));\n}\nadd3();\nlet stop = false;\nfunction buildBoard() {\n    let board = document.getElementById(\"board\");\n    board.innerHTML = \"\";\n    for (let i = 0; i < 81; i++) {\n        let cell = document.createElement(\"div\");\n        cell.className = \"cell\";\n        cell.addEventListener(\"mouseover\", () => showPath({ x: i % 9, y: Math.floor(i / 9) }));\n        cell.addEventListener(\"click\", () => moveTo({ x: i % 9, y: Math.floor(i / 9) }));\n        board.appendChild(cell);\n    }\n}\nfunction add3() {\n    for (let i = 0; i < 3; i++) {\n        addBall(next.shift());\n        next.push((0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(7));\n    }\n    drawBalls();\n    for (const [index, color] of next.entries()) {\n        document.getElementsByClassName(\"next\")[index]\n            .style.backgroundColor = _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball.colors[color];\n    }\n}\nfunction addBall(color) {\n    if (balls.length === 81)\n        return;\n    let coords = {\n        x: (0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(9),\n        y: (0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(9)\n    };\n    while (balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_2__.objEqual)(ball.getCoords(), coords)).length > 0) {\n        coords.x = (0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(9);\n        coords.y = (0,_other__WEBPACK_IMPORTED_MODULE_2__.rng)(9);\n    }\n    balls.push(new _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball(coords, color));\n}\nfunction drawBalls() {\n    buildBoard();\n    for (const ball of balls) {\n        let coords = ball.getCoords();\n        let cell = document.getElementsByClassName(\"cell\")[coords.y * 9 + coords.x];\n        let ballDiv = document.createElement(\"div\");\n        ballDiv.className = \"ball\";\n        ballDiv.style.backgroundColor = _Ball__WEBPACK_IMPORTED_MODULE_0__.Ball.colors[ball.getColor()];\n        if (ball.isSelected())\n            ballDiv.className += \" selected\";\n        ballDiv.addEventListener(\"click\", () => {\n            selectBall(ball);\n        });\n        cell.appendChild(ballDiv);\n    }\n}\nfunction selectBall(selected) {\n    if (stop)\n        return;\n    let coords = selected.getCoords();\n    let neighbors = [\n        { x: coords.x, y: coords.y - 1 },\n        { x: coords.x + 1, y: coords.y },\n        { x: coords.x, y: coords.y + 1 },\n        { x: coords.x - 1, y: coords.y }\n    ];\n    for (const neighbor of neighbors) {\n        if (neighbor.x > 8 || neighbor.x < 0 || neighbor.y > 8 || neighbor.y < 0)\n            continue;\n        if (balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_2__.objEqual)(ball.getCoords(), neighbor)).length > 0)\n            continue;\n        for (const ball of balls) {\n            if (ball === selected)\n                ball.changeSelected();\n            else\n                ball.changeSelected(false);\n        }\n        drawBalls();\n        break;\n    }\n}\nfunction showPath(to) {\n    if (stop)\n        return;\n    let cells = document.getElementsByClassName(\"cell\");\n    for (const cell of cells) {\n        cell.className = \"cell\";\n    }\n    if (balls.filter(ball => ball.isSelected() === true).length === 0 ||\n        balls.filter(ball => (0,_other__WEBPACK_IMPORTED_MODULE_2__.objEqual)(ball.getCoords(), to)).length > 0)\n        return;\n    let from = balls.filter(ball => ball.isSelected() === true)[0].getCoords();\n    let path = (0,_findPath__WEBPACK_IMPORTED_MODULE_1__.findPath)(from, to, balls);\n    if (path.length !== 0)\n        path.push(from);\n    for (const tile of path) {\n        let tileDiv = cells[tile.y * 9 + tile.x];\n        tileDiv.className += \" path\";\n    }\n}\nfunction moveTo(to) {\n    if (stop)\n        return;\n    let cells = Array.from(document.getElementsByClassName(\"cell\"));\n    let pathCells = cells.filter(cell => cell.className.indexOf(\"path\") !== -1);\n    let ball = balls.filter(ball => ball.isSelected() === true)[0];\n    if (pathCells.length === 0) {\n        if (ball !== undefined && !(0,_other__WEBPACK_IMPORTED_MODULE_2__.objEqual)(ball.getCoords(), to))\n            ball.changeSelected();\n        drawBalls();\n        return;\n    }\n    let ballDiv = pathCells.filter(cell => cell.children.length > 0)[0].children[0];\n    ballDiv.className = \"ball\";\n    cells[to.y * 9 + to.x].appendChild(ballDiv);\n    ball.moveTo(to);\n    ball.changeSelected();\n    stop = true;\n    for (const cell of pathCells) {\n        cell.style.backgroundColor = \"#999\";\n    }\n    setTimeout(() => {\n        stop = false;\n        add3();\n    }, 1000);\n}\n\n\n//# sourceURL=webpack://balls/./src/main.ts?");

/***/ }),

/***/ "./src/other.ts":
/*!**********************!*\
  !*** ./src/other.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"objEqual\": () => (/* binding */ objEqual),\n/* harmony export */   \"rng\": () => (/* binding */ rng)\n/* harmony export */ });\nfunction objEqual(obj1, obj2) {\n    return JSON.stringify(obj1) === JSON.stringify(obj2);\n}\nfunction rng(n) {\n    return Math.floor(Math.random() * n);\n}\n\n\n\n//# sourceURL=webpack://balls/./src/other.ts?");

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