/**
 * Created by Dmitrij on 25.04.2017.
 */
export interface Page<T> {
    content: T[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: string;
    first: boolean;
    numberOfElements: number;
}
export interface PageRequest{
    page:number;
    size?:number;
    query?:any;
    sort?:any;
}
