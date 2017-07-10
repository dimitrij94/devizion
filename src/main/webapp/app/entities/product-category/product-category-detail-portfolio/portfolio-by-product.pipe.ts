/**
 * Created by Dmitrij on 04.07.2017.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {UserOrder} from "../../user-order/user-order.model";
import {Product} from "../../product/product.model";
@Pipe({name: 'portfolioByProductsPipe'})
export class PortfolioByProductsPipe implements PipeTransform {


    transform(value: UserOrder[], productChips: Product[], numberOfFilteredPortfolios: any): UserOrder[] {
        if (productChips.length == 0 || productChips == null) {
            numberOfFilteredPortfolios.count = value.length;
            return value;
        }

        else {
            let filteredVal = value.filter((order) => {
                for (let i = 0; i < productChips.length; i++) {
                    if (order.product.id == productChips[i].id) {
                        return true;
                    }
                }
                return false;
            });
            numberOfFilteredPortfolios.count = filteredVal.length;
            return filteredVal;
        }
    }
}
