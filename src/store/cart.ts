import { createEvent, createStore, sample } from 'effector';
import persist from 'effector-localstorage';
import { Product } from '../types/Product';

type CartListType = {
    [key: number]: { product: Product, count: number }
};

export const $isCartOpen = createStore<boolean>(false);
export const $cartList = createStore<CartListType>({});
export const $resultPrice = createStore<number>(0);
export const $resultCount = createStore<number>(0);

export const openCart = createEvent();
export const closeCart = createEvent();
export const increaseCount = createEvent<Product>();
export const decreaseCount = createEvent<Product>();
export const removeFromCart = createEvent<Product>();
export const resetCart = createEvent();

$isCartOpen.on(openCart, () => true);
$isCartOpen.on(closeCart, () => false);

sample({
    clock: increaseCount,
    fn: (product: Product) => {
        const cartList = $cartList.getState();
        if (!cartList[product.id]) {
            cartList[product.id] = { product: product, count: 1 };
        } else {
            cartList[product.id].count++;
        }

        return Object.assign({}, cartList);
    },
    target: $cartList,
});

sample({
    clock: increaseCount,
    fn: (product: Product) => $resultPrice.getState() + product.price,
    target: $resultPrice,
});

sample({
    clock: increaseCount,
    fn: () => $resultCount.getState() + 1,
    target: $resultCount,
});

sample({
    clock: removeFromCart,
    fn: (product: Product) => $resultPrice.getState() - product.price 
                                * $cartList.getState()[product.id].count,
    target: $resultPrice,
});

sample({
    clock: removeFromCart,
    fn: (product: Product) => $resultCount.getState() - $cartList.getState()[product.id].count,
    target: $resultCount,
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

        return Object.assign({}, result);
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

        return Object.assign({}, cartList);
    },
    target: $cartList,
});

sample({
    clock: decreaseCount,
    fn: (product: Product) => $resultPrice.getState() - product.price,
    target: $resultPrice,
});

sample({
    clock: decreaseCount,
    fn: () => $resultCount.getState() - 1,
    target: $resultCount,
});

sample({
    clock: resetCart,
    fn: () => ({}),
    target: $cartList,
});

$resultPrice.reset(resetCart);
$resultCount.reset(resetCart);

persist({
    store: $cartList,
    key: 'cartList',
});

persist({
    store: $resultPrice,
    key:'resultPrice',
});

persist({
    store: $resultCount,
    key:'resultCount',
});