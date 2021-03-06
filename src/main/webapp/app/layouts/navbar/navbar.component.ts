import {ChangeDetectorRef, Component, HostListener, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {JhiLanguageService} from "ng-jhipster";
import {ProfileService} from "./../profiles/profile.service";
import {JhiLanguageHelper, LoginModalService, LoginService, Principal} from "../../shared";

import {DEBUG_INFO_ENABLED, VERSION} from "../../app.constants";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductCategory} from "../../entities/product-category/product-category.model";
import {Subject} from "rxjs";
import {NavbarService} from "./navbar.service";


export class UserMenuOption {
    name: string;
    id?: string;
    title?: string;
    routerLink?: string;
    href?: string;
    translateVar?: string;
    childNodes?: UserMenuOption[];
}
@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        './navbar.scss'
    ],
    animations: [

        trigger('menu-position', [
            state('menu-opened', style({'right': '0%'})),
            state('menu-closed', style({'right': '-21.3%'})),
            transition('menu-opened<=>menu-closed', [animate('250ms')])
        ]),
        trigger('submenuDropdown', [
            state('active', style({
                height: '*',
                padding: '10px',
                borderBottom: '2px solid #b90062',
                display: 'list-item'
            })),
            state('inactive', style({height: '0', padding: 0, borderBottom: '0px solid #b90062', display: 'none'})),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('homeLinkShadowState', [
            state("active", style({
                color: 'white',
                boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px -3em  #fae014 inset'
            })),
            state("inactive",
                style({
                    color: 'black',
                    boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px 0  #fae014 inset'
                })),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('servicesLinkShadowState', [
            state("active", style({
                boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px -3em  #e30070 inset',
                color: 'white',
            })),
            state("inactive", style({
                boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px 0  #e30070 inset',
                color: 'black'
            })),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('portfolioLinkShadowState', [
            state("active", style({
                color: 'white',
                boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px -3em   #00a2ff inset'
            })),
            state("inactive", style({
                color: 'black',
                boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px 0   #00a2ff inset'
            })),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('aboutUsLinkShadowState', [
            state("active", style({
                color: 'white',
                boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px -3em  #696969 inset'
            })),
            state("inactive", style({
                color: 'black',
                boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px 0  #696969 inset'
            })),
            transition('active<=>inactive', animate('250ms'))
        ]),
    ]
})
export class NavbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    servicesSubmenuState = 'inactive';
    showMobileNavbar = false;

    @Input('categories')
    categories: ProductCategory[];

    @Input('positionSubject')
    positionSubject: Subject<number>;

    whyUsShadowState = 'inactive';
    servicesShadowState = 'inactive';
    portfolioShadowState = 'inactive';
    aboutUsShadowState = 'inactive';

    @Input('isPositionFixed')
    isPositionFixed = false;

    @Input('isTransparent')
    isTransparent = true;

    @Input('showLogo')
    isLogoShown = false;

    linkShadows: Array<string> = [
        '',//lamps
        'inactive',//whyUs
        'inactive',//services
        'inactive',//portfolio
        'inactive',//aboutUs
    ];


    constructor(private navbarService: NavbarService,
                private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private languageService: JhiLanguageService,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router) {
        this.version = DEBUG_INFO_ENABLED ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
    }


    ngOnInit() {


        this.onResize();
        if (this.positionSubject)
            this.positionSubject.subscribe((position) => {
                for (let i = 0; i < this.linkShadows.length; i++) {
                    if (i == position) this.linkShadows[i] = 'active';
                    else this.linkShadows[i] = 'inactive';
                }
            });

        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.changeDetectorRef.detectChanges();
    }

    @HostListener('window:resize', ['$event'])
    onResize($event?: any) {
        this.showMobileNavbar = window.innerWidth <= 750;
    }




    toggleFixedState() {
        if (!this.showMobileNavbar) {
            this.isPositionFixed = true;
        }
        this.isPositionFixed = true;
    }

    toggleRelativeState() {
        if (!this.showMobileNavbar) {
            this.isPositionFixed = false;
        }
        else this.isPositionFixed = true;
    }


    hideServicesSubMenu() {
        this.servicesSubmenuState = 'inactive';
    }

    showServicesSubMenu() {
        this.servicesSubmenuState = 'active';
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


}
