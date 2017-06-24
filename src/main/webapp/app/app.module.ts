import "./vendor.ts";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Ng2Webstorage} from "ng2-webstorage";

import {DevizionSharedModule, UserRouteAccessService} from "./shared";
import {DevizionHomeModule} from "./home/home.module";
import {DevizionAdminModule} from "./admin/admin.module";
import {DevizionAccountModule} from "./account/account.module";
import {DevizionEntityModule} from "./entities/entity.module";
import {FlexLayoutModule} from "@angular/flex-layout";

import {
    ActiveMenuDirective,
    ErrorComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarAdminMenuItemComponent,
    ProfileService
} from "./layouts";
import {customHttpProvider} from "./blocks/interceptor/http.provider";
import {PaginationConfig} from "./blocks/config/uib-pagination.config";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdListModule, MdSidenavModule} from "@angular/material";
import {NavbarModule} from "./layouts/navbar/navbar.module";

declare var require: WebpackRequire;
declare var $: any;
@NgModule({
    imports: [
        MdSidenavModule,
        NavbarModule,
        MdListModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        NgbModule.forRoot(),
        FlexLayoutModule,
        DevizionSharedModule,
        DevizionHomeModule,
        DevizionAdminModule,
        DevizionAccountModule,
        DevizionEntityModule
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
        ActiveMenuDirective,
        NavbarAdminMenuItemComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class DevizionAppModule {
}
