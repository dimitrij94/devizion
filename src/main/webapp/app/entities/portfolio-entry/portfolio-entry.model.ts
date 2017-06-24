import { Product } from '../product';
export class PortfolioEntry {
    constructor(
        public id?: number,
        public photoUri?: string,
        public description?: string,
        public portfolio?: Product,
    ) {
    }
}
