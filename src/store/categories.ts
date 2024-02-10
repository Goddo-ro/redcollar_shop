import { createEffect, createStore, sample } from 'effector';
import { getProductsCategories } from '../api/ProductsApi';
import { setError } from './error';

export const $categories = createStore<string[]>([]);

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

updateCategories();