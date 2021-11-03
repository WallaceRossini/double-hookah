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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var typeorm_1 = require("typeorm");
var ProductDto_1 = require("../dtos/ProductDto");
var ProductRepository_1 = require("../repositories/ProductRepository");
var S3StorageService_1 = require("./S3StorageService");
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.product_service = (0, typeorm_1.getCustomRepository)(ProductRepository_1.ProductRepository);
    }
    ProductService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, all;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.product_service.find()];
                    case 1:
                        products = _a.sent();
                        all = [];
                        products.forEach(function (item) { return all.push(new ProductDto_1.ProductDto(item)); });
                        return [2 /*return*/, all];
                }
            });
        });
    };
    ProductService.prototype.show = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var exist_product, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.product_service.findOne(id)];
                    case 1:
                        exist_product = _b.sent();
                        if (!exist_product)
                            return [2 /*return*/, new Error('Product does not exists')];
                        product = new ProductDto_1.ProductDto(exist_product);
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.create = function (_a) {
        var name = _a.name, price = _a.price, category = _a.category, brand = _a.brand, detail = _a.detail, image = _a.image, weight = _a.weight;
        return __awaiter(this, void 0, void 0, function () {
            var product, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product = this.product_service.create({
                            name: name,
                            price: price,
                            category: category,
                            brand: brand,
                            detail: detail,
                            image: image,
                            weight: weight
                        });
                        return [4 /*yield*/, this.product_service.save(product)];
                    case 1:
                        _b.sent();
                        result = new ProductDto_1.ProductDto(product);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ProductService.prototype.update = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var exist_product, property, object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.product_service.findOne(id)];
                    case 1:
                        exist_product = _a.sent();
                        if (!exist_product)
                            return [2 /*return*/, new Error('Product does not exists')];
                        for (property in exist_product) {
                            if (product[property] !== undefined) {
                                if (exist_product[property] !== product[property]) {
                                    exist_product[property] = product[property];
                                }
                            }
                        }
                        return [4 /*yield*/, this.product_service.save(exist_product)];
                    case 2:
                        _a.sent();
                        object = new ProductDto_1.ProductDto(exist_product);
                        return [2 /*return*/, object];
                }
            });
        });
    };
    ProductService.prototype.delete = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var exist_product, s3_storage_service, filename, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.product_service.findOne(id)];
                    case 1:
                        exist_product = _b.sent();
                        if (!exist_product)
                            return [2 /*return*/, new Error('Product does not exists')];
                        s3_storage_service = new S3StorageService_1.S3StorageService();
                        filename = exist_product.image.substring(exist_product.image.indexOf(".com/") + 5);
                        return [4 /*yield*/, s3_storage_service.delete(filename)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.product_service.remove(exist_product)];
                    case 3:
                        _b.sent();
                        product = new ProductDto_1.ProductDto(exist_product);
                        return [2 /*return*/, product];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map