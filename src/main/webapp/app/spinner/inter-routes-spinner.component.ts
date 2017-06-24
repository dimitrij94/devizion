/**
 * Created by Dmitrij on 07.05.2017.
 */
import {Component} from "@angular/core";

const spinAnimationDuration = 5000;
const logoTransitionDuration = 2000;
const logoShownDuration = 2000;

@Component({
    selector: 'inter-routes-spinner',
    templateUrl: './inter-route-spinner.component.html',
    styleUrls: ['./inter-routes-spinner.component.scss'],
    moduleId: module.id
})
export class InterRoutesSpinner  {
/*
    animationCycleIntervalId: any;

    animationPartTimeoutId: any;

    dotsStatus = 'dot';

    logoContainerStatus = 'shrinked';

    @ViewChild('dotOne')
    dotOne: ElementRef;

    @ViewChild('dotTwo')
    dotTwo: ElementRef;

    @ViewChild('dotThree')
    dotThree: ElementRef;

    dots: ElementRef[] = [];


    constructor() {
    }
    ngOnDestroy(): void {
        if (this.animationCycleIntervalId)
            clearInterval(this.animationCycleIntervalId);
        if (this.animationPartTimeoutId)
            clearTimeout(this.animationPartTimeoutId);
    }


    ngAfterViewInit(): void {
        this.dots.push(this.dotOne);
        this.dots.push(this.dotTwo);
        this.dots.push(this.dotThree);
        this.animationPartTimeoutId = setTimeout(this.transitionToLogo.bind(this), 1000);
    }
    stopSpinningAnimation() {
        this.dots.forEach((dot: ElementRef) => {
            dot.nativeElement.classList.remove("animated");
            void dot.nativeElement.offsetWidth;
        })
    }

    restartSpinningAnimation() {
        this.dots.forEach((dot: ElementRef) => {
            dot.nativeElement.classList.remove("animated");
            void dot.nativeElement.offsetWidth;
            dot.nativeElement.classList.add("animated");
        });
        this.animationPartTimeoutId = setTimeout(this.transitionToLogo.bind(this), spinAnimationDuration);
    }

    transitionToLogo() {
        this.stopSpinningAnimation();
        this.dotsStatus = 'logoPart';
        this.logoContainerStatus = 'expanded';
        this.animationPartTimeoutId = setTimeout(this.transitionToSpinner.bind(this), logoTransitionDuration + logoShownDuration);
    }


    //transform logo to dots and start animation
    transitionToSpinner() {
        this.dotsStatus = 'dot';
        this.logoContainerStatus = 'shrinked';
        //after logo turned back into dots start spinning animation
        this.animationPartTimeoutId = setTimeout(this.restartSpinningAnimation.bind(this), logoTransitionDuration);
    }
*/
}
