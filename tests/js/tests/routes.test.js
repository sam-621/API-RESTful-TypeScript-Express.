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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const index_config_1 = require("../src/config/index.config");
function Test() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.post("http://localhost:8000/explorespace/api/login", {
            email: "admin@a.com",
            password: "123456",
        }, {
            headers: {
                "api-key": index_config_1.api_key,
            },
        });
        console.log(res);
    });
}
Test();
