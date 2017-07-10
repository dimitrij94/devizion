/**
 * Created by Dmitrij on 30.06.2017.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {UserOrder} from "../user-order/user-order.model";
@Pipe({name: 'ordersPassQuery'})
export class ProductDetailOrdersPipe implements PipeTransform {

    transform(value: UserOrder[], query: string): any {
        return value.filter((order: UserOrder) =>
            order.description.indexOf(query) != -1 || order.custumer.custumerName.indexOf(query) != -1
        );
    }
}
