import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DevizionTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PortfolioEntryDetailComponent } from '../../../../../../main/webapp/app/entities/portfolio-entry/portfolio-entry-detail.component';
import { PortfolioEntryService } from '../../../../../../main/webapp/app/entities/portfolio-entry/portfolio-entry.service';
import { PortfolioEntry } from '../../../../../../main/webapp/app/entities/portfolio-entry/portfolio-entry.model';

describe('Component Tests', () => {

    describe('PortfolioEntry Management Detail Component', () => {
        let comp: PortfolioEntryDetailComponent;
        let fixture: ComponentFixture<PortfolioEntryDetailComponent>;
        let service: PortfolioEntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [PortfolioEntryDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PortfolioEntryService,
                    EventManager
                ]
            }).overrideComponent(PortfolioEntryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PortfolioEntryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PortfolioEntryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new PortfolioEntry(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.portfolioEntry).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
