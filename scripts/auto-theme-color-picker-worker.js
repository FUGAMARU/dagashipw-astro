"use strict";
/**
 * @file 記事のサムネイルからテーマカラーを自動で一括取得するスクリプトのWorker
 */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var worker_threads_1 = require("worker_threads");
var node_1 = require("node-vibrant/node");
var sharp_1 = require("sharp");
var api_1 = require("@/services/api");
/** サムネイルからテーマカラーを取得できなかった場合のフォールバック色 */
var THEME_COLOR_FALLBACK = "#343434";
/**
 * テーマカラーを取得する
 *
 * @param src - 画像ソース
 * @returns テーマカラー (HEX)
 */
var getThemeColor = function (src) { return __awaiter(void 0, void 0, void 0, function () {
    var palette;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, node_1.Vibrant.from(src).getPalette()];
            case 1:
                palette = _c.sent();
                return [2 /*return*/, (_b = (_a = palette.Vibrant) === null || _a === void 0 ? void 0 : _a.hex) !== null && _b !== void 0 ? _b : THEME_COLOR_FALLBACK];
        }
    });
}); };
/** Main */
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var articleUrlId, thumbnailUrl, isWebp, themeColor, response, responseBuffer, webpBuffer, pngBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                articleUrlId = worker_threads_1.workerData.payload.articleUrlId;
                thumbnailUrl = worker_threads_1.workerData.payload.thumbnailUrl;
                isWebp = thumbnailUrl.endsWith(".webp");
                themeColor = THEME_COLOR_FALLBACK;
                if (!isWebp) return [3 /*break*/, 5];
                return [4 /*yield*/, fetch(thumbnailUrl)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    console.error("\u753B\u50CF\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ".concat(thumbnailUrl));
                }
                return [4 /*yield*/, response.arrayBuffer()];
            case 2:
                responseBuffer = _a.sent();
                webpBuffer = Buffer.from(responseBuffer);
                return [4 /*yield*/, (0, sharp_1.default)(webpBuffer).toFormat("png").toBuffer()];
            case 3:
                pngBuffer = _a.sent();
                return [4 /*yield*/, getThemeColor(pngBuffer)];
            case 4:
                themeColor = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, getThemeColor(thumbnailUrl)];
            case 6:
                themeColor = _a.sent();
                _a.label = 7;
            case 7: return [4 /*yield*/, (0, api_1.setArticleThemeColor)(articleUrlId, themeColor)];
            case 8:
                _a.sent();
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(articleUrlId);
                return [2 /*return*/];
        }
    });
}); };
main();
