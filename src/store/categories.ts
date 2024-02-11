import { createEffect, createEvent, createStore, sample } from 'effector';
import { getProductsCategories } from '../api/ProductsApi';
import { setError } from './error';

export const $activeCategory = createStore<string>('all');
export const $categories = createStore<string[]>([]);

export const updateCategory = createEvent<string | null>();

export const updateCategories = createEffect(async () => {
    return await getProductsCategories();
});

sample({
    clock: updateCategories.doneData,
    fn: (res) => res.data,
    target: $categories,
});

sample({
    clock: updateCategories.fail,
    fn: () => 'При загрузке категорий произошла ошибка, перезагрузите страницу.',
    target: setError,
});

sample({
    clock: updateCategory,
    fn: (category) => category ? category : 'all',
    target: $activeCategory,
});

updateCategories();