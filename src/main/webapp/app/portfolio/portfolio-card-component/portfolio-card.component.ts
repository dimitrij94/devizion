import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from "@angular/core";
import {UserOrder} from "../../entities/user-order/user-order.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
/**
 * Created by Dmitrij on 26.04.2017.
 */
@Component({
    selector: 'portfolio-card',
    templateUrl: './portfolio-card.component.html',
    moduleId: module.id,
    styleUrls: ['./portfolio-card.style.scss'],
    animations: [
        trigger('scaleBackgroundImage', [
            state('shown', style({
                transform: 'scale(1.4)'
            })),
            state('hidden', style({
                transform: 'scale(1.0)'
            })),
            transition('shown => hidden', animate('200ms')),
            transition('hidden => shown', animate('2s'))
        ])
    ]
})
export class PortfolioCardComponent implements OnChanges {

    @Input('portfolioEntry')
    portfolioEntry: UserOrder;

    @Input('descStatus')
    descStatus: string;

    @Output('portfolioImageLoaded')
    imageLoadedEventEmitter = new EventEmitter<boolean>();

    @ViewChild('imageEl')
    imageElRef:ElementRef;


    ngOnChanges(changes: SimpleChanges): void {
        let image = new Image();
        image.onload = this.portfolioImageLoaded.bind(this);
        image.src = this.portfolioEntry.cropedUri;
    }

    portfolioImageLoaded($event) {
        this.imageElRef.nativeElement.src = $event.target.src;
        this.imageLoadedEventEmitter.next(true);
    }
}
