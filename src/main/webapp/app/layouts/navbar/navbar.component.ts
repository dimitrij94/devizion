import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService} from 'ng-jhipster';
import {ProfileService} from '../profiles/profile.service'; // FIXME barrel doesn't work here
import {JhiLanguageHelper, Principal, LoginModalService, LoginService} from '../../shared';

import {VERSION, DEBUG_INFO_ENABLED} from '../../app.constants';
import {trigger, state, transition, style, animate} from '@angular/animations';

interface UserMenuOption {
    id: string;
    name: string;
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
    adminMenuOptions: UserMenuOption[] = [
        {
            id: 'administrationMenuItem',
            name: 'Адміністрування',
            href: undefined,
            translateVar: 'global.menu.admin.main',
            childNodes: [
                {
                    id: '',
                    name: 'Database',
                    href: '/h2-console',
                    translateVar: 'global.menu.admin.database',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'User management',
                    href: 'user-management',
                    translateVar: 'global.menu.admin.userManagement',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Configuration',
                    href: 'jhi-configuration',
                    translateVar: 'global.menu.admin.configuration',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Health',
                    href: 'jhi-health',
                    translateVar: 'global.menu.admin.health',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Audits',
                    href: 'audits',
                    translateVar: 'global.menu.admin.audits',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'API',
                    href: 'docs',
                    translateVar: 'global.menu.admin.apidocs',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Logs',
                    href: 'logs',
                    translateVar: 'global.menu.admin.logs',
                    childNodes: undefined
                }
            ]
        },
        {
            id: 'entitiesMenuItem',
            name: 'Сущности',
            href: undefined,
            translateVar: 'global.menu.entities.main',
            childNodes: [
                {
                    id: '',
                    name: 'Custumer',
                    href: 'custumer',
                    translateVar: 'global.menu.entities.custumer',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'User Order',
                    href: 'user-order',
                    translateVar: 'global.menu.entities.userOrder',
                    childNodes: undefined
                },
                {
                    id: '',
                    name: 'Product',
                    href: 'product',
                    translateVar: 'global.menu.entities.product',
                    childNodes: undefined
                }
            ]
        }
    ];
    userMenuOptions: UserMenuOption[] = [
        {
            id: 'services-menu-item', name: 'Послуги', href: 'javascript:void(0)',
            childNodes: [
                {id: undefined, name: 'Широкоформатний друк', href: './services/printing', translateVar: ''},
                {id: undefined, name: 'Дизайн', href: '/services/design', translateVar: ''}
            ], translateVar: ''
        },
        {id: 'portfolio-menu-item', name: 'Портфоліо', href: 'javascript:void(0)', translateVar: ''},
        {id: 'about-us-menu-item', name: 'Про нас', href: 'javascript:void(0)', translateVar: ''}

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
