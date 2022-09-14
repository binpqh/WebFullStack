export interface IProductResult
{
    productName : string;
    brandName : string;
    categoryName : string;
    modelYear : number;
    listPrice : number;
}
export interface IProductInput
{
    productName : string;
    brandId: number;
    categoryId : number;
    modelYear : number;
    listPrice : number;
}