import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product/product.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'jhi-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.styles.scss'],
    animations: [
        trigger('serviceHover', [

            state('hovered', style({
                'boxShadow': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                'transform': 'translateY(-0.8rem) scale(1)',
            })),
            state('inactive', style({
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                transform: 'translateY(0rem) scale(1)'
            })),
            state('active', style({
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                transform: 'translateY(0rem) scale(1.08)'
            })),
            transition('hovered <=> active', [
                animate('150ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
            ]),
            transition('hovered <=> inactive', [
                animate('275ms')
            ])
        ])
    ]
})
export class ServiceCardComponent implements OnInit {
    @Input() service: Product;
    serviceActive = 'inactive';

    disableService() {
        this.serviceActive = 'inactive';
    }

    serviceClicked() {
        this.serviceActive = 'active';
    }

    activateService() {
        this.serviceActive = 'hovered';
    }

    constructor() {
    }

    ngOnInit() {
    }

}
