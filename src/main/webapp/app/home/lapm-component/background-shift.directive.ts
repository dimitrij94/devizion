import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";
/**
 * Created by Dmitrij on 14.05.2017.
 */
@Directive({
    selector: '[backgroundShift]',
})
export class BackgroundShiftDirective implements OnChanges {
    @Input('backgroundShift')
    position: Array<number>;

    constructor(private el: ElementRef) {
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.el.nativeElement.style.left = this.position[0] + 'px';
        this.el.nativeElement.style.top = this.position[1] + 'px';
        this.el.nativeElement.style.transform = 'rotateY(' + this.position[2] + 'deg)';
    }
}
