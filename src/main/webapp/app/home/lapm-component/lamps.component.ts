import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Observable, Subject, Subscription} from "rxjs/Rx";
import "rxjs/add/operator/switchMap";
import {MoveSubscriptionDTO} from "./lamp/lamp.component";

import {animate, state, style, transition, trigger} from "@angular/animations";
const backgroundWallWidth = 2900;
const backgroundWallHeight = 1409;
const backgroundWallX = 0.224532;
const backgroundWallY = 0.1545454;
const mrefreshinterval = 40; // update display every imageX ms to measure the mouse speed
const mouseMinSpeed = 100;//ms minimum mouse speed to trigger the swinging animation
export const maxHiddenScreenTilt = 17; //absolute value of maximum rotation of the hidden screen
const perspective = 1000;
const windowBgWidth = 3325;
const windowBgHeight = 1100;
const wallWindowWidth = 576;
const wallWidth = 1749;
const cubeSideSize = 26.1335;

const releasedPushed = 1000;
const pushedReleased = 250;
const pushedClicked = 250;
const clickedReleased = 250;
export const scrollMaxDuration = 2000;
export const scrollElasticX = 1.5;
interface LampDto {
    distance: number;
    dumpingCoef: number;
}


@Component({
    selector: 'lamps',
    templateUrl: './lamps.component.html',
    moduleId: module.id,
    styleUrls: ['./lamp.component.scss'],
    animations: [
        trigger('pushCube', [
            state('clicked', style({transform: 'translateZ(' + -cubeSideSize + 'vw)'})),
            state('pushed', style({transform: 'translateZ(' + -cubeSideSize / 2 + 'vw)'})),
            state('released', style({transform: 'translateZ(' + 0 + 'vw)'})),
            transition('released => pushed', animate(releasedPushed + 'ms linear')),
            transition('pushed => released', animate(pushedReleased + 'ms ease-out')),
            transition('pushed => clicked', animate(pushedClicked + 'ms ease-out')),
            transition('clicked => released', animate(clickedReleased + 'ms cubic-bezier(0.250, 0.250, 0.500, 1.650)'))
        ]),

    ]
})
export class LampsComponent implements OnInit, OnDestroy {
    mouseMoveSubscription: Subscription;
    mouseTravelDistaceEvaluator: number;

    lastMousePosition: { x: number, y: number };

    @ViewChild('stage')
    stageView: ElementRef;

    @ViewChild('hiddenScreen')
    hiddenScreenElRef: ElementRef;

    @ViewChild('windowBgEl')
    windowBgElRef: ElementRef;

    @ViewChild('cubeWrapperEl')
    cubeWrapperEl: ElementRef;

    // incrementer = 0.1;

    cubeState = 'released';

    //original screen size
    screenW: number = window.innerWidth;
    screenH: number = this.screenW * (backgroundWallHeight / backgroundWallWidth);

    disableEnableComponent = new Subject<boolean>();

    /* Divided by two! */
    screenProjectionWidthX = ((this.screenW / 2) * Math.cos(maxHiddenScreenTilt * (Math.PI / 180)));
    screenViewPointTiltMarginX = (this.screenW / 2 - this.screenProjectionWidthX) * 18;

    //screen that moves in background
    hiddenScreenW: number = this.screenW + this.screenViewPointTiltMarginX;

    //change the hidden screen imageHeight accourding to imageWidth preserving the imageHeight to imageWidth ratio
    hiddenScreenH: number = (backgroundWallHeight * this.hiddenScreenW) / backgroundWallWidth;

    // hiddenScreenHalfH = this.hiddenScreenH / 2;
    // hiddenScreenHalfW = this.hiddenScreenW / 2;

    //hiddenScreenProjectionWidthDeltaY = this.hiddenScreenHalfH * Math.sin(maxHiddenScreenTilt * (Math.PI / 180));

    //perPxlChangeY: number = ((this.hiddenScreenH - this.screenH) / this.screenH) / 2;
    perPxlRotation = (maxHiddenScreenTilt / this.screenW)*2;

    //deltaHeight = this.calculateTrapecyDeltaHeight(0);

    //backgroundPositionX = -((this.hiddenScreenW) - this.screenW) / 2;
    //backgroundPositionY = -((this.hiddenScreenH) - this.screenH) / 2;
    hiddenScreenTilt = 0;


