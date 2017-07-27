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
import {ErrorComponent, JhiMainComponent, LayoutRoutingModule, ProfileService} from "./layouts";
import {customHttpProvider} from "./blocks/interceptor/http.provider";
import {PaginationConfig} from "./blocks/config/uib-pagination.config";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdButtonModule, MdDialogModule, MdIconModule, MdMenuModule, MdSidenavModule} from "@angular/material";
import {NavbarModule} from "./layouts/navbar/navbar.module";
import "hammerjs";
import {ContactsDialogComponent} from "./layouts/contacts-dialog/contacts-dialog.component";
import {Response} from "@angular/http";

declare var require: WebpackRequire;
declare var $: any;

export interface GenericResponse<T> extends Response {
    json(): T;
}
interface WebpackRequireEnsureCallback {
    (req: WebpackRequire): void
}

interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: WebpackRequireEnsureCallback, chunkName?: string): void;
    context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}
// Opera 8.0+
@NgModule({
    imports: [
        MdSidenavModule,
        NavbarModule,
        MdButtonModule,
        MdDialogModule,
        MdMenuModule,
        MdIconModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        NgbModule.forRoot(),
        DevizionSharedModule,
        DevizionHomeModule,
        DevizionAdminModule,
        DevizionAccountModule,
        DevizionEntityModule
    ],
    declarations: [
        ContactsDialogComponent,
        JhiMainComponent,
        ErrorComponent
    ],
    entryComponents: [ContactsDialogComponent],
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
