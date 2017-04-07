import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DevizionTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserOrderDetailComponent } from '../../../../../../main/webapp/app/entities/user-order/user-order-detail.component';
import { UserOrderService } from '../../../../../../main/webapp/app/entities/user-order/user-order.service';
import { UserOrder } from '../../../../../../main/webapp/app/entities/user-order/user-order.model';

describe('Component Tests', () => {

    describe('UserOrder Management Detail Component', () => {
        let comp: UserOrderDetailComponent;
        let fixture: ComponentFixture<UserOrderDetailComponent>;
        let service: UserOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [UserOrderDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserOrderService,
                    EventManager
                ]
            }).overrideComponent(UserOrderDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserOrderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserOrderService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserOrder(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userOrder).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
