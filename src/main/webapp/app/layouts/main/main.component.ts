import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized} from '@angular/router';

import {JhiLanguageHelper, StateStorageService} from '../../shared';
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
    sidenavOpened:boolean;
    adminMenuItem: UserMenuOption[] = [
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
    ];
    entitiesMenuItem: UserMenuOption[] = [
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

    constructor(private sidenavService: SidenavService,
                private jhiLanguageHelper: JhiLanguageHelper,
                private router: Router,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private loginService: LoginService,
                private $storageService: StateStorageService,) {
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
        this.sidenavService.statusSubject.subscribe((status)=>this.sidenavOpened = status);
    }
}
