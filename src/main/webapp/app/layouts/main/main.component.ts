import {Component, ElementRef, NgZone, OnInit, Renderer, ViewChild} from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Event as RouterEvent,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from "@angular/router";

import {JhiLanguageHelper, StateStorageService} from "../../shared";
import {UserMenuOption} from "../navbar/navbar.component";
import {LoginModalService} from "../../shared/login/login-modal.service";
import {LoginService} from "../../shared/login/login.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Principal} from "../../shared/auth/principal.service";
import {SidenavService} from "../../shared/sidenav.service";
@Component({
    selector: 'jhi-main',
    styleUrls: ['./main.scss'],
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
    loading: boolean = true;
    sidenavOpened: boolean;
    adminMenuItem: UserMenuOption[] = [
        {
            name: 'User management',
            routerLink: 'user-management',
            translateVar: 'global.menu.admin.userManagement'
        },
        {
            name: 'Configuration',
            routerLink: 'jhi-configuration',
            translateVar: 'global.menu.admin.configuration'
        },
        {
            name: 'Health',
            routerLink: 'jhi-health',
            translateVar: 'global.menu.admin.health'
        },
        {
            name: 'Audits',
            routerLink: 'audits',
            translateVar: 'global.menu.admin.audits'
        },
        {
            name: 'API',
            routerLink: 'docs',
            translateVar: 'global.menu.admin.apidocs'
        },
        {
            name: 'Logs',
            routerLink: 'logs',
            translateVar: 'global.menu.admin.logs'
        }
    ];
    entitiesMenuItem: UserMenuOption[] = [
        {
            name: 'Custumer',
            routerLink: 'custumer',
            translateVar: 'global.menu.entities.custumer'
        },
        {
            name: 'User Order',
            routerLink: 'user-order',
            translateVar: 'global.menu.entities.userOrder'
        },
        {
            name: 'Product',
            routerLink: 'product',
            translateVar: 'global.menu.entities.product'
        },
        {
            name: 'Product Category',
            routerLink: 'product-category',
            translateVar: 'global.menu.entities.productCategory'
        }
    ];
    profileMenuItem: UserMenuOption[] = [
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
    ];
    modalRef: NgbModalRef;

    constructor(private router: Router,
                private ngZone: NgZone,
                private renderer: Renderer,
                private sidenavService: SidenavService,
                private jhiLanguageHelper: JhiLanguageHelper,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private loginService: LoginService,
                private $storageService: StateStorageService,) {
        router.events.subscribe(this.navigationInterceptor.bind(this));
        this.setupPolyfillRequestAnimationFrame();
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

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.sidenavService.statusSubject.subscribe((status) => this.sidenavOpened = status);
    }


}