    windowBgW = this.hiddenScreenW + this.screenViewPointTiltMarginX;
    windowBgH = (this.windowBgW * windowBgHeight) / windowBgWidth;
    windowBgPerPxlChange = (this.windowBgW / 16) / this.screenW;
    windowBgX: number = -(this.windowBgW - this.screenW) / 2;
    //windowBgMaxX = 0;
    //windowBgMinX = -(this.windowBgW - this.hiddenScreenW);
    //backgroundMinY: number = -((this.hiddenScreenH - this.hiddenScreenProjectionWidthDeltaY) - this.screenH);

    /* MEASURING MOUSE SPEED VARs*/
    mouseSpeedSubject: Subject<MoveSubscriptionDTO> = new Subject();

    lastmousex = -1;
    lastmousetime;
    mousetravel = 0;
    displacemant = 0;
    private mouseMove: Observable<MouseEvent>;
    private speedSubscription: Subscription;
    private windowBgStyle: { left: string } = {left: "0px"};
    private hiddenScreenStyle: { transform: string } = {transform: 'rotate(0deg)'};
    private cubeWrapperElStyle: any = {perspectiveOrigin: '50% center'};
    private disableEnableComponentSubscription: Subscription;

    /* MEASURING MOUSE SPEED VARs*/
    constructor() {

    }

    leftLineLamps: Array<LampDto> = [
        {
            distance: 3,
            dumpingCoef: 0.3
        }, {
            distance: 6,
            dumpingCoef: 0.6
        }, {
            distance: 9,
            dumpingCoef: 0.9
        }

    ];
    rightLineLamps: Array<LampDto> = [
        {
            distance: 9,
            dumpingCoef: 0.5
        }, {
            distance: 6,
            dumpingCoef: 0.4
        }, {
            distance: 3,
            dumpingCoef: 0.3
        }
    ];

    ngOnInit(): void {
        /* let [hypotenuse, angle] = this.getLeftLampsLineHiphothenuzeAndAngle();
         this.leftLineLamps.forEach((lamp: LampDto) => {
         let hSegmentLength = hypotenuse - (hypotenuse / lamp.distance);
         lamp.top = Math.sin(angle) * hSegmentLength;
         lamp.left = Math.cos(angle) * hSegmentLength;
         });
         */
        this.mouseMove = Observable.fromEvent(this.stageView.nativeElement, 'mousemove');

        this.mouseMoveSubscription = this.mouseMove.map(this.getBackgroundShift.bind(this))
            .subscribe(this.animateBackgroundShift.bind(this));

        //estimate mouse speed
        this.startMouseSpeedometr();

        this.disableEnableComponentSubscription = this.disableEnableComponent.subscribe((enable) => {
            if (enable) this.startMouseSpeedometr();
            else this.stopMouseSpeedometr();
        });
    }


    ngOnDestroy(): void {
        this.mouseMoveSubscription && this.mouseMoveSubscription.unsubscribe();
        this.speedSubscription && this.speedSubscription.unsubscribe();
        this.disableEnableComponentSubscription && this.disableEnableComponentSubscription.unsubscribe();
    }

    startMouseSpeedometr() {
        this.speedSubscription = this.mouseMove.subscribe(this.evaluateMouseTravelDistanse.bind(this));
        this.mouseTravelDistaceEvaluator = setInterval(this.mdraw.bind(this), mrefreshinterval);
    }

    stopMouseSpeedometr() {
        this.speedSubscription.unsubscribe();
        window.clearInterval(this.mouseTravelDistaceEvaluator);
    }

    getLeftLampsLineHiphothenuzeAndAngle() {
        //0.196 stands for the percent value of the imageWidth of the original line between wall and ceiling
        // not accounting for margin to the line itself
        let leftLampsLineWidth = this.hiddenScreenW * 0.196;

        //0.181 stands for the percent value of the imageHeight of the original line between wall and ceiling
        // not accounting for margin to the line itself
        let leftLampLineHeight = this.hiddenScreenH * 0.181;

        let hipothenuze = Math.sqrt(leftLampsLineWidth ** 2 + leftLampLineHeight ** 2);
        let lineToCeilingAngle = Math.atan(leftLampLineHeight / leftLampsLineWidth);
        return [hipothenuze, lineToCeilingAngle];
    }


