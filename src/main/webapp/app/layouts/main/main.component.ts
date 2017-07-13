import {Component, OnInit} from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Event as RouterEvent,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from "@angular/router";

import {JhiLanguageHelper} from "../../shared";
import {UserMenuOption} from "../navbar/navbar.component";
import {LoginModalService} from "../../shared/login/login-modal.service";
import {LoginService} from "../../shared/login/login.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Principal} from "../../shared/auth/principal.service";
import {SidenavService} from "../../shared/sidenav.service";
import {MdDialog, MdIconRegistry} from "@angular/material";
import {ContactsDialogComponent} from "../contacts-dialog/contacts-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";
@Component({
    selector: 'jhi-main',
    styleUrls: ['./main.scss'],
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
    loading: boolean = true;
    sidenavOpened: boolean;
    adminMenuItems: UserMenuOption[] = [
        {
            name: 'User management',
            routerLink: 'user-management',
            title: 'Управление пользователями',
            translateVar: 'global.menu.admin.userManagement'
        },
        {
            name: 'Configuration',
            routerLink: 'jhi-configuration',
            title: 'Настройки',
            translateVar: 'global.menu.admin.configuration'
        },
        {
            name: 'Health',
            routerLink: 'jhi-health',
            title: 'Состояние',
            translateVar: 'global.menu.admin.health'
        },
        {
            name: 'Audits',
            routerLink: 'audits',
            title: 'Аудит',
            translateVar: 'global.menu.admin.audits'
        },
        {
            name: 'API',
            routerLink: 'docs',
            title: 'API',
            translateVar: 'global.menu.admin.apidocs'
        },
        {
            name: 'Logs',
            routerLink: 'logs',
            title: 'Логи',
            translateVar: 'global.menu.admin.logs'
        }
    ];
    entitiesMenuItems: UserMenuOption[] = [
        {
            name: 'Custumer',
            routerLink: 'custumer',
            title: 'Замовники',
            translateVar: 'global.menu.entities.custumer'
        },
        {
            name: 'Slide-page',
            routerLink: 'slide-page',
            title: 'Сторінки слайдера',
        },
        {
            name: 'User Order',
            routerLink: 'user-order',
            title: 'Портфоліо замовлень',
            translateVar: 'global.menu.entities.userOrder'
        },
        {
            name: 'Product',
            routerLink: 'product',
            title: 'Продукти',
            translateVar: 'global.menu.entities.product'
        },
        {
            name: 'Product Category',
            routerLink: 'product-category',
            title: 'Категорії продуктів',
            translateVar: 'global.menu.entities.productCategory'
        }
    ];
    profileMenuItems: UserMenuOption[] = [
        {
            routerLink: 'settings',
            name: 'Settings',
            title: 'Налаштування',
            translateVar: 'global.menu.account.settings',
        },
        {
            routerLink: 'password',
            name: 'Password',
            title: 'Пароль',
            translateVar: 'global.menu.account.password',
        }
    ];
    modalRef: NgbModalRef;
    isAuthenticated = false;

    constructor(private router: Router,
                private sidenavService: SidenavService,
                private jhiLanguageHelper: JhiLanguageHelper,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private loginService: LoginService,
                private iconRegistry: MdIconRegistry,
                private domSanitizer: DomSanitizer,
                private dialog: MdDialog) {
        router.events.subscribe(this.navigationInterceptor.bind(this));
        this.setupPolyfillRequestAnimationFrame();
        let phoneIconWebpackUrl = require('../../../content/images/icons/ic_phone_white_24px.svg');
        this.iconRegistry.addSvgIcon(
            'phone',
            domSanitizer.bypassSecurityTrustResourceUrl(phoneIconWebpackUrl)
        );

        let buildIconUrl = require('../../../content/images/icons/ic_build_white_24px.svg');
        this.iconRegistry.addSvgIcon(
            'build',
            domSanitizer.bypassSecurityTrustResourceUrl(buildIconUrl)
        );

        let moreVertical = require('../../../content/images/icons/ic_more_vert_white_24px.svg');
        this.iconRegistry.addSvgIcon(
            'more-vertical',
            domSanitizer.bypassSecurityTrustResourceUrl(moreVertical)
        );

        let userIconUrl = require('../../../content/images/icons/ic_person_white_24px.svg');
        this.iconRegistry.addSvgIcon(
            'user',
            domSanitizer.bypassSecurityTrustResourceUrl(userIconUrl)
        );


    }


    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.principal.getAuthenticationState().subscribe((identity: any) => {
            this.isAuthenticated = identity != null;
        });
        this.sidenavService.statusSubject.subscribe((status) => this.sidenavOpened = status);
    }

    adminMenuClick(menuOption: UserMenuOption) {
        menuOption.routerLink && this.router.navigate([menuOption.routerLink]);

    }

    openContactsDialog() {
        let dialogRef = this.dialog.open(ContactsDialogComponent);
    }

    setupPolyfillRequestAnimationFrame() {
        let lastTime = 0;
        let vendors = ['ms', 'moz', 'webkit', 'o'];
        for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = (callback, element?) => {
                let currTime = new Date().getTime();
                let timeToCall = Math.max(0, 16 - (currTime - lastTime));
                let id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = (id) => {
                clearTimeout(id);
            };
    }

    private navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }


    toggleSidenav() {
        this.sidenavService.toggle();
    }


    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'devizionApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }


    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }


}
