import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DevizionTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CustumerDetailComponent } from '../../../../../../main/webapp/app/entities/custumer/custumer-detail.component';
import { CustumerService } from '../../../../../../main/webapp/app/entities/custumer/custumer.service';
import { Custumer } from '../../../../../../main/webapp/app/entities/custumer/custumer.model';

describe('Component Tests', () => {

    describe('Custumer Management Detail Component', () => {
        let comp: CustumerDetailComponent;
        let fixture: ComponentFixture<CustumerDetailComponent>;
        let service: CustumerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [CustumerDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CustumerService,
                    EventManager
                ]
            }).overrideComponent(CustumerDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustumerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustumerService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Custumer(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.custumer).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
