/**
 * Created by Dmitrij on 14.05.2017.
 */
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Observable, Subscription} from "rxjs";


export interface MoveSubscriptionDTO {
    directionX: number;
    mouseSpeed: number;
}

const maxMouseSpeed = 5000;//px per second
const maxAngle = 30;
const maxParallaxMovement = 40;
@Component({
    selector: 'lamp',
    moduleId: module.id,
    template: `
        <div class="wrapper" #lampContainerWrapperEl>
            <div class="lamp-wrapper" #lampWrapperElRef [ngStyle]="mainAngleStyle">
                <div class="cable" #cableElRef></div>
                <div class="lamp" #lampBolbElRef [ngStyle]="secondaryAngleStyle"></div>
            </div>
        </div>`,
    styleUrls: ['./lamp.component.scss']
})
export class LampComponent implements OnInit {
    amplitudeAnimation: Subscription;
    mainAngle: number = 0;
    amplitude: number = 0;
    absoluteAmplitude = 0;
    /* direction defines the momentum of the pendulum the true direction is when the absolute value pendulum rotation
     * increases and false when it decreases*/
    pendulumDirection = 1;

    @Input('distanceToLampRem')
    distanceRem: number;

    @Input('mouseMoveObservable')
    mouseMoveObservable: Observable<MoveSubscriptionDTO>;

    @Input('enableLampSubscription')
    enableLampSubscription: Observable<boolean>;

    @Input('dumpingCoefficient')
    dumpingCoefficient = 0.3;

    @ViewChild('lampWrapperElRef')
    lampWrapperElRef: ElementRef;

    @ViewChild('lampBolbElRef')
    lampBolbElRef: ElementRef;

    @ViewChild('lampContainerWrapperEl')
    lampContainerWrapperEl: ElementRef;

    animationFrame: any;

    T: number = 3;    //Period in seconds

    private animationSubscription: Subscription;

    //perDegreeParallaxChageX: number;
    runSwingAnimation: boolean = true;
    mainAngleStyle: { transform: string } = {transform: 'rotate(0deg)'};
    secondaryAngleStyle: { transform: string } = {transform: 'rotate(0deg)'};

