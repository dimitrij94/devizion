import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'lamps',
    templateUrl: './lamps.component.html',
    moduleId: module.id,
    styleUrls: ['./lamp.component.scss']
})
export class LampsComponent implements OnInit {

    backgroundPositionX = 0;
    backgroundPositionY = 0;

    lastMousePosition: { x: number, y: number };

    @ViewChild('stage') stageView: ElementRef;
    mouseMove: Observable<MouseEvent>;

    incrementer = 0.1;
    backgroundHeight: number;
    imageOriginalHeight = 1080;
    imageOriginalWidth = 1920;

    //original screen size
    screenW: number;
    screenH: number;

    //screen that moves in background
    hiddenScreenW: number;
    hiddenScreenH: number;

    perPxlChangeX: number;
    perPxlChangeY: number;

    movementInterval: any;

    constructor() {

    }

    clearLastMousePosition() {
        this.lastMousePosition = undefined;
    }

    ngOnInit(): void {
        this.screenW = this.stageView.nativeElement.clientWidth;
        this.screenH = (this.imageOriginalHeight / this.imageOriginalWidth) * this.screenW;

        this.hiddenScreenW = this.screenW * 1.10;
        this.hiddenScreenH = this.screenH * 1.10;

        this.backgroundPositionY = -(this.hiddenScreenH - this.screenH) / 2;
        this.backgroundPositionX = -(this.hiddenScreenW - this.screenW) / 2;

        this.perPxlChangeX = (this.hiddenScreenH - this.screenH) / this.screenH;
        this.perPxlChangeY = (this.hiddenScreenW - this.screenW) / this.screenW;

        //this.mouseMove = Observable.fromEvent(this.stageView.nativeElement, 'mousemove');
        //this.mouseMove.subscribe(this.animateShift.bind(this));
    }

    animateShift(mouseEvent: MouseEvent) {
        if (!this.lastMousePosition) {
            this.lastMousePosition = {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            };
            return;
        }
        let deltaX = this.lastMousePosition.x - mouseEvent.clientX;
        let deltaY = this.lastMousePosition.y - mouseEvent.clientY;

        if (deltaX === 0 && deltaY === 0)return;

        let changeY = this.perPxlChangeY * deltaY;
        let changeX = this.perPxlChangeX * deltaX;

        let desiredPositionX = this.backgroundPositionX + changeX;
        let desiredPositionY = this.backgroundPositionY + changeY;

        let positionReachedY = false;
        let positionReachedX = false;

        let t = 0.1;

        while (!positionReachedY && !positionReachedX) {
            this.changePosition(t, desiredPositionX, desiredPositionY, positionReachedX, positionReachedY);
        }
    }

    stopMovement() {
        clearInterval(this.movementInterval);
    }

    changePosition(t, desiredPositionX, desiredPositionY, positionReachedX, positionReachedY) {
        t += this.incrementer;
        if (t >= 2) throw 'Decrease incrementor or increase the is to big ';

        if (!positionReachedX && ((desiredPositionX >= 0 && this.backgroundPositionX < desiredPositionX) ||
            (desiredPositionX < 0 && this.backgroundPositionX > desiredPositionX)))
            this.backgroundPositionX += t;
        else
            positionReachedX = true;


        if (!positionReachedY && ((desiredPositionY >= 0 && this.backgroundPositionY < desiredPositionY) ||
                (desiredPositionY < 0 && this.backgroundPositionY > desiredPositionY)))
            this.backgroundPositionY += t;
        else
            positionReachedY = true;

    }

    easeOut(t): number {
        return t * (2 - t);
    }
}
