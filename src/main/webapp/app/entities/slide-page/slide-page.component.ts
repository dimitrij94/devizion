import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {AlertService, EventManager, JhiLanguageService} from "ng-jhipster";
import {SlidePage} from "./slide-page.model";
import {SlidePageService} from "./slide-page.service";
import {Principal} from "../../shared";

@Component({
    selector: 'jhi-slide-page',
    templateUrl: './slide-page.component.html'
})
export class SlidePageComponent implements OnInit, OnDestroy {
    slidePages: SlidePage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private slidePageService: SlidePageService,
                private alertService: AlertService,
                private eventManager: EventManager,
                private jhiLangudgeService: JhiLanguageService,
                private principal: Principal) {
        this.jhiLangudgeService.setLocations(['slidePage']);
    }

    loadAll() {
        this.slidePageService.query().subscribe(
            (res: SlidePage[]) => {
                this.slidePageService.parseAllSlidePagePhoto(res, 0.15);
                this.slidePages = res;

            },
            (res: Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSlidePages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SlidePage) {
        return item.id;
    }

    registerChangeInSlidePages() {
        this.eventSubscriber = this.eventManager.subscribe('slidePageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
