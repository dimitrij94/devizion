/**
 * Created by dmitrij on 09.04.17.
 */

import {Component, Input} from "@angular/core";
import {UserMenuOption} from "./navbar.component";
@Component({
    selector: 'jhi-navbar-admin-menu-item',
    moduleId: module.id,
    templateUrl: './navbar-admin-menu-item.component.html'
})
export class NavbarAdminMenuItemComponent {
    @Input('item')
    item: UserMenuOption;

}
