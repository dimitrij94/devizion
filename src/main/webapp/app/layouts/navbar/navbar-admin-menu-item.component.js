/**
 * Created by dmitrij on 09.04.17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var NavbarAdminMenuItemComponent = (function () {
    function NavbarAdminMenuItemComponent() {
        this.isShown = 'hidden';
    }
    NavbarAdminMenuItemComponent.prototype.toggleSubmenuState = function () {
        this.isShown = this.isShown === 'hidden' ? 'shown' : 'hidden';
    };
    return NavbarAdminMenuItemComponent;
}());
__decorate([
    core_1.Input('item')
], NavbarAdminMenuItemComponent.prototype, "item", void 0);
NavbarAdminMenuItemComponent = __decorate([
    core_1.Component({
        selector: 'jhi-navbar-admin-menu-item',
        moduleId: module.id,
        templateUrl: './navbar-admin-menu-item.component.html',
        styleUrls: ['./navbar-admin-menu-item.scss'],
        animations: [
            animations_1.trigger('subMenuStatus', [
                animations_1.state('shown', animations_1.style({ height: '*' })),
                animations_1.state('hidden', animations_1.style({ height: '0' })),
                animations_1.transition('shown<=>hidden', animations_1.animate('200ms'))
            ])
        ]
    })
], NavbarAdminMenuItemComponent);
exports.NavbarAdminMenuItemComponent = NavbarAdminMenuItemComponent;
