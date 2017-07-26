import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ProductService} from "./product.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
/**
 * Created by Dmitrij on 08.05.2017.
 */
@Injectable()
export class ProductResolver implements Resolve<Response> {

    constructor(private productService: ProductService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response>
        | Promise<Response>
        | Response {
        return this.productService.query();//.map((res:Response)=>res.json());
    }
}

@Injectable()
export class ProductByIdResolver implements Resolve<Response> {
    constructor(private productService: ProductService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response>
        | Promise<Response>
        | Response {
        return this.productService.findWithProductPortfolio(route.params['id']);
    }
}
