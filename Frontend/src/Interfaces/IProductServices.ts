import internal from "stream";

export interface IProductResult
{
    productId: number;
    productName : string;
    brandName : string;
    categoryName : string;
    modelYear : number;
    listPrice : number;
}
export interface IProductInput
{
    productId: number;
    productName : string;
    brandId: number;
    categoryId : number;
    modelYear : number;
    listPrice : number;
}