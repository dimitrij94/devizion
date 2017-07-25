import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {DataUtils, DateUtils, EventManager} from "ng-jhipster";
import {DevizionTestModule} from "../../../test.module";
import {MockActivatedRoute} from "../../../helpers/mock-route.service";
import {SlidePageDetailComponent} from "../../../../../../main/webapp/app/entities/slide-page/slide-page-detail.component";
import {SlidePageService} from "../../../../../../main/webapp/app/entities/slide-page/slide-page.service";
import {SlidePage} from "../../../../../../main/webapp/app/entities/slide-page/slide-page.model";

describe('Component Tests', () => {

    describe('SlidePage Management Detail Component', () => {
        let comp: SlidePageDetailComponent;
        let fixture: ComponentFixture<SlidePageDetailComponent>;
        let service: SlidePageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [SlidePageDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SlidePageService,
                    EventManager
                ]
            }).overrideComponent(SlidePageDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SlidePageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlidePageService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SlidePage(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.slidePage).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
