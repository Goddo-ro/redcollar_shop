import { createEvent, createStore, sample } from 'effector';

export const $error = createStore<string | undefined>('');

export const setError = createEvent<string>();
export const resetError = createEvent();

sample({
    clock: setError,
    target: $error,
});

$error.reset(resetError);