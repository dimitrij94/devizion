import {NgModule} from "@angular/core";
import {ShuffleCardsRowComponent} from "./shuffle-row/shuffle-cards-row.component";
import {AnimatedCardComponent} from "./shuffle-row/animated-card.component";
import {ServiceCardComponent} from "./service-card/service-card.component";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DevizionSharedModule} from "../../shared/shared.module";
import {MdCardModule, MdTooltipModule} from "@angular/material";
import {RouterModule} from "@angular/router";
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdTooltipModule,
        FlexLayoutModule,
        DevizionSharedModule,
        MdCardModule,
    ],
    exports: [
        ShuffleCardsRowComponent,
        ServiceCardComponent
    ],
    declarations: [
        ShuffleCardsRowComponent,
        AnimatedCardComponent,
        ServiceCardComponent
    ]
})
export class DevizionServicesModule {

}
