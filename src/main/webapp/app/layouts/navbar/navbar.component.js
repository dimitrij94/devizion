"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var animations_1 = require("@angular/animations");
var UserMenuOption = (function () {
    function UserMenuOption() {
    }
    return UserMenuOption;
}());
exports.UserMenuOption = UserMenuOption;
var NavbarComponent = (function () {
    function NavbarComponent(loginService, languageHelper, languageService, principal, loginModalService, profileService, changeDetectorRef, router) {
        this.loginService = loginService;
        this.languageHelper = languageHelper;
        this.languageService = languageService;
        this.principal = principal;
        this.loginModalService = loginModalService;
        this.profileService = profileService;
        this.changeDetectorRef = changeDetectorRef;
        this.router = router;
        this.menuState = 'menu-closed';
        this.portfolioOptions = [
            {
                name: 'Широкоформатний друк',
                routerLink: './profile/printing',
                translateVar: 'global.menu.portfolio.print'
            }, {
                name: 'Дизайн',
                routerLink: './profile/design',
                translateVar: 'global.menu.portfolio.design'
            }
        ];
        this.adminMenuItem = {
            id: 'administrationMenuItem',
            name: 'Адміністрування',
            translateVar: 'global.menu.admin.main',
            childNodes: [
                {
                    id: '',
                    name: 'User management',
                    routerLink: 'user-management',
                    translateVar: 'global.menu.admin.userManagement',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Configuration',
                    routerLink: 'jhi-configuration',
                    translateVar: 'global.menu.admin.configuration',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Health',
                    routerLink: 'jhi-health',
                    translateVar: 'global.menu.admin.health',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Audits',
                    routerLink: 'audits',
                    translateVar: 'global.menu.admin.audits',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'API',
                    routerLink: 'docs',
                    translateVar: 'global.menu.admin.apidocs',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Logs',
                    routerLink: 'logs',
                    translateVar: 'global.menu.admin.logs',
                    childNodes: undefined
                }
            ]
        };
        this.entitiesMenuItem = {
            id: 'entitiesMenuItem',
            name: 'Сущности',
            href: undefined,
            translateVar: 'global.menu.entities.main',
            childNodes: [
                {
                    id: '',
                    name: 'Custumer',
                    routerLink: 'custumer',
                    translateVar: 'global.menu.entities.custumer',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'User Order',
                    routerLink: 'user-order',
                    translateVar: 'global.menu.entities.userOrder',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Product',
                    routerLink: 'product',
                    translateVar: 'global.menu.entities.product',
                    childNodes: undefined
                }
            ]
        };
        this.profileMenuItem = {
            id: 'admin-menu-profile-item',
            name: 'Profile',
            translateVar: 'global.menu.account.main',
            childNodes: [
                {
                    routerLink: 'settings',
                    name: 'Settings',
                    translateVar: 'global.menu.account.settings',
                },
                {
                    routerLink: 'password',
                    name: 'Password',
                    translateVar: 'global.menu.account.password',
                }
            ]
        };
        this.servicesOptions = [
            {
                name: 'Широкоформатний друк',
                routerLink: './services/printing',
                translateVar: 'global.menu.services.print'
            },
            { id: undefined, name: 'Дизайн', routerLink: '/services/design', translateVar: 'global.menu.services.design' }
        ];
        this.userMenuOptions = [
            { id: 'portfolio-menu-item', name: 'Портфоліо', translateVar: '' },
            { id: 'about-us-menu-item', name: 'Про нас', translateVar: '' }
        ];
        this.servicesLinkState = 'inactive';
        this.homeLinkShadow = 'inactive';
        this.profileMenuStatus = 'inactive';
        this.aboutUsMenuStatus = 'inactive';
        this.version = app_constants_1.DEBUG_INFO_ENABLED ? 'v' + app_constants_1.VERSION : '';
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languageHelper.getAll().then(function (languages) {
            _this.languages = languages;
        });
        this.profileService.getProfileInfo().subscribe(function (profileInfo) {
            _this.inProduction = profileInfo.inProduction;
            _this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.changeDetectorRef.detectChanges();
    };
    NavbarComponent.prototype.hideAboutUsMenu = function () {
        this.aboutUsMenuStatus = 'inactive';
    };
    NavbarComponent.prototype.showAboutUsMenu = function () {
        this.aboutUsMenuStatus = 'active';
    };
    NavbarComponent.prototype.showPortfolioSubMenu = function () {
        this.profileMenuStatus = 'active';
    };
    NavbarComponent.prototype.hidePortfolioSubMenu = function () {
        this.profileMenuStatus = 'inactive';
    };
    NavbarComponent.prototype.hideServicesSubMenu = function () {
        this.servicesLinkState = 'inactive';
    };
    NavbarComponent.prototype.showServicesSubMenu = function () {
        this.servicesLinkState = 'active';
    };
    NavbarComponent.prototype.hideHomeShadow = function () {
        this.homeLinkShadow = 'inactive';
    };
    NavbarComponent.prototype.showHomeShadow = function () {
        this.homeLinkShadow = 'active';
    };
    NavbarComponent.prototype.changeLanguage = function (languageKey) {
        this.languageService.changeLanguage(languageKey);
    };
    NavbarComponent.prototype.collapseNavbar = function () {
        this.isNavbarCollapsed = true;
    };
    NavbarComponent.prototype.isAuthenticated = function () {
        return this.principal.isAuthenticated();
    };
    NavbarComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    NavbarComponent.prototype.logout = function () {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    };
    NavbarComponent.prototype.toggleNavbar = function () {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    };
    NavbarComponent.prototype.getImageUrl = function () {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    };
    NavbarComponent.prototype.toggleMenuState = function () {
        this.menuState = this.menuState === 'menu-opened' ? 'menu-closed' : 'menu-opened';
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'jhi-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: [
            'navbar.scss'
        ],
        animations: [
            animations_1.trigger('arrow-position', [
                animations_1.state('menu-opened', animations_1.style({ transform: 'rotate(180deg)' })),
                animations_1.state('menu-closed', animations_1.style({ transform: 'rotate(0deg)' })),
                animations_1.transition('menu-opened <=> menu-closed', [animations_1.animate('250ms')])
            ]),
            animations_1.trigger('menu-position', [
                animations_1.state('menu-opened', animations_1.style({ 'right': '0%' })),
                animations_1.state('menu-closed', animations_1.style({ 'right': '-21.3%' })),
                animations_1.transition('menu-opened<=>menu-closed', [animations_1.animate('250ms')])
            ]),
            animations_1.trigger('homeLinkShadowState', [
                animations_1.state("active", animations_1.style({ boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px -40px  #fae014 inset' })),
                animations_1.state("inactive", animations_1.style({ boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px 0  #fae014 inset' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ]),
            animations_1.trigger('servicesLinkShadowState', [
                animations_1.state("active", animations_1.style({ boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px -40px  #e30070 inset' })),
                animations_1.state("inactive", animations_1.style({ boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px 0  #e30070 inset' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ]),
            animations_1.trigger('portfolioLinkShadowState', [
                animations_1.state("active", animations_1.style({ boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px -40px   #00a2ff inset' })),
                animations_1.state("inactive", animations_1.style({ boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px 0   #00a2ff inset' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ]),
            animations_1.trigger('aboutUsLinkShadowState', [
                animations_1.state("active", animations_1.style({ boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px -40px  #696969 inset' })),
                animations_1.state("inactive", animations_1.style({ boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px 0  #696969 inset' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ]),
            animations_1.trigger('submenuDropdown', [
                animations_1.state('active', animations_1.style({ height: '*', padding: '10px', borderBottom: '2px solid #b90062', display: 'list-item' })),
                animations_1.state('inactive', animations_1.style({ height: '0', padding: 0, borderBottom: '0px solid #b90062', display: 'none' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ]),
            animations_1.trigger('portfolioSubmenuDropdown', [
                animations_1.state('active', animations_1.style({ height: '*', padding: '10px', borderBottom: '2px solid #00a2ff', display: 'list-item' })),
                animations_1.state('inactive', animations_1.style({ height: '0', padding: 0, borderBottom: '0px solid #00a2ff', display: 'none' })),
                animations_1.transition('active<=>inactive', animations_1.animate('250ms'))
            ])
        ]
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
