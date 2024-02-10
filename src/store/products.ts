import { createEffect, createEvent, createStore, sample } from 'effector';
import { Product } from '../types/Product';
import { getAllProducts, getProductsByCategory, getProductsBySearch } from '../api/ProductsApi';
import { setError } from './error';

export enum FetchType {
    all,
    category,
    search,
}

export const $typeOfFetching = createStore<FetchType>(FetchType.all);
export const $activeCategory = createStore<string>('all');
export const $searchValue = createStore<string>('');
export const $products = createStore<Product[]>([]);
export const $limit = createStore<number>(10);
export const $skip = createStore<number>(0);

export const updateTypeOfFetching = createEvent<FetchType>();
export const updateSearchValue = createEvent<string>('');
export const updateCategory = createEvent<string | null>();
export const updateSkip = createEvent<number>();

export const updateProducts = createEffect(async () => {
    switch ($typeOfFetching.getState()) {
        case FetchType.category:
            return await getProductsByCategory($activeCategory.getState(), $limit.getState(), $skip.getState());
        case FetchType.search:
            return $searchValue.getState().length > 3 
            ? await getProductsBySearch($searchValue.getState(), $limit.getState(), $skip.getState())
            : await getAllProducts($limit.getState(), $skip.getState());
        default:
            return await getAllProducts($limit.getState(), $skip.getState());
    }
});

sample({
    clock: updateTypeOfFetching,
    fn: (type) => type,
    target: $typeOfFetching,
});

sample({
    clock: updateSearchValue,
    fn: (value) => value,
    target: $searchValue,
});

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
    clock: [$typeOfFetching, $searchValue, $activeCategory],
    target: updateProducts,
});

sample({
    clock: updateProducts.doneData,
    fn: (res) => [...$products.getState(), ...res.data.products],
    target: $products,
});

sample({
    clock: updateSkip,
    target: $skip,
});

sample({
    clock: updateProducts.done,
    fn: () => $skip.getState() + $limit.getState(),
    target: $skip,
});

sample({
    clock: updateProducts.fail,
    fn: () => 'При загрузке товаров произошла ошибка, повторите запрос.',
    target: setError,
});

$products.reset($activeCategory, $searchValue, $typeOfFetching);
$limit.reset($activeCategory, $searchValue, $typeOfFetching);
$skip.reset($activeCategory, $searchValue, $typeOfFetching);
