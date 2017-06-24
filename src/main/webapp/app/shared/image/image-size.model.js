"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Dmitrij on 24.04.2017.
 */
var ScreenSize;
(function (ScreenSize) {
    ScreenSize[ScreenSize["xs"] = 0] = "xs";
    ScreenSize[ScreenSize["sm"] = 1] = "sm";
    ScreenSize[ScreenSize["md"] = 2] = "md";
    ScreenSize[ScreenSize["lg"] = 3] = "lg";
})(ScreenSize = exports.ScreenSize || (exports.ScreenSize = {}));
exports.imageScalars = [0.2, 0.4, 0.6, 0.8, 1.0];
var ImageScalar = (function () {
    function ImageScalar(size) {
        this.size = size;
    }
    ImageScalar.getFillScreenScalar = function (numOfElements) {
        var portfolioImageScalar = (100 / numOfElements) / 100;
        var scalarDifferences = exports.imageScalars.map(function (scalar) { return Math.abs(scalar - portfolioImageScalar); });
        var closesScalar = scalarDifferences.indexOf(Math.min.apply(null, scalarDifferences));
        switch (closesScalar) {
            case (0): return exports.twentyScalar;
            case (1): return exports.fortyScalar;
            case (2): return exports.sixtyScalar;
            case (3): return exports.eightyScalar;
            case (4): return exports.hundredScalar;
        }
    };
    ImageScalar.prototype.toString = function () {
        return this.size.toString();
    };
    return ImageScalar;
}());
exports.ImageScalar = ImageScalar;
exports.twentyScalar = new ImageScalar(0.2);
exports.fortyScalar = new ImageScalar(0.4);
exports.sixtyScalar = new ImageScalar(0.6);
exports.eightyScalar = new ImageScalar(0.8);
exports.hundredScalar = new ImageScalar('1.0');
