import { KeyboardEvent, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useUnit } from 'effector-react';
import { $isCartOpen, closeCart } from '../../store/cart';
import CartList from './CartList';
import CartFooter from './CartFooter';
import CartIcon from 'src/assets/icons/cart.svg';
import CrossIcon from 'src/assets/icons/cross.svg';
import styles from './Cart.module.css';

const Cart = () => {
    const isCartOpen = useUnit($isCartOpen);
    const closeCartEvent = useUnit(closeCart);

    useEffect(() => {
        if (isCartOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'scroll';
    }, [isCartOpen]);

    return (
        <ReactModal
            isOpen={isCartOpen}
            onRequestClose={closeCartEvent}
            ariaHideApp={false}
            contentLabel='cart modal'
            overlayClassName={styles['cart-overlay']}
            className={styles['cart']}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
        >
            <CartHeader/>
            <CartList/>
            <CartFooter/>
        </ReactModal>
    );
};

const CartHeader = () => {
    const closeCartEvent = useUnit(closeCart);

    const handleKeydown = (event: KeyboardEvent<HTMLImageElement>) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            closeCartEvent();
        }
    };

    return (
        <div className={styles['cart__header']}>
            <span>
                <img src={CartIcon} alt='cart'/>
                cart
            </span>
            <img 
                className={styles['cart__close']} 
                src={CrossIcon} 
                alt='close' 
                onClick={() => closeCartEvent()}
                onKeyDown={handleKeydown}
                tabIndex={0}
            />
        </div>
    );
};

export default Cart;