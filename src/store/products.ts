import { createEffect, createEvent, createStore, sample } from 'effector';
import { Product } from '../types/Product';
import { getAllProducts, getProductsByCategory } from '../api/ProductsApi';

export const $activeCategory = createStore<string | null>(null);
$activeCategory.watch((value) => {
    console.log('updated', value);
  });
export const $products = createStore<Product[]>([]);

export const fetchProducts = createEffect(async (category: string | null) => {
    if (category && category !== 'all') {
        return await getProductsByCategory(category);
    }

    return await getAllProducts();
});


export const updateCategory = createEvent<string>();

sample({
    clock: updateCategory,
    fn: (category) => category,
    target: $activeCategory,
});

// sample({
//     source: $activeCategory,
//     fn: (category) => category,
//     target: fetchProducts,
// });

// sample({
//     clock: fetchProducts.doneData,
//     fn: (res) => res.data.products,
//     target: $products,
// });