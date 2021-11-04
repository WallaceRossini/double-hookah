"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
var CategoryDto_1 = require("./CategoryDto");
var ProductDto = /** @class */ (function () {
    function ProductDto(_a) {
        var id = _a.id, name = _a.name, price = _a.price, detail = _a.detail, category = _a.category, image = _a.image, weight = _a.weight, brand = _a.brand;
        this.id = id;
        this.name = name;
        this.price = price;
        this.detail = detail;
        this.category = new CategoryDto_1.CategoryDto(category);
        this.image = image;
        this.weight = weight;
        this.brand = brand;
    }
    return ProductDto;
}());
exports.ProductDto = ProductDto;
//# sourceMappingURL=ProductDto.js.map