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
	const steed = __webpack_require__(8);
	const httpServer_1 = __webpack_require__(1);
	const error_utils_1 = __webpack_require__(3);
	const logger_utils_1 = __webpack_require__(5);
	const initGlobalUtils = (callback) => {
	    const restGlobal = global;
	    restGlobal.errorUtil = error_utils_1.default;
	    restGlobal.loggerUtil = logger_utils_1.default;
	    callback();
	};
	const initServer = (callback) => {
	    httpServer_1.initializeHTTPServer();
	    callback();
	};
	steed.waterfall([
	    initGlobalUtils,
	    initServer
	], (err) => {
	    if (err) {
	        global.loggerUtil().Error(err);
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(2);
	const serverPort = 5050;
	let server = express();
	function initializeHTTPServer() {
	    server.listen(serverPort, () => global.loggerUtil().info(`Server is running on port ${serverPort}...`));
	}
	exports.initializeHTTPServer = initializeHTTPServer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const errors = __webpack_require__(4);
	const errorUtil = (errorName = 'BadRequest') => (errors[errorName]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = errorUtil;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		"BadRequest": {
			"errorMessage": "Opsss... Bad request"
		},
		"InvalidCredentials": {
			"errorMessage": "Invalidcredentials"
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const pino = __webpack_require__(6);
	const chalk = __webpack_require__(7);
	const levels = {
	    default: 'USERLVL',
	    60: 'FATAL',
	    50: 'ERROR',
	    40: 'WARN',
	    30: 'INFO',
	    20: 'DEBUG',
	    10: 'TRACE'
	};
	const echoLevel = (level) => {
	    switch (level) {
	        case 30:
	            return chalk.green(levels[level]);
	        case 50:
	            return chalk.red(levels[level]);
	        default:
	            return chalk.green(levels[level]);
	    }
	};
	const pretty = pino.pretty({
	    formatter: (log) => {
	        const pinoLog = log;
	        return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)}  ${chalk.cyan(pinoLog.msg)}`;
	    }
	});
	pretty.pipe(process.stdout);
	const loggerUtil = () => (pino({
	    safe: false,
	}, pretty));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = loggerUtil;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("pino");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("steed");

/***/ }
/******/ ]);