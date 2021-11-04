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
var CategoryControler_1 = require("../controllers/CategoryControler");
var routes = (0, express_1.Router)();
exports.routes = routes;
var product_ctrl = new ProductController_1.ProductController();
var category_ctrl = new CategoryControler_1.CategoryController();
var uploads = (0, multer_1.default)(Multer_1.default);
routes.get('/products', product_ctrl.index);
routes.get('/products/:id', product_ctrl.show);
routes.post('/products', uploads.single('image'), product_ctrl.create);
routes.patch('/products/:id', uploads.single('image'), product_ctrl.update);
routes.delete('/products/:id', product_ctrl.delete);
routes.get('/categories', category_ctrl.index);
routes.get('/categories/:id', category_ctrl.show);
routes.post('/categories', category_ctrl.create);
routes.patch('/categories/:id', category_ctrl.update);
routes.delete('/categories/:id', category_ctrl.delete);
//# sourceMappingURL=index.js.map