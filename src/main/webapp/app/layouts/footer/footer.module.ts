import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer.component";
import {DevizionSharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        FlexLayoutModule,
        DevizionSharedModule,
        CommonModule
    ],
    exports: [FooterComponent],
    declarations: [FooterComponent]
})
export class FooterModule {
}
