import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../shared";

import {HOME_ROUTE, HomeComponent} from "./";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdCardModule, MdTabsModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PortfolioModule} from "../portfolio/portfolio.module";
import {ServiceCardComponent} from "./services-component/service-card/service-card.component";
import {AboutUsComponent} from "./about-us-component/about-us.component";
import {AgmCoreModule} from "angular2-google-maps/core";
import {LampsComponent} from "./lapm-component/lamps.component";
import {BackgroundShiftDirective} from "./lapm-component/background-shift.directive";
import {LampComponent} from "./lapm-component/lamp/lamp.component";
import {NavbarModule} from "../layouts/navbar/navbar.module";
import {ShuffleCardsRowComponent} from "./services-component/shuffle-row/shuffle-cards-row.component";
import {AnimatedCardComponent} from "./services-component/shuffle-row/animated-card.component";


@NgModule({
    imports: [
        DevizionSharedModule,
        BrowserAnimationsModule,
        MdCardModule,
        PortfolioModule,
        MdTabsModule,
        CommonModule,
        NavbarModule,
        FlexLayoutModule,
        RouterModule.forRoot([HOME_ROUTE], {useHash: true}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB8zBoprWQ7ce1BmFYBmqyErY0rrueQxPw'
        })
    ],
    declarations: [
        HomeComponent,
        ServiceCardComponent,
        ShuffleCardsRowComponent,
        AnimatedCardComponent,
        AboutUsComponent,
        LampsComponent,
        LampComponent,
        BackgroundShiftDirective
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionHomeModule {
}
