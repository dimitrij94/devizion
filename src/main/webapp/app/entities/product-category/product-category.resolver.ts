import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ProductCategory, ProductCategoryWithProducts} from "./product-category.model";
import {ProductCategoryService} from "./product-category.service";
import {Response} from "@angular/http";
/**
 * Created by Dmitrij on 08.05.2017.
 */

@Injectable()
export class ProductCategoriesResolver implements Resolve<Observable<Response>> {

    constructor(private productCategoryService: ProductCategoryService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Response>>
        | Promise<Observable<Response>>
        | Observable<Response> {
        return this.productCategoryService.query();
    }
}

@Injectable()
export class ProductCategoryByIdResolver implements Resolve<Observable<ProductCategory>> {

    constructor(private productCategoryService:ProductCategoryService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ProductCategory>> | Promise<Observable<ProductCategory>> | Observable<ProductCategory> {
        return this.productCategoryService.find(route.params['id']);
    }
}

@Injectable()
export class ProductCategoriesWithProductsResolver implements Resolve<Observable<ProductCategoryWithProducts>> {

    constructor(private productCategoryService: ProductCategoryService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ProductCategoryWithProducts>>
        | Promise<Observable<ProductCategoryWithProducts>>
        | Observable<ProductCategoryWithProducts> {
        return this.productCategoryService.queryWithProducts();
    }
}
@Injectable()
export class ProductCategoryByIdWithProductsResolver implements Resolve<Observable<ProductCategoryWithProducts>> {

    constructor(private productCategoryService: ProductCategoryService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ProductCategoryWithProducts>>
        | Promise<Observable<ProductCategoryWithProducts>>
        | Observable<ProductCategoryWithProducts> {
        return this.productCategoryService.findWithProducts(route.params['id']);
    }
}

@Injectable()
export class FirstProductCategoryResolver implements Resolve<Observable<ProductCategoryWithProducts>> {

    constructor(private productCategoryService: ProductCategoryService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<ProductCategoryWithProducts>>
        | Promise<Observable<ProductCategoryWithProducts>>
        | Observable<ProductCategoryWithProducts> {
        return this.productCategoryService.findFirst();
    }
}
