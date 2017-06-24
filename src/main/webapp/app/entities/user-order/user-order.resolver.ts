/**
 * Created by Dmitrij on 08.05.2017.
 */
import {Resolve} from "@angular/router/src";
import {UserOrder} from "./user-order.model";
import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserOrderService} from "./user-order.service";
import {Injectable} from "@angular/core";
@Injectable()
export class UserOrderResolver implements Resolve<UserOrder> {

    constructor(private userOrderService: UserOrderService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserOrder>
        | Promise<UserOrder>
        | UserOrder {
        return this.userOrderService.query();
    }
}
