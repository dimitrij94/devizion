import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {DatePipe} from "@angular/common";

import {CookieService} from "angular2-cookie/services/cookies.service";
import {
    AccountService,
    AuthServerProvider,
    AuthService,
    CSRFService,
    DevizionSharedCommonModule,
    DevizionSharedLibsModule,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    UserService
} from "./";
import {SidenavService} from "./sidenav.service";
import {MyImageService} from "./image/image.service";

@NgModule({
    imports: [

        DevizionSharedLibsModule,
        DevizionSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
    ],
    providers: [
        CookieService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        AuthService,
        UserService,
        DatePipe,
        SidenavService,
        MyImageService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        DevizionSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class DevizionSharedModule {
}
