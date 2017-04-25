import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {JhiLanguageService} from "ng-jhipster";
import {ProfileService} from "./../profiles/profile.service";
import {JhiLanguageHelper, LoginModalService, LoginService, Principal} from "../../shared";

import {DEBUG_INFO_ENABLED, VERSION} from "../../app.constants";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SidenavService} from "../../shared/sidenav.service";
import {ProductCategoryService} from "../../entities/product-category/product-category.service";
import {ProductCategory} from "../../entities/product-category/product-category.model";

export class UserMenuOption {
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
            state('menu-opened', style({transform: 'rotate(180deg)'})),
            state('menu-closed', style({transform: 'rotate(0deg)'})),
            transition('menu-opened <=> menu-closed', [animate('250ms')])
        ]),
        trigger('menu-position', [
            state('menu-opened', style({'right': '0%'})),
            state('menu-closed', style({'right': '-21.3%'})),
            transition('menu-opened<=>menu-closed', [animate('250ms')])
        ]),
        trigger('homeLinkShadowState', [
            state("active", style({boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px -40px  #fae014 inset'})),
            state("inactive", style({boxShadow: '0 0px  #fae014, 0 0  #fae014, 0px 0px  #fae014, 0px 0  #fae014 inset'})),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('servicesLinkShadowState', [
            state("active", style({boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px -40px  #e30070 inset'})),
            state("inactive", style({boxShadow: '0 0px  #e30070, 0 0  #e30070, 0px 0px  #e30070, 0px 0  #e30070 inset'})),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('portfolioLinkShadowState', [
            state("active", style({boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px -40px   #00a2ff inset'})),
            state("inactive", style({boxShadow: '0 0px   #00a2ff, 0 0   #00a2ff, 0px 0px   #00a2ff, 0px 0   #00a2ff inset'})),
            transition('active<=>inactive', animate('250ms'))
        ]),
        trigger('aboutUsLinkShadowState', [
            state("active", style({boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px -40px  #696969 inset'})),
            state("inactive", style({boxShadow: '0 0px  #696969, 0 0  #696969, 0px 0px  #696969, 0px 0  #696969 inset'})),
            transition('active<=>inactive', animate('250ms'))
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
        trigger('portfolioSubmenuDropdown', [
            state('active', style({
                height: '*',
                padding: '10px',
                borderBottom: '2px solid #00a2ff',
                display: 'list-item'
            })),
            state('inactive', style({height: '0', padding: 0, borderBottom: '0px solid #00a2ff', display: 'none'})),
            transition('active<=>inactive', animate('250ms'))
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

    servicesLinkState = 'inactive';
    homeLinkShadow = 'inactive';
    portfolioMenuStatus = 'inactive';
    aboutUsMenuStatus = 'inactive';
    categories: ProductCategory[];

    constructor(private sidenavService: SidenavService,
                private loginService: LoginService,
                private languageHelper: JhiLanguageHelper,
                private languageService: JhiLanguageService,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private profileService: ProfileService,
                private categoriesService: ProductCategoryService,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router) {
        this.version = DEBUG_INFO_ENABLED ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.languageService.addLocation('home');
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.loadCategories();

        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.changeDetectorRef.detectChanges();
    }


    loadCategories() {
        this.categoriesService.query().subscribe((categories) => this.categories = categories.json());
    }

    toggleSidenav() {
        this.sidenavService.toggle();
    }


    hideAboutUsMenu() {
        this.aboutUsMenuStatus = 'inactive';
    }

    showAboutUsMenu() {
        this.aboutUsMenuStatus = 'active';
    }

    showPortfolioSubMenu() {
        this.portfolioMenuStatus = 'active';
    }

    togglePortfolioSubMenu() {
        this.portfolioMenuStatus = this.portfolioMenuStatus === 'active' ? 'inactive' : 'active';
    }

    hidePortfolioSubMenu() {
        this.portfolioMenuStatus = 'inactive';
    }

    hideServicesSubMenu() {
        this.servicesLinkState = 'inactive';
    }

    toggleServicesSubMenu() {
        this.servicesLinkState = this.servicesLinkState === 'active' ? 'inactive' : 'active';
    }

    showServicesSubMenu() {
        this.servicesLinkState = 'active';
    }

    hideHomeShadow() {
        this.homeLinkShadow = 'inactive';
    }

    showHomeShadow() {
        this.homeLinkShadow = 'active';
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
