import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DevizionSharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MobileNavbarComponent} from "./mobile-navbar/mobile-navbar.component";
import {NavbarService} from "./navbar.service";
import {HomePageNavbarComponent} from "./home-page-navbar/home-page-navbar.component";
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        DevizionSharedModule,
        RouterModule
    ],
    providers: [NavbarService],
    exports: [NavbarComponent, MobileNavbarComponent],
    declarations: [NavbarComponent, MobileNavbarComponent, HomePageNavbarComponent]
})
export class NavbarModule {

}
