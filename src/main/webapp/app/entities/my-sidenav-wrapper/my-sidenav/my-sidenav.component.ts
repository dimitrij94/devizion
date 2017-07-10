import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductCategory} from "../../product-category/product-category.model";
import {MySidenavWrapperService} from "../my-sidenav-wrapper.service";

@Component({
    selector: 'jhi-my-sidenav',
    templateUrl: './my-sidenav.component.html',
    styleUrls: ['./my-sidenav-wrapper.component.scss']
})
export class MySidenavComponent implements OnInit {

    @Input('allCategories')
    allCategories: ProductCategory[];
    sidenavMode: string = 'side';
    showSidenavToggler: boolean = false;
    sidenavOpened: boolean;

    @ViewChild('scrollingContentElRef')
    scrollingContentElRef: ElementRef;

    constructor(private route: ActivatedRoute,
                private chageDetectorRef: ChangeDetectorRef,
                private mySidenavWrapperService: MySidenavWrapperService) {
    }

    ngOnInit() {
        this.sidenavOpened = window.innerWidth >= 1015;
        this.showSidenavToggler = !this.sidenavOpened;
        this.sidenavMode = this.sidenavOpened ? 'side' : 'over';
        this.mySidenavWrapperService.initializeScrollingObservable(this.scrollingContentElRef.nativeElement);
    }

    @HostListener('window:resize', ['$event'])
    onResize($event) {
        this.optimizeSidenavPosition();
    }

    openSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
        this.chageDetectorRef.detectChanges();
    }

    onSidenavOpen() {
        this.sidenavOpened = true;
        this.showSidenavToggler = false;
    }

    onSidenavClose() {
        this.sidenavOpened = false;
        this.showSidenavToggler = true;
    }

    optimizeSidenavPosition() {
        if (window.innerWidth <= 1015 && this.sidenavOpened) {
            this.sidenavOpened = false;
            this.sidenavMode = 'over';
        }
        else if (window.innerWidth > 1015 && !this.sidenavOpened) {
            this.sidenavOpened = true;
            this.sidenavMode = 'side';
        }
    }

}
