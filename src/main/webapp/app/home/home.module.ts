import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {DevizionSharedModule} from "../shared";

import {HOME_ROUTE, HomeComponent} from "./";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdIconModule, MdTabsModule, MdTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PortfolioModule} from "../portfolio/portfolio.module";
import {AboutUsComponent} from "./about-us-component/about-us.component";
import {AgmCoreModule} from "@agm/core";
import {LampsComponent} from "./lapm-component/lamps.component";
import {LampComponent} from "./lapm-component/lamp/lamp.component";
import {NavbarModule} from "../layouts/navbar/navbar.module";
import {SpinnerModule} from "../spinner/spinner.module";
import {DevizionServicesModule} from "./services-component/services.module";
import {SliderComponent} from "./slider/slider.component";
import {DevizionSlidePageModule} from "../entities/slide-page/slide-page.module";


@NgModule({
    imports: [
        DevizionSharedModule,
        BrowserAnimationsModule,
        SpinnerModule,
        MdButtonModule,
        MdIconModule,
        MdTooltipModule,
        PortfolioModule,
        MdTabsModule,
        CommonModule,
        DevizionSlidePageModule,
        NavbarModule,
        FlexLayoutModule,
        DevizionServicesModule,
        RouterModule.forRoot([HOME_ROUTE], {useHash: true}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB8zBoprWQ7ce1BmFYBmqyErY0rrueQxPw'
        })
    ],
    declarations: [
        HomeComponent,
        AboutUsComponent,
        LampsComponent,
        LampComponent,
        SliderComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionHomeModule {
}
