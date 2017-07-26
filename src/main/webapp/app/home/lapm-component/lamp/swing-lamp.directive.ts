/**
 * Created by Dmitrij on 16.05.2017.
 */
import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";
const minAngle = 4;
@Directive({
    selector: '[swingLamp]'
})
export class SwingDirective implements OnChanges {
    @Input('swingLamp')
    angle: number;

    constructor(private el: ElementRef) {

    }


    ngOnChanges(changes: SimpleChanges): void {
        let oldAngle = changes['angle'].previousValue;
        if (oldAngle <= minAngle)
            this.el.nativeElement.style.transform = 'rotate(' + changes['angle'].currentValue + 'deg)';
    }
}
