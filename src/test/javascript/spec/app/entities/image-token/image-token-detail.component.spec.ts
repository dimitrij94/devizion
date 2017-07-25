import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DevizionTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ImageTokenDetailComponent } from '../../../../../../main/webapp/app/entities/image-token/image-token-detail.component';
import { ImageTokenService } from '../../../../../../main/webapp/app/entities/image-token/image-token.service';
import { ImageToken } from '../../../../../../main/webapp/app/entities/image-token/image-token.model';

describe('Component Tests', () => {

    describe('ImageToken Management Detail Component', () => {
        let comp: ImageTokenDetailComponent;
        let fixture: ComponentFixture<ImageTokenDetailComponent>;
        let service: ImageTokenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [ImageTokenDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ImageTokenService,
                    EventManager
                ]
            }).overrideComponent(ImageTokenDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageTokenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageTokenService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ImageToken(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.imageToken).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
