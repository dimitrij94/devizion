import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { DevizionTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProductCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/product-category/product-category-detail.component';
import { ProductCategoryService } from '../../../../../../main/webapp/app/entities/product-category/product-category.service';
import { ProductCategory } from '../../../../../../main/webapp/app/entities/product-category/product-category.model';

describe('Component Tests', () => {

    describe('ProductCategory Management Detail Component', () => {
        let comp: ProductCategoryDetailComponent;
        let fixture: ComponentFixture<ProductCategoryDetailComponent>;
        let service: ProductCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DevizionTestModule],
                declarations: [ProductCategoryDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProductCategoryService,
                    EventManager
                ]
            }).overrideComponent(ProductCategoryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ProductCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.productCategory).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