    constructor(private elRef: ElementRef) {
        // window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    }


    ngOnInit(): void {
        //asign lamp base size
        //this.elRef.nativeElement.style.fontSize = 48 / (this.distanceRem * (1 + Math.cos(this.radians(24.221)) )) + 2 + 'rem';
        this.elRef.nativeElement.style.fontSize = (window.innerWidth / 20) / (this.distanceRem) + 2 + 'vw';
        //compute font size in pixels and convert them to meters, divided by two as the half of the circle will be hidden;
        //let cableLengthMeters = this.pxlsToMeters(this.letGetComputedFontSize(this.elRef.nativeElement));

        //this.T = 3 //2 * Math.PI * Math.sqrt((cableLengthMeters / 100) / 0.98);

        //this.lampWrapperElRef.nativeElement.style.transitionDuration = 2 * Math.PI * Math.sqrt(cableLengthMeters);

        this.amplitudeAnimation = this.mouseMoveObservable.subscribe(this.animateAmplitudeChange.bind(this));

        this.subscribeForAnimation();

        this.enableLampSubscription.subscribe((enable: boolean) => {
            if (enable) this.enableLamp();
            else this.disableLamp();
        });
    }

    enableLamp() {
        this.runSwingAnimation = true;
        if (!this.amplitudeAnimation)
            this.amplitudeAnimation = this.mouseMoveObservable.subscribe(this.animateAmplitudeChange.bind(this));
        if (!this.animationSubscription)
            this.subscribeForAnimation();
    }

    disableLamp() {
        this.runSwingAnimation = false;
        if (this.amplitudeAnimation) {
            this.amplitudeAnimation.unsubscribe();
            this.amplitudeAnimation = undefined;
        }

        if (this.animationSubscription) {
            this.animationSubscription.unsubscribe();
            this.animationSubscription = undefined;
        }
    }

    subscribeForAnimation() {
        this.animationSubscription = this.mouseMoveObservable
            .subscribe(this.startSwinging.bind(this));
    }

    changeAmplitudeInstantly(dto: MoveSubscriptionDTO) {
        let incrementer = this.calculateAmplitude(dto);
        let newAmplitude = incrementer + this.amplitude;

    }

    animateAmplitudeChange(dto: MoveSubscriptionDTO) {
        this.amplitudeAnimation.unsubscribe();
        let incrementer = this.calculateAmplitude(dto);
        let baseAmplitude = this.amplitude;
        let newAmplitude = incrementer + this.amplitude;
        newAmplitude = Math.abs(newAmplitude) > maxAngle ? maxAngle : newAmplitude;
        this.absoluteAmplitude = Math.abs(newAmplitude);
        let delta = newAmplitude - baseAmplitude;
        let animationTime = (this.T * 1000) / 4;
        let animationStart = performance.now();
        //change the amplitude to the new value in one quarter of the Period
        let self = this;
        let animationFrame;
        this.animationFrame = window.requestAnimationFrame(function amplitudeAnimationStep(time) {
            let animationPrcnt = (time - animationStart) / animationTime;
            if (animationPrcnt < 1) {
                self.amplitude = baseAmplitude + (delta * animationPrcnt);
                animationFrame = window.requestAnimationFrame(amplitudeAnimationStep);
            }
            else {
                window.cancelAnimationFrame(animationFrame);
                self.amplitudeAnimation = self.mouseMoveObservable.subscribe(self.animateAmplitudeChange.bind(self));
            }
        });
    }


    calculateAmplitude(dto: MoveSubscriptionDTO) {
        //let mouseDirection = dto.directionX >= 0 ? 1 : -1;
        let swingDirection = this.mainAngle >= 0 ? 1 : -1;
        //let direction:boolean = !(mouseDirection || swingDirection)
        let mouseSpeedPrcnt = dto.mouseSpeed >= maxMouseSpeed ? 1 : dto.mouseSpeed / maxMouseSpeed;
        return this.pendulumDirection * swingDirection * mouseSpeedPrcnt * maxAngle;
    }

    startSwinging(dto: MoveSubscriptionDTO) {
        this.animationSubscription.unsubscribe();
        //let lightBolbPhase = 1;
        //let lightBolbAmplitude = this.amplitude / 1.3;
        //let lightBolbPeriod = this.T / 2;

        this.runSwingAnimation = true;
        let lastAmplitude = this.amplitude;
        let self = this;
        let animationStart = performance.now();

        let lastAmplitudeChangeTime = animationStart;
        let dumpingDurationPerAngle = 40000 / maxAngle;
        let dumpingDuration;
        let checkTime = (this.T * 1000) / 4;
        let direction = dto.directionX >= 0 ? 1 : -1;
        let animationFrame;

        animationFrame = window.requestAnimationFrame(function animateSwingFrame(animationTime) {
            if (self.amplitude !== 0) {
                if (self.amplitude != lastAmplitude) {
                    lastAmplitudeChangeTime = animationTime;
                    lastAmplitude = self.amplitude;
                    dumpingDuration = dumpingDurationPerAngle * self.absoluteAmplitude;
                }
                let dumpingTime = animationTime - lastAmplitudeChangeTime;
                let dumpingPrcnt = dumpingTime / dumpingDuration;

                if (dumpingPrcnt >= 1) {
                    window.cancelAnimationFrame(animationFrame);
                    self.runSwingAnimation = false;
                    self.subscribeForAnimation();
                    return;
                }

                let animationTimeSec = (animationTime - animationStart) / 1000;
                //let dumpingTimeSec = dumpingTime / 1000;

                let dumpingIncrement = self.dumpingForseEasing(dumpingPrcnt);

                //self.getDumpingForse(dumpingTime, self.dumpingCoefficient)

                let angle = self.getAngle(self.amplitude, animationTimeSec, self.T, direction) * dumpingIncrement;
                self.mainAngleStyle.transform = 'rotate(' + angle + 'deg)';

                //let lightBolbAngle = self.getAngle(self.amplitude, animationPrcnt, self.dumpingCoefficient, lightBolbPeriod, lightBolbPhase);
                self.secondaryAngleStyle.transform = 'rotate(' + angle + 'deg)';

                self.mainAngle = angle;
            }
            if (self.runSwingAnimation) animationFrame = window.requestAnimationFrame(animateSwingFrame);
            else {
                self.lampBolbElRef.nativeElement.style.transform = 'rotate(' + 0 + 'deg)';
                window.cancelAnimationFrame(animationFrame);
            }
        });

        //each twenty forth frame recalculate absolute change in angle and if change is to small stop the animation
        setTimeout(function cancelSwingSwitch() {
            let direction = Math.abs(lastAmplitude) - Math.abs(self.mainAngle);
            //lightBolbPhase = lightBolbPhase === 1 ? -1 : 1;
            /*if (Math.abs(direction) < 0.5) {
             self.subscribeForAnimation();
             run = false;
             self.mainAngle = 0;
             self.lampWrapperElRef.nativeElement.style.transform = 'rotate(' + 0 + 'deg)';
             return;
             }*/
            self.pendulumDirection = direction >= 0 ? 1 : -1;
            //lastAmplitude = self.mainAngle;
            setTimeout(cancelSwingSwitch, checkTime);
        }, checkTime);

    }


    dumpingForseEasing(x: number) {
        return (1 - x) ** 2;
    }

    /*
     time should be passed in seconds

     return value is in radians
     */
    getAngle(amplitude: number, time: number, period: number, phase = 1) {
        //convert degrees to radians
        //amplitude = this.radians(amplitude);
        let pendulumPosition = (2 * Math.PI * time ) / period;
        return phase * amplitude * Math.sin((pendulumPosition));
    }


    radians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    degrees(radians: number) {
        return radians * 180 / Math.PI;
    }

    //compute reduction in angle at each swing
    getDumpingForse(time: number, dumpingCoefficient: number): number {
        return Math.exp(-((dumpingCoefficient / 3) * time));

    }

    //get font size in pxls
    letGetComputedFontSize(nativeElement: HTMLElement): number {
        return parseFloat(
            window.getComputedStyle(nativeElement, null).getPropertyValue('font-size')
        );
    }

    pxlsToMeters(val: number) {
        return (val * (2.54 / 96)) / 100;
    }
}
