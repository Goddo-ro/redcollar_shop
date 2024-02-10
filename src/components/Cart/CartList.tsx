import { useState } from 'react';
import { useUnit } from 'effector-react';
import { $cartList, $resultCount, decreaseCount, increaseCount, removeFromCart } from '../../store/cart';
import { Product } from '../../types/Product';
import TrashcanIcon from 'src/assets/icons/trashcan_white.svg';
import styles from './CartList.module.css';

const CartList = () => {
    useUnit($resultCount);

    const cartList = useUnit($cartList);

    const cartListElements = Object.keys(cartList).map((key) => {
        const el = cartList[Number.parseInt(key)];
        const product = el.product;
        const count = el.count;

        return <CartItem key={key} product={product} count={count}/>;
    });

    return (
        <ul className={styles['cart__list']}>
            {
                cartListElements
            }
        </ul>
    );
};

type CartItemProps = {
    product: Product,
    count: number,
};

const CartItem = ({ product, count }: CartItemProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const increaseCountEvent = useUnit(increaseCount);
    const decreaseCountEvent = useUnit(decreaseCount);
    const removeFromCartEvent = useUnit(removeFromCart);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            removeFromCartEvent(product);
        }, 2000);
    };

    return (
        <li className={styles['cart__item']}>
            <img className={styles['cart__item-img']} src={product.thumbnail}/>
            <div className={styles['cart__item-description']}>
                <div className={styles['cart__item-header']}>
                    <h4>{product.title}</h4>
                    <span>${product.price}</span>
                </div>    
                <div className={styles['cart__item-count']}>
                    <span onClick={() => decreaseCountEvent(product)}>-</span>
                    <span>{count}</span>
                    <span onClick={() => increaseCountEvent(product)}>+</span>
                </div>
            </div>
            <div 
                className={`${styles['cart__item-remove']} ${isClicked? styles['cart__item-remove_clicked'] : ''}`}
                onClick={() => handleClick()}
            >
                {
                    !isClicked ? <img src={TrashcanIcon} alt="remove" /> : <span>product has been delete</span>
                }
                
            </div>      
        </li>
    );
};

export default CartList;