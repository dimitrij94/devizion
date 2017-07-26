import {Injectable} from "@angular/core";
import {ProductCategory} from "../../entities/product-category/product-category.model";

export interface MobileNavbarItem {
    label: string;
    opened?: boolean;
    hasSubmenu?: boolean;
    submenu: Array<MobileNavbarSubmenuItem>;
    submenuHeight?: string;
    submenuMaxHeight?: string;
}

export interface MobileNavbarSubmenuItem {
    label: string;
    routerLink: string;
    clickCallback?: ($event: any) => void;
}

export const submenuItemHeight: number = 40;

@Injectable()
export class NavbarService {
    constructor() {
    }


    getStandartNavigationItems(categories) {
        return [
            this.getNavbarItem('Чому саме ми?', []),
            this.getNavbarItem('Послуги', this.getNavbarSubitemFromCategory(categories, '/')),
            this.getNavbarItem('Портфоліо', this.getNavbarSubitemFromCategory(categories, '/portfolio/')),
            this.getNavbarItem('Про нас', [])
        ];
    }

    getNavbarItem(title: string, submenu: Array<MobileNavbarSubmenuItem>): MobileNavbarItem {
        return {
            label: title,
            opened: false,
            hasSubmenu: submenu && submenu.length > 0,
            submenuHeight: submenu && submenu.length * submenuItemHeight + 'px',
            submenuMaxHeight: 0 + 'px',
            submenu: submenu
        };
    }

    getNavbarSubitemFromCategory(category: ProductCategory[], routerSubLink: string): MobileNavbarSubmenuItem[] {
        return category.map((value) => {
            return (<MobileNavbarSubmenuItem> {
                label: value.categoryName,
                routerLink: `/product-category${routerSubLink}${value.id}`
            });
        })
    }
}
