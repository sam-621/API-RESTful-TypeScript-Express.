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
function Test() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.post("http://localhost:8000/explorespace/api/login", {
            email: "admin@a.com",
            password: "123456",
        }, {
            headers: {
                "api-key": "c6f619a91c104840b53e74140efdc43fb753bd2a1171cc878e94a39c8c5c1eb27cf035ae6e4809da74a573beb73539154c7d1d1722802fd213bcbaafec904bdc",
            },
        });
        console.log(res);
    });
}
Test();
