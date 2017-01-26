exports[true] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(1);
	const pino = __webpack_require__(2);
	const chalk = __webpack_require__(3);
	const serverPort = 5050;
	const pretty = pino.pretty({
	    formatter: (log) => {
	        const pinoLog = log;
	        const levels = {
	            default: 'USERLVL',
	            60: 'FATAL',
	            50: 'ERROR',
	            40: 'WARN',
	            30: 'INFO',
	            20: 'DEBUG',
	            10: 'TRACE'
	        };
	        return `[${new Date(pinoLog.time).toISOString()}]  ${chalk.green(levels[pinoLog.level])}  ${chalk.cyan(pinoLog.msg)}`;
	    }
	});
	pretty.pipe(process.stdout);
	const pinoInstance = pino({
	    safe: false,
	}, pretty);
	let server = express();
	server.listen(serverPort, () => pinoInstance.info(`Server is running on port ${serverPort}...`));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("pino");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ }
/******/ ]);