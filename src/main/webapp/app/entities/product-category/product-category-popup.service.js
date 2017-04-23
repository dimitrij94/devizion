"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_category_model_1 = require("./product-category.model");
var ProductCategoryPopupService = (function () {
    function ProductCategoryPopupService(modalService, router, productCategoryService) {
        this.modalService = modalService;
        this.router = router;
        this.productCategoryService = productCategoryService;
        this.isOpen = false;
    }
    ProductCategoryPopupService.prototype.open = function (component, id) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (id) {
            this.productCategoryService.find(id).subscribe(function (productCategory) {
                _this.productCategoryModalRef(component, productCategory);
            });
        }
        else {
            return this.productCategoryModalRef(component, new product_category_model_1.ProductCategory());
        }
    };
    ProductCategoryPopupService.prototype.productCategoryModalRef = function (component, productCategory) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.productCategory = productCategory;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    return ProductCategoryPopupService;
}());
ProductCategoryPopupService = __decorate([
    core_1.Injectable()
], ProductCategoryPopupService);
exports.ProductCategoryPopupService = ProductCategoryPopupService;
