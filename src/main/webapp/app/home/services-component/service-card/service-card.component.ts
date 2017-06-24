import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Product} from "../../../entities/product/product.model";
import {Observable} from "rxjs";

@Component({
    selector: 'jhi-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.styles.scss'],
    animations: [
        trigger('serviceHover', [

            state('hovered', style({
                'filter': 'drop-shadow(0 21px 16px rgba(0, 0, 0, .18))',
                'transform': 'translateY(-0.8rem)',
            })),
            state('inactive', style({
                'filter': 'drop-shadow(0 1px 1px rgba(0, 0, 0, .27))',
                transform: 'translateY(0rem)'
            })),
            transition('hovered <=> inactive', [
                animate('275ms')
            ])
        ])
    ]
})
export class ServiceCardComponent {
    
    @Input()
    service:Product;

    serviceActive = 'inactive';

    disableService() {
        this.serviceActive = 'inactive';
    }

    activateService() {
        this.serviceActive = 'hovered';
    }

    constructor() {
    }


    /*
     * putCardUpfront() {
     let classList = this.cardsRef.nativeElement.classList;
     classList.removeClass('animated');
     classList.removeClass('last');
     classList.addClass('first');
     this.cardsRef.nativeElement.style.left = -50 + '%';
     classList.addClass('animated');
     this.placeholderPosition = upfront;
     this.isAPlaceholderCard = true;
     }

     putCardAtEnd() {
     let classList = this.cardsRef.nativeElement.classList;
     classList.removeClass('animated');
     classList.removeClass('first');
     classList.addClass('last');
     classList.addClass('animated');
     this.placeholderPosition = endPosition;
     this.isAPlaceholderCard = true;
     }*/
}
