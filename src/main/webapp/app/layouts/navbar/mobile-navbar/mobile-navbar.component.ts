import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductCategory} from "../../../entities/product-category/product-category.model";
import {MobileNavbarItem, NavbarService, submenuItemHeight} from "../navbar.service";


@Component({
    selector: 'jhi-mobile-navbar',
    templateUrl: './mobile-navbar.component.html',
    styleUrls: ['./mobile-navbar.component.scss'],
    animations: [
        trigger('menuOpened', [
            state('opened', style({transform: 'translateY(0%)'})),
            state('closed', style({transform: 'translateY(-100%)'})),
            transition('opened <=> closed', animate('200ms linear')),
            //transition('closed => opened', animate('200ms ease-in'))
        ])
    ]
})
export class MobileNavbarComponent implements OnInit {
    menuStatus = 'closed';

    @Input('categories')
    categories: ProductCategory[];

    @Output('itemClicked')
    menuItemClicked: EventEmitter<number>;

    navigationItems: Array<MobileNavbarItem>;

    constructor(private navbarService: NavbarService) {
    }

    ngOnInit(): any {
        this.navigationItems = this.navbarService.getStandartNavigationItems(this.categories);
    }

    positionItemClicked(i: number) {
        this.menuItemClicked.emit(i);
    }

    toggleMenu() {
        this.menuStatus = this.menuStatus === 'opened' ? 'closed' : 'opened';
    }

    toggleSubmenu(menuItem: MobileNavbarItem) {
        if (menuItem.opened === true) {
            menuItem.opened = false;
            menuItem.submenuMaxHeight = '0px';
        }
        else {
            menuItem.opened = true;
            menuItem.submenuMaxHeight = menuItem.submenu.length * submenuItemHeight + 'px';
        }
    }

}
