import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import SearchIcon from 'src/assets/icons/search.svg';
import CartIcon from 'src/assets/icons/cart.svg';
import styles from './ProductsHeader.module.css';

const ProductsHeader = () => {
    return (
        <div className={styles.header}>
            <Button type={ButtonType.clear}>
                <img src={SearchIcon} alt="search"/>
            </Button>
            <Button type={ButtonType.clear} className={styles['cart-btn']}>
                <img src={CartIcon} alt="search"/>
                <span>cart</span>
            </Button>
        </div>
    );
};

export default ProductsHeader;