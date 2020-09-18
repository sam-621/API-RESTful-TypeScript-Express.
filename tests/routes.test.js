"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var cli_color_1 = require("cli-color");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var api_key = process.env.API_KEY;
function TestAuthRoutes() {
    return __awaiter(this, void 0, void 0, function () {
        var config, test1, test2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        headers: {
                            "api-key": api_key
                        }
                    };
                    console.log(cli_color_1.blackBright("Auth Routes test\n"));
                    return [4 /*yield*/, axios_1["default"].post("http://localhost:8000/explorespace/api/login", {
                            email: "admin@a.com",
                            password: "123456"
                        }, config)];
                case 1:
                    test1 = _a.sent();
                    return [4 /*yield*/, axios_1["default"].post("http://localhost:8000/explorespace/api/login", {
                            email: "admin@.com",
                            password: "1234"
                        }, config)];
                case 2:
                    test2 = _a.sent();
                    console.log(cli_color_1.blackBright("    POST"));
                    if (test1.data.message === "SUCCESS") {
                        console.log(cli_color_1.green("\t✓") + " Should response a SUCCESS message");
                    }
                    else {
                        console.log(cli_color_1.red("\tX") + " Should response a SUCCESS message");
                    }
                    if (test2.data.message === "Wrong data schem") {
                        console.log(cli_color_1.green("\t✓") + " Should response a Wrong data schema message");
                    }
                    else {
                        console.log(cli_color_1.red("\tX") + " Should response a Wrong data schema message");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
TestAuthRoutes();
// restify listening at http://[::]:8080
//   products
//     GET
//       ✓ Should return json as default data format
//       ✓ Should return json as data format when set accept header to json
//     POST
//       ✓ Should return 201 status code and location header
