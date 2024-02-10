import { AxiosPromise } from 'axios';
import { Product } from '../types/Product';
import { $productsInstance } from './api';

type ProductsResponse = {
    products: Product[]
    limit: number
    skip: number
    total: number
};

export const getAllProducts = async (limit: number = 10, skip: number = 0): AxiosPromise<ProductsResponse> => {
    return await $productsInstance.get<ProductsResponse>('products', {
        params: {
            limit,
            skip
        }
    });
};

export const getProductsBySearch = async (search: string, limit: number = 10, skip: number = 0) => {
    return await $productsInstance.get<ProductsResponse>('products/search', {
        params: {
            q: search,
            limit,
            skip
        }
    });
};

export const getProductsByCategory = async (category: string, limit: number = 10, skip: number = 0) => {
    return await $productsInstance.get<ProductsResponse>(`products/category/${category}`, {
        params: {
            limit,
            skip
        }
    });
};

export const getProductsCategories = async () => {
    return await $productsInstance.get<string[]>('products/categories');
};