    radians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    assignMousePosition(mouseEvent: MouseEvent) {
        this.lastMousePosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
        };
    }

    clearLastMousePosition() {
        this.lastMousePosition = undefined;
    }

    evaluateMouseTravelDistanse(e: MouseEvent) {
        let mousex = e.pageX;
        if (this.lastmousex > -1) {
            this.displacemant += mousex - this.lastmousex;
            this.mousetravel += Math.abs(mousex - this.lastmousex);
        }
        this.lastmousex = mousex;
    }

    mdraw() {
        let md = new Date();
        let timenow = md.getTime();
        if (this.lastmousetime && this.lastmousetime != timenow) {
            let pps = Math.round(this.mousetravel / (timenow - this.lastmousetime) * 1000);
            //minimum mouse speed to
            if (pps > mouseMinSpeed)
                this.mouseSpeedSubject.next({directionX: this.displacemant, mouseSpeed: pps});
            this.mousetravel = 0;
        }
        this.lastmousetime = timenow;
    }

    cubePressed() {
        this.cubeState = 'clicked';
        let self = this;
        let finishPageScroll = this.screenH + 20;
        let animationStart = performance.now();

        setTimeout(() => {
            self.cubeState = 'released';
            setTimeout(() => {
                window.requestAnimationFrame(function animateScrollStep(time) {
                    let animationPrcnt = (time - animationStart) / scrollMaxDuration;
                    let increment = self.makeEaseOut(self.bowEaseIn, scrollElasticX)(animationPrcnt);
                    window.scrollTo(0, increment * finishPageScroll);
                    if (animationPrcnt < 1) window.requestAnimationFrame(animateScrollStep);
                })
            }, clickedReleased);
        }, pushedClicked)
    }

    setPerspectiveOrigin(style: string) {
        let val: any = {};
        val.webkitPerspectiveOrigin = style;
        val.mozPerspectiveOrigin = style;
        val.perspectiveOrigin = style;
        this.cubeWrapperElStyle = val;
    }

    bowEaseIn(timeFraction, x) {
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
    }

    makeEaseOut(timing, x?) {
        return function (timeFraction) {
            return 1 - timing(1 - timeFraction, x);
        }
    }


    changeHiddenScreenPosition() {
        this.windowBgStyle.left = this.windowBgX + 'px';
        this.hiddenScreenStyle.transform = 'rotateY(' + this.hiddenScreenTilt + 'deg)';
    }

    getBackgroundShift(mouseEvent: MouseEvent) {
        if (this.lastMousePosition == null) {
            this.lastMousePosition = {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            };
            return;
        }
        let deltaX = mouseEvent.clientX - this.lastMousePosition.x;
        let deltaY = mouseEvent.clientY - this.lastMousePosition.y;

        this.lastMousePosition.x = mouseEvent.clientX;
        this.lastMousePosition.y = mouseEvent.clientY;

        return {deltaX: deltaX, deltaY: deltaY};
    }


    animateBackgroundShift(shift: { deltaX: number, deltaY: number }) {
        let rotationChange = this.perPxlRotation * shift.deltaX;
        let rotation = this.hiddenScreenTilt + rotationChange;
        if (rotation <= maxHiddenScreenTilt && rotation >= (-maxHiddenScreenTilt)) {
            //this.deltaHeight = this.calculateTrapecyDeltaHeight(rotation);
            window.requestAnimationFrame((function () {
                this.hiddenScreenTilt = rotation;
                let rotationPrcnt = (rotation / maxHiddenScreenTilt) * 100;
                this.setPerspectiveOrigin(50 - (rotationPrcnt / 4) + '% center');
                let changeX = this.windowBgPerPxlChange * shift.deltaX;
                this.windowBgX = this.windowBgX + changeX;
                this.changeHiddenScreenPosition();
            }).bind(this));
        }
    }


    /*
     calculateTrapecyDeltaHeight(hiddenScreenTilt: number) {
     let A = Math.sqrt((perspective ** 2 + (this.hiddenScreenHalfW) ** 2)); //perspective piramid side imageHeight
     let B = Math.sqrt(A ** 2 + (this.hiddenScreenHalfH) ** 2); //perspective piramid edge
     //perspective piramid side part from base to slice created by tilted hidden screen
     let x1 = this.hiddenScreenHalfH ** 2 + this.hiddenScreenHalfW ** 2 - 2 * this.hiddenScreenHalfH * this.hiddenScreenHalfW * Math.cos(hiddenScreenTilt);
     //angle beatween piramid foundation and it`s edge
     let cosAlpha = this.hiddenScreenHalfH / B;
     //difference between the shrinked part of the trapecy after rotation and normal rectangle of the hidden screen
     return cosAlpha * x1;
     }
     */
}
