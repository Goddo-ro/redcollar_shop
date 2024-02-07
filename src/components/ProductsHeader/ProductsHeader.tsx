import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import Categories from '../Categories/Categories';
import SearchIcon from 'src/assets/icons/search.svg';
import CartIcon from 'src/assets/icons/cart.svg';
import styles from './ProductsHeader.module.css';

const ProductsHeader = () => {
    return (
        <div className={styles.header}>
            <Button buttonType={ButtonType.clear}>
                <img src={SearchIcon} alt="search"/>
            </Button>
            <Categories/>
            <Button buttonType={ButtonType.clear} className={styles['cart-btn']}>
                <img src={CartIcon} alt="search"/>
                <span>cart</span>
            </Button>
        </div>
    );
};

export default ProductsHeader;