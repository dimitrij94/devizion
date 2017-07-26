import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MySidenavComponent} from "./my-sidenav/my-sidenav.component";
import {MdSidenavModule} from "@angular/material";
import {FooterModule} from "../../layouts/footer/footer.module";
import {NavbarModule} from "../../layouts/navbar/navbar.module";
import {MySidenavWrapperService} from "./my-sidenav-wrapper.service";

@NgModule({
    imports: [
        CommonModule,
        FooterModule,
        NavbarModule,
        MdSidenavModule
    ],
    declarations: [MySidenavComponent],
    exports: [MySidenavComponent],
    providers: [MySidenavWrapperService]
})
export class MySidenavWrapperModule {
}
