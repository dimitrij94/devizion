"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var custumer_model_1 = require("./custumer.model");
var CustumerPopupService = (function () {
    function CustumerPopupService(modalService, router, custumerService) {
        this.modalService = modalService;
        this.router = router;
        this.custumerService = custumerService;
        this.isOpen = false;
    }
    CustumerPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.custumerService.find(id).subscribe(function (custumer) {
                _this.custumerModalRef(component, custumer);
            });
        }
        else {
            return this.custumerModalRef(component, new custumer_model_1.Custumer());
        }
    };
    CustumerPopupService.prototype.custumerModalRef = function (component, custumer) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.custumer = custumer;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    return CustumerPopupService;
}());
CustumerPopupService = __decorate([
    core_1.Injectable()
], CustumerPopupService);
exports.CustumerPopupService = CustumerPopupService;
