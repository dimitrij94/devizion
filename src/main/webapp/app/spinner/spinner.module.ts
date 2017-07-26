import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {InterRoutesSpinner} from "./inter-routes-spinner.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [InterRoutesSpinner],
    exports: [InterRoutesSpinner]
})
export class SpinnerModule {
}
