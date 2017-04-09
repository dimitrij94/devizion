import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {JhiLanguageService} from "ng-jhipster";
import {ProfileService} from "./../profiles/profile.service";
import {JhiLanguageHelper, LoginModalService, LoginService, Principal} from "../../shared";

import {DEBUG_INFO_ENABLED, VERSION} from "../../app.constants";
import {animate, state, style, transition, trigger} from "@angular/animations";

export interface UserMenuOption {
    name: string;
    id?: string;
    routerLink?: string;
    href?: string;
    translateVar: string;
    childNodes?: UserMenuOption[];
}
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ],
    animations: [
        trigger('arrow-position', [
            state('menu-opened', style({'transform': 'rotate(180deg)'})),
            state('menu-closed', style({'transform': 'rotate(0deg)'})),
            transition('menu-opened <=> menu-closed', [animate('150ms')])
        ]),
        trigger('menu-position', [
            state('menu-opened', style({'right': '0%'})),
            state('menu-closed', style({'right': '-80%'})),
            transition('menu-opened<=>menu-closed', [animate(250)])
        ])
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    menuState = 'menu-closed';

    adminMenuItem: UserMenuOption = {
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
    entitiesMenuItem: UserMenuOption = {
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
    profileMenuItem: UserMenuOption = {
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
            },
            {
                routerLink: 'register',
                name: 'Register',
                translateVar: 'global.menu.account.register'
            }
        ]
    };
    userMenuOptions: UserMenuOption[] = [
        {
            id: 'services-menu-item',
            name: 'Послуги',
            translateVar: '',
            childNodes: [
                {id: undefined, name: 'Широкоформатний друк', routerLink: './services/printing', translateVar: ''},
                {id: undefined, name: 'Дизайн', routerLink: '/services/design', translateVar: ''}
            ]
        },
        {id: 'portfolio-menu-item', name: 'Портфоліо', translateVar: ''},
        {id: 'about-us-menu-item', name: 'Про нас', translateVar: ''}

    ];

    constructor(private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private languageService: JhiLanguageService,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private router: Router) {
        this.version = DEBUG_INFO_ENABLED ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    toggleMenuState() {
        this.menuState = this.menuState === 'menu-opened' ? 'menu-closed' : 'menu-opened';
    }


}
