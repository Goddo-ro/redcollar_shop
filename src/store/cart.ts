import { createEvent, createStore, sample } from 'effector';
import { Product } from '../types/Product';

type CartListType = {
    [key: number]: { product: Product, count: number }
};

export const $cartList = createStore<CartListType>({});

const increaseCount = createEvent<Product>();
const decreaseCount = createEvent<Product>();
const removeFromCart = createEvent<Product>();

sample({
    clock: increaseCount,
    fn: (product: Product) => {
        const cartList = $cartList.getState();
        if (!cartList[product.id]) {
            cartList[product.id] = { product: product, count: 1 };
        } else {
            cartList[product.id].count++;
        }

        return cartList;
    },
    target: $cartList,
});

sample({
    clock: removeFromCart,
    fn: (product: Product) => {
        const cartList = $cartList.getState();
        const result: CartListType = {};
        for (const id of Object.keys(cartList)) {

            if (Number.parseInt(id) !== product.id) {
                result[Number.parseInt(id)] = cartList[Number.parseInt(id)];
            }
        }

        return result;
    },
    target: $cartList,
});

sample({
    clock: decreaseCount,
    fn: (product: Product) => {
        const cartList = $cartList.getState();
        cartList[product.id].count--;
        if (!cartList[product.id].count) {
            delete cartList[product.id];
        }

        return cartList;
    },
    target: $cartList,
});