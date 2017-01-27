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
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const steed = __webpack_require__(1);
	const httpServer_1 = __webpack_require__(2);
	const mongoConnetor_1 = __webpack_require__(4);
	const error_utils_1 = __webpack_require__(6);
	const logger_utils_1 = __webpack_require__(8);
	const initializeGlobalUtils = (callback) => {
	    const restGlobal = global;
	    restGlobal.errorUtil = error_utils_1.default;
	    restGlobal.loggerUtil = logger_utils_1.default;
	    callback();
	};
	const connectToDatabase = (callback) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        yield mongoConnetor_1.default();
	        callback();
	    }
	    catch (err) {
	        callback(err);
	    }
	});
	const initializeServer = (callback) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        yield httpServer_1.default();
	        callback();
	    }
	    catch (err) {
	        callback();
	    }
	});
	steed.waterfall([
	    initializeGlobalUtils,
	    connectToDatabase,
	    initializeServer
	], (err) => {
	    if (err) {
	        global.loggerUtil().Error(err);
	    }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("steed");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(3);
	const serverPort = 5050;
	const server = express();
	const initializeHTTPServer = () => {
	    return new Promise((resolve, reject) => {
	        server.listen(serverPort, () => {
	            global.loggerUtil().info(`Server is running on port ${serverPort}`);
	            resolve();
	        });
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = initializeHTTPServer;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mongoose = __webpack_require__(5);
	const bluebird = __webpack_require__(11);
	const mongoURL = 'mongodb://localhost:27017/REST-in-peace';
	const initializeDatabase = () => {
	    mongoose.Promise = bluebird;
	    return new Promise((resolve, reject) => {
	        const connection = mongoose.createConnection(mongoURL);
	        connection.on('open', () => {
	            global.loggerUtil().info(`Connected to DB at ${mongoURL}`);
	            resolve();
	        });
	        connection.on('error', (err) => {
	            global.loggerUtil().error('Error on DB connection', err);
	            reject();
	        });
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = initializeDatabase;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const errors = __webpack_require__(7);
	const errorUtil = (errorName = 'BadRequest') => (errors[errorName]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = errorUtil;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const pino = __webpack_require__(9);
	const chalk = __webpack_require__(10);
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
/* 9 */
/***/ function(module, exports) {

	module.exports = require("pino");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }
/******/ ]);