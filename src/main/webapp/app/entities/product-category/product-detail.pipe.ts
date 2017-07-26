/**
 * Created by Dmitrij on 29.06.2017.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "../product/product.model";
@Pipe({name: 'productFitsUserQuery'})
export class ProductPipe implements PipeTransform {

    transform(value: Product[], query: string, minPrice: number, maxPrice: number, numberOfFilteredProducts:any): any {
        let returnVal = value.filter((product) => {
            let pass = true;

            if (pass && (product.productPrice < minPrice)) {
                pass = false;
            }

            if (pass && (product.productPrice > maxPrice)) {
                pass = false;
            }

            if (pass && product.productName.indexOf(query) == -1 && product.productDescription.indexOf(query) == -1) {
                pass = false;
            }

            return pass;
        });
        numberOfFilteredProducts.count = returnVal.length;
        return returnVal;
    }
}
