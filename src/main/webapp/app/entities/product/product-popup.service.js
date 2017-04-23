"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_model_1 = require("./product.model");
var ProductPopupService = (function () {
    function ProductPopupService(modalService, router, productService) {
        this.modalService = modalService;
        this.router = router;
        this.productService = productService;
        this.isOpen = false;
    }
    ProductPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.productService.find(id).subscribe(function (product) {
                _this.productModalRef(component, product);
            });
        }
        else {
            return this.productModalRef(component, new product_model_1.Product());
        }
    };
    ProductPopupService.prototype.productModalRef = function (component, product) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.product = product;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    return ProductPopupService;
}());
ProductPopupService = __decorate([
    core_1.Injectable()
], ProductPopupService);
exports.ProductPopupService = ProductPopupService;
