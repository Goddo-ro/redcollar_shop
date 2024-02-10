import { useUnit } from 'effector-react';
import { $cartList, $resultCount, $resultPrice, closeCart, resetCart } from '../../store/cart';
import Button from '../Button/Button';
import styles from './CartFooter.module.css';

const CartFooter = () => {
    const cartList = useUnit($cartList);
    const listCount = Object.keys(cartList).length;
    const resultPrice = useUnit($resultPrice);
    const resultCount = useUnit($resultCount);
    const closeCartEvent = useUnit(closeCart);
    const resetCartEvent = useUnit(resetCart);

    return (
        <div className={styles['cart__footer']}>
            {
                listCount > 0 &&
                <div className={styles['cart__result']}>
                    <span className={styles['cart__positions']}>{resultCount} positions</span>
                    <span className={styles['cart__price']}>${resultPrice}</span>
                </div>
            }
            {
                !listCount
                ? <Button 
                    onClick={() => closeCartEvent()}
                    className={styles['cart__button']}
                >back to products</Button>
                : <Button 
                    onClick={() => resetCartEvent()}
                    className={styles['cart__button']}
                >place an order</Button>
            }
        </div>
    );
};

export default CartFooter;