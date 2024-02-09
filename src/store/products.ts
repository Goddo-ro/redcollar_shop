import { createEffect, createEvent, createStore, sample } from 'effector';
import { Product } from '../types/Product';
import { getAllProducts, getProductsByCategory } from '../api/ProductsApi';

enum FetchType {
    all,
    category,
    search,
}

// TODO: fetch data on first load

export const $typeOfFetching = createStore<FetchType>(FetchType.all);
export const $activeCategory = createStore<string>('all');

export const $products = createStore<Product[]>([]);
export const $limit = createStore<number>(10);
export const $skip = createStore<number>(0);

export const updateProducts = createEffect(async () => {
    switch ($typeOfFetching.getState()) {
        case FetchType.category:
            return await getProductsByCategory($activeCategory.getState(), $limit.getState(), $skip.getState());
        case FetchType.search:
            return await getAllProducts($limit.getState(), $skip.getState());
        default:
            return await getAllProducts($limit.getState(), $skip.getState());
    }
});

export const updateTypeOfFetching = createEvent<FetchType>();
export const updateCategory = createEvent<string | null>();
export const resetData = createEvent<void>();

sample({
    clock: updateCategory,
    fn: (category) => category ? category : 'all',
    target: $activeCategory,
});

sample({
    source: $activeCategory,
    fn: (category) => category === 'all' ? FetchType.all : FetchType.category,
    target: $typeOfFetching,
});

sample({
    clock: [$typeOfFetching, $activeCategory],
    target: updateProducts,
});

sample({
    clock: updateProducts.doneData,
    fn: (res) => [...$products.getState(), ...res.data.products],
    target: $products,
});

$products.reset($activeCategory, $typeOfFetching);
$limit.reset($activeCategory, $typeOfFetching);
$skip.reset($activeCategory, $typeOfFetching);
