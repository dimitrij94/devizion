import {Component, Input, OnInit} from "@angular/core";
import {DomSlidePage, SlidePage} from "../../entities/slide-page/slide-page.model";
import {SlidePageService} from "../../entities/slide-page/slide-page.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DomSanitizer} from "@angular/platform-browser";
import {Timer} from "../../shared/timer";
import {MdIconRegistry} from "@angular/material";

const shiftDuration = 500;
const timerScrollDellay = 7000;

@Component({
    selector: 'jhi-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
        trigger('shiftSlides', [
            state('forward', style({})),
            state('backward', style({})),

            transition('forward => void', [
                style({transform: 'translateX(0)'}),
                animate(`${shiftDuration}ms ease-in-out`,
                    style({transform: 'translateX(-100%)'})
                )]
            ),

            transition('void => forward', [
                style({transform: 'translateX(100%)'}),
                animate(`${shiftDuration}ms ease-in-out`,
                    style({transform: 'translateX(0)'})
                )]
            ),

            transition('backward => void', [
                style({transform: 'translateX(0)'}),
                animate(`${shiftDuration}ms ease-in-out`,
                    style({transform: 'translateX(100%)'})
                )]
            ),

            transition('void => backward', [
                style({transform: 'translateX(-100%)'}),
                animate(`${shiftDuration}ms ease-in-out`,
                    style({transform: 'translateX(0)'})
                )]
            )


        ])
    ]
})
export class SliderComponent implements OnInit {
    timer: Timer;
    @Input('slidePages')
    slidePages: DomSlidePage[];
    isLoading: boolean = false;
    direction: string;
    activeSlide: DomSlidePage[];
    nextIndex: number;
    position: number = 0;
    isTimerRun = true;

    constructor(private slidePageService: SlidePageService,
                private domSanitizer: DomSanitizer,
                private iconRegistry: MdIconRegistry) {
    }


    ngOnInit() {
        let phoneIconWebpackUrl = require('../../../content/images/icons/ic_clear_black_24px.svg');
        this.iconRegistry.addSvgIcon(
            'clear',
            this.domSanitizer.bypassSecurityTrustResourceUrl(phoneIconWebpackUrl)
        );

        this.slidePageService.parseAllSlidePagePhoto(this.slidePages, 1);
        this.slidePages.forEach((page) => this.domSanitizer.bypassSecurityTrustHtml(page.description));
        let activeSlide = this.slidePages[0];
        this.activeSlide = [activeSlide];
        activeSlide.isActive = true;
        this.timer = new Timer(timerScrollDellay, this.forward.bind(this));
        this.stopTimer();
    }

    stopTimer() {
        if (this.isTimerRun) {
            this.isTimerRun = false;
            this.timer.pause();
        }
    }

    startTimer() {
        if (!this.isTimerRun) {
            this.isTimerRun = true;
            this.timer.resume();
        }
    }

    manual(index: number) {
        if (index == this.position) return;
        this.isLoading = true;
        this.loadNext(index);
    }

    forward() {
        if (this.isLoading) return;
        this.isLoading = true;
        let index = this.position + 1;
        if (index > this.slidePages.length - 1) index = 0;
        this.loadNext(index);
    }

    backward() {
        if (this.isLoading) return;
        this.isLoading = true;
        let index = this.position - 1;
        if (index < 0) index = this.slidePages.length - 1;
        this.loadNext(index);
    }

    loadNext(index: number) {
        this.stopTimer();
        this.timer.remaining = timerScrollDellay;
        this.nextIndex = index;
        let isDirectionForward = index > this.position;
        this.direction = isDirectionForward ? 'forward' : 'backward';
        let nextSlide = new Image();
        nextSlide.onload = this.onNextSlideLoad.bind(this);
        nextSlide.src = this.slidePages[index].croppedPhotoUri;

    }

    private onNextSlideLoad($event: any) {
        this.position = this.nextIndex;
        let nextSlide = this.slidePages[this.nextIndex];
        this.switchControlls(nextSlide);
        this.isLoading = false;
        this.activeSlide.shift();
        this.activeSlide.push(nextSlide);
        this.startTimer();
    }

    switchControlls(activeSlide: SlidePage) {
        this.slidePages.forEach((slide) => slide.isActive = activeSlide.id === slide.id);
    }
}
