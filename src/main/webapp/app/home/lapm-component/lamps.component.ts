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
    perPxlRotation = 0.3; //(maxHiddenScreenTilt / this.screenW)*2;

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
    private cubeWrapperElStyle: any = {};

    private disableEnableComponentSubscription: Subscription;

    rotationLimitLeftRiched = false;
    rotationLimitRightRiched = false;

    /* MEASURING MOUSE SPEED VARs*/
    constructor() {
        this.setPerspectiveOrigin('50% center');
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
        this.mouseMove = Observable.fromEvent(this.stageView.nativeElement, 'mousemove');

        this.mouseMoveSubscription = this.mouseMove
            .subscribe(this.getBackgroundShift.bind(this));

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
            let singleDisplacement = mousex - this.lastmousex;
            this.displacemant += singleDisplacement;
            this.mousetravel += Math.abs(singleDisplacement);
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
                if ((!this.rotationLimitLeftRiched || this.displacemant > 0) && (!this.rotationLimitRightRiched || this.displacemant < 0))
                    this.mouseSpeedSubject.next({directionX: this.displacemant, mouseSpeed: pps});

            this.mousetravel = 0;
            this.displacemant = 0;
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
        this.cubeWrapperElStyle.webkitPerspectiveOrigin = style;
        this.cubeWrapperElStyle.mozPerspectiveOrigin = style;
        this.cubeWrapperElStyle.perspectiveOrigin = style;
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

        this.animateBackgroundShift({deltaX: deltaX, deltaY: deltaY});
    }


    animateBackgroundShift(shift: { deltaX: number, deltaY: number }) {
        let rotationChange = this.perPxlRotation * shift.deltaX;
        let rotation = this.hiddenScreenTilt + rotationChange;

        if (rotation > maxHiddenScreenTilt) {
            this.rotationLimitRightRiched = true;
            return;
        }
        else if (rotation < (-maxHiddenScreenTilt)) {
            this.rotationLimitLeftRiched = true;
            return;
        }
        if (this.rotationLimitRightRiched && rotationChange < 0)
            this.rotationLimitRightRiched = false;

        if (this.rotationLimitLeftRiched && rotationChange > 0)
            this.rotationLimitRightRiched = false;

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
