import { $productsInstance } from './api';

export const getAllProducts = async (limit: number = 10, skip: number = 0) => {
    return await $productsInstance.get('products', {
        params: {
            limit,
            skip
        }
    });
};

export const getProductsBySearch = async (search: string) => {
    return await $productsInstance.get(`products/search`, {
        params: {
            q: search
        }
    });
}

export const getProductsByCategory = async (category: string) => {
    return await $productsInstance.get(`products/category/${category}`);
};

export const getProductsCategories = async () => {
    return await $productsInstance.get('products/categories');
};
