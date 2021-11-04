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
exports.CategoryService = void 0;
var typeorm_1 = require("typeorm");
var CategoryDto_1 = require("../dtos/CategoryDto");
var CategoryRepository_1 = require("../repositories/CategoryRepository");
var CategoryService = /** @class */ (function () {
    function CategoryService() {
        this.category_service = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
    }
    CategoryService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categories, all;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.category_service.find()];
                    case 1:
                        categories = _a.sent();
                        all = [];
                        categories.forEach(function (item) { return all.push(new CategoryDto_1.CategoryDto(item)); });
                        return [2 /*return*/, all];
                }
            });
        });
    };
    CategoryService.prototype.show = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var exist_category, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.category_service.findOne(id)];
                    case 1:
                        exist_category = _b.sent();
                        if (!exist_category)
                            throw new Error('Category does not exists');
                        category = new CategoryDto_1.CategoryDto(exist_category);
                        return [2 /*return*/, category];
                }
            });
        });
    };
    CategoryService.prototype.create = function (_a) {
        var key = _a.key, title = _a.title;
        return __awaiter(this, void 0, void 0, function () {
            var exist_category, obj, result, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        key = key.toUpperCase();
                        return [4 /*yield*/, this.category_service.findOne({ key: key })];
                    case 1:
                        exist_category = _b.sent();
                        if (exist_category)
                            throw new Error('Category already exists');
                        obj = this.category_service.create({ key: key, title: title });
                        return [4 /*yield*/, this.category_service.save(obj)];
                    case 2:
                        result = _b.sent();
                        category = new CategoryDto_1.CategoryDto(result);
                        return [2 /*return*/, category];
                }
            });
        });
    };
    CategoryService.prototype.update = function (id, category) {
        return __awaiter(this, void 0, void 0, function () {
            var exist_category, result, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.category_service.findOne(id)];
                    case 1:
                        exist_category = _a.sent();
                        if (!exist_category)
                            throw new Error('Category does not exists');
                        result = Object.assign(exist_category, category);
                        return [4 /*yield*/, this.category_service.save(result)];
                    case 2:
                        _a.sent();
                        obj = new CategoryDto_1.CategoryDto(result);
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    CategoryService.prototype.delete = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var exist_category, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.category_service.findOne(id)];
                    case 1:
                        exist_category = _b.sent();
                        if (!exist_category)
                            throw new Error('Category does not exists');
                        return [4 /*yield*/, this.category_service.remove(exist_category)];
                    case 2:
                        _b.sent();
                        category = new CategoryDto_1.CategoryDto(exist_category);
                        return [2 /*return*/, category];
                }
            });
        });
    };
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map