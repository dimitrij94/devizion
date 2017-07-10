import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlidePageComponent} from "./slide-page/slide-page.component";
import {DevizionSharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        DevizionSharedModule
    ],
    declarations: [SlidePageComponent]
})
export class SlidePageModule {

}
