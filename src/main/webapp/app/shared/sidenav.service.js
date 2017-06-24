"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var SidenavService = (function () {
    function SidenavService() {
        var _this = this;
        this.statusSubject = new rxjs_1.Subject();
        this.statusSubject.subscribe(function (status) {
            _this.status = status;
        });
    }
    SidenavService.prototype.toggle = function () {
        this.statusSubject.next(this.status !== true);
    };
    return SidenavService;
}());
exports.SidenavService = SidenavService;
