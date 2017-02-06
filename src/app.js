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
	const mongoConnetor_1 = __webpack_require__(14);
	const identity_1 = __webpack_require__(10);
	const error_util_1 = __webpack_require__(16);
	const logger_util_1 = __webpack_require__(18);
	const httpResponse_util_1 = __webpack_require__(21);
	const restGlobal = global;
	const initializeGlobalUtils = (callback) => {
	    restGlobal.errorUtil = error_util_1.default;
	    restGlobal.loggerUtil = logger_util_1.default;
	    restGlobal.httpResponseUtil = httpResponse_util_1.default;
	    callback();
	};
	const connectToDatabase = (callback) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        const db = yield mongoConnetor_1.default();
	        restGlobal.db = db;
	        callback();
	    }
	    catch (err) {
	        callback(err);
	    }
	});
	const initDBCollections = (callback) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        yield identity_1.identityCollectionValidation();
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
	    initDBCollections,
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
	const bodyParser = __webpack_require__(4);
	const httpServerMiddlewares = __webpack_require__(5);
	const routes_1 = __webpack_require__(6);
	const routes_2 = __webpack_require__(12);
	const serverPort = process.env.SERVER_PORT || 5050;
	const server = express();
	const initializeHTTPServer = () => {
	    server.use(bodyParser.json({ limit: '50mb' }));
	    server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	    server.use(httpServerMiddlewares.allowCrossDomain);
	    server.use(httpServerMiddlewares.logRequest);
	    server.use(routes_1.default);
	    server.use(routes_2.default);
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
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	const allowCrossDomain = (req, res, next) => {
	    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
	    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,authorization');
	    res.header('Access-Control-Allow-Credentials', 'true');
	    if (req.method === 'OPTIONS') {
	        res.sendStatus(200);
	    }
	    else {
	        next();
	    }
	};
	exports.allowCrossDomain = allowCrossDomain;
	const logRequest = (req, res, next) => {
	    if (req.method !== 'OPTIONS') {
	        req.startTime = Date.now();
	        res.on('finish', () => {
	            let requestDuration = Date.now() - req.startTime;
	            global.loggerUtil().request({
	                method: req.method,
	                url: req.url,
	                statusCode: res.statusCode,
	                duration: requestDuration
	            });
	        });
	    }
	    if (next()) {
	        next();
	    }
	};
	exports.logRequest = logRequest;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express_1 = __webpack_require__(3);
	const post_handler_1 = __webpack_require__(7);
	const routes = express_1.Router();
	routes.get('/', (req, res) => (res.status(200).send(global.httpResponseUtil({ payload: { 'status': 'up' } }))));
	routes.post('/identity', (req, res) => post_handler_1.postHandler(req, res));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = routes;


/***/ },
/* 7 */
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
	const identityCreation_workflow_1 = __webpack_require__(8);
	const validator_util_1 = __webpack_require__(11);
	exports.postHandler = (req, res) => {
	    const requestData = req.body;
	    const validateData = (callback) => {
	        if (!validator_util_1.emailAndPasswordValidator(requestData)) {
	            return callback({ err: global.errorUtil('MissingData') });
	        }
	        callback();
	    };
	    const createIdentity = (callback) => __awaiter(this, void 0, void 0, function* () {
	        try {
	            const identity = yield identityCreation_workflow_1.createIdentityWorklow(requestData);
	            callback(null, identity);
	        }
	        catch (err) {
	            callback(err);
	        }
	    });
	    steed.waterfall([
	        validateData,
	        createIdentity
	    ], (err, result) => {
	        if (err) {
	            return res.status(400).send(global.httpResponseUtil(err));
	        }
	        return res.status(200).send(global.httpResponseUtil({ payload: result }));
	    });
	};


