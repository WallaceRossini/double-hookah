"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;
var tmp_folder = path_1.default.resolve(__dirname, '..', 'tmp');
exports.default = {
    directory: tmp_folder,
    storage: multer_1.default.diskStorage({
        destination: tmp_folder,
        filename: function (request, file, callback) {
            var file_hash = crypto_1.default.randomBytes(10).toString('hex');
            var filename = file_hash + "-" + file.originalname;
            return callback(null, filename);
        }
    })
};
//# sourceMappingURL=Multer.js.map