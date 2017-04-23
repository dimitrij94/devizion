"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var HomeComponent = (function () {
    function HomeComponent(jhiLanguageService, principal, loginModalService, productService, eventManager, alertService, categoryService) {
        this.jhiLanguageService = jhiLanguageService;
        this.principal = principal;
        this.loginModalService = loginModalService;
        this.productService = productService;
        this.eventManager = eventManager;
        this.alertService = alertService;
        this.categoryService = categoryService;
        this.categories = [
            {
                id: 0,
                categoryName: 'Друк',
                categoryPhotoUri: '/c1.jpeg',
                categoryProducts: [
                    {
                        id: 0,
                        productName: 'Широкоформатний друк',
                        productPrice: 1200,
                        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam velit, auctor vel tortor in, finibus vulputate turpis. Proin et ante accumsan',
                        productImageUri: require('../../content/images/categories/design.jpg')
                    },
                    {
                        id: 1,
                        productName: 'Дурк на плівці',
                        productPrice: 1200,
                        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam velit, auctor vel tortor in, finibus vulputate turpis. Proin et ante accumsan',
                        productImageUri: require('../../content/images/categories/wide_print.jpg')
                    },
                    {
                        id: 2,
                        productName: 'Дурк запрошень',
                        productPrice: 1200,
                        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam velit, auctor vel tortor in, finibus vulputate turpis. Proin et ante accumsan',
                        productImageUri: require('../../content/images/categories/wide_print.jpg')
                    }
                ]
            },
            {
                id: 0,
                categoryName: 'Дизай',
                categoryPhotoUri: '/c1.jpeg',
                categoryProducts: [
                    {
                        id: 0,
                        productName: 'Дизайн візиток',
                        productPrice: 1200,
                        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam velit, auctor vel tortor in, finibus vulputate turpis. Proin et ante accumsan',
                        productImageUri: require('../../content/images/categories/design.jpg')
                    },
                    {
                        id: 1,
                        productName: 'Дизайн буклетів',
                        productPrice: 1200,
                        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam velit, auctor vel tortor in, finibus vulputate turpis. Proin et ante accumsan',
                        productImageUri: require('../../content/images/categories/wide_print.jpg')
                    }
                ]
            }
        ];
        this.activeTabIndex = 0;
        this.activeServiceIndex = 0;
        this.numberOfServicesDisplayed = 2;
        this.jhiLanguageService.setLocations(['home']);
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.scrollServices.bind(this), 5000);
    };
    HomeComponent.prototype.scrollServices = function () {
        var activeCategoryProducts = this.categories[this.activeTabIndex].categoryProducts;
        var lastActiveIndex = activeCategoryProducts.indexOf(this.activeServices[this.numberOfServicesDisplayed - 1]);
        this.activeServices.pop();
        var index = lastActiveIndex + 1 > activeCategoryProducts.length - 1 ? 1 : lastActiveIndex + 1;
        this.activeServices.unshift(activeCategoryProducts[index]);
    };
    HomeComponent.prototype.selectActiveTabIndex = function ($event) {
        this.activeTabIndex = $event.index;
        this.activeServiceIndex = 0;
    };
    HomeComponent.prototype.loadAll = function () {
        var _this = this;
        this.categoryService.query().subscribe(function (res) {
            _this.categories = res.json();
        }, function (res) { return _this.onError(res.json()); });
        this.productService.query().subscribe(function (res) {
            _this.products = res.json();
        }, function (res) { return _this.onError(res.json()); });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeServices = this.categories[0].categoryProducts.slice(0, this.numberOfServicesDisplayed);
        this.principal.identity().then(function (account) {
            _this.account = account;
        });
        this.registerAuthenticationSuccess();
    };
    HomeComponent.prototype.onError = function (error) {
        this.alertService.error(error.message, null, null);
    };
    HomeComponent.prototype.registerAuthenticationSuccess = function () {
        var _this = this;
        this.eventManager.subscribe('authenticationSuccess', function (message) {
            _this.principal.identity().then(function (account) {
                _this.account = account;
            });
        });
    };
    HomeComponent.prototype.isAuthenticated = function () {
        return this.principal.isAuthenticated();
    };
    HomeComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'jhi-home',
        templateUrl: './home.component.html',
        styleUrls: [
            'home.scss'
        ],
        animations: [
            animations_1.trigger("enterLeaveServices", [animations_1.state("active", animations_1.style({ opacity: 1 })),
                animations_1.transition("void=>active", [
                    animations_1.style({ opacity: 0 }),
                    animations_1.animate("250ms")
                ]),
                animations_1.transition("active=>void", [
                    animations_1.animate("250ms", animations_1.style({ opacity: 0 }))
                ])
            ])
        ]
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
