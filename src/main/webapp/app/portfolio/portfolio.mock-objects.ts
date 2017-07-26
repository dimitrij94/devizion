/**
 * Created by Dmitrij on 27.04.2017.
 */
import {UserOrder} from "../entities/user-order/user-order.model";
import {Custumer} from "../entities/custumer/custumer.model";
import {Product} from "../entities/product/product.model";

const MOCK_CUSTUMER: Custumer = {
    id: 1,
    custumerName: 'lorem ipsum',
    custumerSurname: 'lorem ipsum',
    custumerImageUri: '51.jpg'
};
const MOCK_PRODUCT: Product = {
    id: 1,
    productName: 'lorem ipsum',
    productPrice: 150,
    productDescription: 'My problem is that it there is some inconsystency inside the database. When i try to get the UserOrders from the db',
    productImageUri: 'Penguins.jpg'
};
export const MOCK_PORTFOLIOS: Array<UserOrder> = [
    {
        id: 1,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 2,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }
    ,
    {
        id: 3,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 4,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }
    , {
        id: 5,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 6,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 7,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 8,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 9,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 10,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 11,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    },
    {
        id: 12,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 13,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 14,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 15,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 16,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 17,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 18,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }, {
        id: 19,
        photoUri: 'Koala.jpg',
        description: 'Lorem ipsum',
        custumer: MOCK_CUSTUMER,
        product: MOCK_PRODUCT
    }
];
