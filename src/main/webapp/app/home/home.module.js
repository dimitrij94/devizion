"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_1 = require("../shared");
var _1 = require("./");
var lamps_component_1 = require("./lapm-component/lamps.component");
var common_1 = require("@angular/common");
var lamp_parallaxjs_component_1 = require("./lamp-component-paralaxjs/lamp-parallaxjs.component");
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var service_card_component_1 = require("./service-card/service-card.component");
var DevizionHomeModule = (function () {
    function DevizionHomeModule() {
    }
    return DevizionHomeModule;
}());
DevizionHomeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_1.DevizionSharedModule,
            animations_1.BrowserAnimationsModule,
            material_1.MdCardModule,
            material_1.MdTabsModule,
            common_1.CommonModule,
            router_1.RouterModule.forRoot([_1.HOME_ROUTE], { useHash: true }),
            flex_layout_1.FlexLayoutModule
        ],
        declarations: [
            _1.HomeComponent,
            lamps_component_1.LampsComponent,
            lamp_parallaxjs_component_1.LampParallaxJSComponent,
            service_card_component_1.ServiceCardComponent
        ],
        entryComponents: [],
        providers: [],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], DevizionHomeModule);
exports.DevizionHomeModule = DevizionHomeModule;
