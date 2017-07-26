import {UserOrder} from "../../entities/user-order/user-order.model";
/**
 * Created by Dmitrij on 29.04.2017.
 */
export interface FlipCardSubscriptionDto {
    index: number
    nextEntity: UserOrder;
}