/***/ },
/* 8 */
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
	const bcrypt = __webpack_require__(9);
	const identity_1 = __webpack_require__(10);
	const salt = bcrypt.genSaltSync(10);
	exports.encodePassword = (password) => bcrypt.hashSync(password, salt);
	exports.createIdentityWorklow = (identityData) => (new Promise((resolve, reject) => {
	    let sendIdentityData;
	    const mapData = (callback) => {
	        sendIdentityData = Object.assign({}, identityData);
	        sendIdentityData.password = exports.encodePassword(identityData.password);
	        callback();
	    };
	    const checkIdentity = (callback) => __awaiter(this, void 0, void 0, function* () {
	        try {
	            yield identity_1.findIdentiyByEmail(sendIdentityData.email);
	            callback({ err: global.errorUtil() });
	        }
	        catch (err) {
	            if (err.errorMessage === 'Resource not found') {
	                return callback();
	            }
	            callback(err);
	        }
	    });
	    const createIdentityHandler = (callback) => __awaiter(this, void 0, void 0, function* () {
	        try {
	            const identity = yield identity_1.createIdentity(sendIdentityData);
	            callback(null, identity);
	        }
	        catch (err) {
	            callback({ err: err });
	        }
	    });
	    steed.waterfall([
	        mapData,
	        checkIdentity,
	        createIdentityHandler
	    ], (err, result) => {
	        if (err) {
	            reject(err);
	        }
	        else {
	            resolve(result);
	        }
	    });
	}));


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const logMongoError = (error) => {
	    global.loggerUtil().error(`Mongo: ${error.message}`);
	};
	exports.identityCollectionValidation = () => __awaiter(this, void 0, void 0, function* () {
	    new Promise((resolve, reject) => {
	        try {
	            global.db.createCollection('identities', {}, (err) => {
	                global.db.command({
	                    collMod: 'identities',
	                    validator: {
	                        $and: [
	                            { 'profile.name.first': { $type: 'string' } },
	                            { 'profile.name.last': { $type: 'string' } },
	                            { 'email': { $type: 'string', $exists: true } },
	                            { 'password': { $type: 'string', $exists: true } },
	                            { 'createdAt': { $type: 'number', $exists: true } }
	                        ]
	                    },
	                    validationAction: 'error',
	                    validationLevel: 'moderate'
	                });
	                resolve();
	            });
	        }
	        catch (err) {
	            logMongoError(err);
	            reject();
	        }
	    });
	});
	exports.createIdentity = (data) => (new Promise((resolve, reject) => {
	    const identityCollection = global.db.collection('identities');
	    const createIdentityData = Object.assign({ profile: { name: { first: '', last: '' } } }, data);
	    createIdentityData.email = createIdentityData.email.toLowerCase();
	    createIdentityData.createdAt = Date.now();
	    identityCollection.insertOne(createIdentityData, (err, doc) => {
	        if (err) {
	            logMongoError(err);
	            reject({ errorMessage: err.message });
	        }
	        const query = {
	            email: createIdentityData.email
	        };
	        identityCollection.find(query).limit(1).toArray((error, result) => {
	            if (error) {
	                reject({ errorMessage: err.message });
	            }
	            resolve(result[0]);
	        });
	    });
	}));
	exports.findIdentiyByEmail = (email) => (new Promise((resolve, reject) => {
	    const query = {
	        email: email.toLowerCase()
	    };
	    const identityCollection = global.db.collection('identities');
	    identityCollection.find(query).limit(1).toArray((err, result) => {
	        if (err) {
	            logMongoError(err);
	            reject({ errorMessage: err.message });
	        }
	        if (result.length === 0) {
	            reject(global.errorUtil('NotFound'));
	        }
	        resolve(result[0]);
	    });
	}));
	exports.deleteIdentity = (identityId) => (new Promise((resolve, reject) => {
	    const query = {
	        _id: identityId
	    };
	    const identityCollection = global.db.collection('identities');
	    identityCollection.deleteOne(query, (err) => {
	        if (err) {
	            logMongoError(err);
	            reject(err);
	        }
	        resolve(identityId);
	    });
	}));


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	const emailPattern = new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
	    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
	    '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
	    '[a-zA-Z]{2,}))$'].join(''));
	exports.emailValidator = (email) => emailPattern.test(email);
	exports.emailAndPasswordValidator = (data) => (data.email && data.password && exports.emailValidator(data.email) && data.password.length > 6);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express_1 = __webpack_require__(3);
	const post_handler_1 = __webpack_require__(13);
	const routes = express_1.Router();
	routes.post('/auth/login', (req, res) => post_handler_1.postHandler(req, res));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = routes;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const steed = __webpack_require__(1);
	const validator_util_1 = __webpack_require__(11);
	exports.decodeData = (data) => {
	    const debuffedData = Buffer.from(data, 'base64').toString();
	    const loginData = debuffedData.split(':');
	    return {
	        email: loginData[0],
	        password: loginData[1]
	    };
	};
	exports.postHandler = (req, res) => {
	    const requesData = req.body;
	    const decodeRequestData = (callback) => {
	        if (!requesData.up) {
	            return callback({ err: global.errorUtil('MissingData') });
	        }
	        callback(null, exports.decodeData(requesData.up));
	    };
	    const validateData = (loginData, callback) => {
	        if (!validator_util_1.emailAndPasswordValidator(loginData)) {
	            return callback({ err: global.errorUtil('MissingData') });
	        }
	        callback();
	    };
	    const login = (callback) => {
	        callback();
	    };
	    steed.waterfall([
	        decodeRequestData,
	        validateData,
	        login
	    ], (err, result) => {
	        if (err) {
	            return res.status(400).send(global.httpResponseUtil(err));
	        }
	        return res.status(200).send(global.httpResponseUtil({ payload: result }));
	    });
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mongodb = __webpack_require__(15);
	const MongoClient = mongodb.MongoClient;
	const mongoURL = process.env.DB_URL;
	const initializeDatabase = () => (new Promise((resolve, reject) => {
	    MongoClient.connect(mongoURL, (err, db) => {
	        if (err) {
	            global.loggerUtil().error('Error on DB connection', err);
	            reject();
	        }
	        global.loggerUtil().info(`Connected to DB at ${mongoURL}`);
	        resolve(db);
	    });
	}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = initializeDatabase;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const errors = __webpack_require__(17);
	const errorUtil = (errorName = 'BadRequest') => (errors[errorName]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = errorUtil;


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
		"BadRequest": {
			"errorMessage": "Opsss... Bad request"
		},
		"InvalidCredentials": {
			"errorMessage": "Invalid credentials"
		},
		"MissingData": {
			"errorMessage": "Some data is missing"
		},
		"NotFound": {
			"errorMessage": "Resource not found"
		}
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const pino = __webpack_require__(19);
	const chalk = __webpack_require__(20);
	const levels = {
	    default: 'USERLVL',
	    60: 'FATAL',
	    50: 'ERROR',
	    40: 'WARN',
	    30: 'INFO',
	    20: 'DEBUG',
	    10: 'TRACE',
	    5: 'REQUEST'
	};
	const echoLevel = (level) => {
	    switch (level) {
	        case 5:
	            return chalk.yellow(levels[level]);
	        case 30:
	            return chalk.green(levels[level]);
	        case 50:
	            return chalk.red(levels[level]);
	        default:
	            return chalk.green(levels[level]);
	    }
	};
	const echoStatus = (status) => {
	    switch (true) {
	        case status >= 500:
	            return chalk.red(status.toString());
	        case status >= 400:
	            return chalk.yellow(status.toString());
	        case status >= 300:
	            return chalk.gray(status.toString());
	        case status >= 200:
	            return chalk.green(status.toString());
	        default:
	            return chalk.green(status.toString());
	    }
	};
	const pretty = pino.pretty({
	    formatter: (log) => {
	        const pinoLog = log;
	        if (pinoLog.level === 5) {
	            return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)} ` +
	                `${pinoLog.method} ${pinoLog.url} - Status: ${echoStatus(pinoLog.statusCode)} in ${pinoLog.duration}ms`;
	        }
	        return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)}  ${chalk.cyan(pinoLog.msg)}`;
	    }
	});
	pretty.pipe(process.stdout);
	const loggerUtil = () => (pino({
	    safe: false,
	    level: 'request',
	    levelVal: 5
	}, pretty));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = loggerUtil;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("pino");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	const httpResponse = (response) => ({
	    status: {
	        errorMessage: response.err ? response.err.errorMessage : '',
	        success: response.err ? false : true,
	    },
	    payload: response.err ? {} : response.payload
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = httpResponse;


/***/ }
/******/ ]);