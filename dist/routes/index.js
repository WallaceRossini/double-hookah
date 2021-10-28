"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var ProductController_1 = require("../controllers/ProductController");
var Multer_1 = __importDefault(require("../configs/Multer"));
var multer_1 = __importDefault(require("multer"));
var routes = (0, express_1.Router)();
exports.routes = routes;
var product_ctrl = new ProductController_1.ProductController();
var uploads = (0, multer_1.default)(Multer_1.default);
routes.post('/products', uploads.single('image'), product_ctrl.create);
//# sourceMappingURL=index.js.map