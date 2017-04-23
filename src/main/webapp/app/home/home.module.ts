import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevizionSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {LampsComponent} from './lapm-component/lamps.component';
import {CommonModule} from '@angular/common';
import {LampParallaxJSComponent} from './lamp-component-paralaxjs/lamp-parallaxjs.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdCardModule, MdCoreModule, MdTabsModule, MdIconModule, MdIconRegistry} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceCardComponent } from './service-card/service-card.component';
import { PortfolioComponent } from './portfolio/portfolio.component';


@NgModule({
    imports: [
        DevizionSharedModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdTabsModule,
        CommonModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true }),
        FlexLayoutModule,
    ],
    declarations: [
        HomeComponent,
        LampsComponent,
        LampParallaxJSComponent,
        ServiceCardComponent,
        PortfolioComponent
    ],
    entryComponents: [

    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevizionHomeModule {}
