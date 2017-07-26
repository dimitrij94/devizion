/**
 * Created by dmitrij on 09.04.17.
 */

import {Component, Input} from "@angular/core";
import {UserMenuOption} from "./navbar.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
    selector: 'jhi-navbar-admin-menu-item',
    moduleId: module.id,
    templateUrl: './navbar-admin-menu-item.component.html',
    styleUrls: ['./navbar-admin-menu-item.scss'],
    animations: [
        trigger('subMenuStatus', [
            state('shown', style({height: '*'})),
            state('hidden', style({height: '0'})),
            transition('shown<=>hidden', animate('200ms'))
        ])
    ]
})
export class NavbarAdminMenuItemComponent {
    @Input('item')
    item: UserMenuOption;
    isShown: string = 'hidden';

    toggleSubmenuState() {
        this.isShown = this.isShown === 'hidden' ? 'shown' : 'hidden';
    }
}
