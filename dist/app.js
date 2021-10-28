"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var connect_1 = require("./database/connect");
var routes_1 = require("./routes");
require('dotenv-safe').config({
    allowEmptyValues: true
});
var app = (0, express_1.default)();
exports.app = app;
var connector = new connect_1.PostgresConnector();
connector.connect().then(function () {
    console.log("[+] \uD83C\uDF00 PostgreSQL Connected...");
}).catch(function (error) {
    console.log("\uD83D\uDED1 Error: " + error);
});
app.use(express_1.default.json());
app.use(routes_1.routes);
//# sourceMappingURL=app.js.map