import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { $activeCategory, FetchType, updateTypeOfFetching } from '../../store/products';
import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import Categories from '../Categories/Categories';
import SearchController from '../SearchController/SearchController';
import SearchIcon from 'src/assets/icons/search.svg';
import CartIcon from 'src/assets/icons/cart.svg';
import styles from './ProductsHeader.module.css';

const ProductsHeader = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    
    const activeCategory = useUnit($activeCategory);
    const updateTypeOfFetchingEvent = useUnit(updateTypeOfFetching);

    useEffect(() => {
        if (isCategoriesOpen) {
            activeCategory === 'all' 
                ? updateTypeOfFetchingEvent(FetchType.all) 
                : updateTypeOfFetchingEvent(FetchType.category);
        } else {
            updateTypeOfFetchingEvent(FetchType.search);
        }
    }, [isCategoriesOpen]);
    
    return (
        <div className={styles.header}>
            {
                isCategoriesOpen 
                ? 
                <>
                    <Button 
                        buttonType={ButtonType.clear}
                        onClick={() => setIsCategoriesOpen(false)}
                    >
                        <img src={SearchIcon} alt="search"/>
                    </Button>
                    <Categories/>
                </>
                : <SearchController setIsOpen={(isOpen: boolean) => setIsCategoriesOpen(!isOpen)}/>
            }
            <Button buttonType={ButtonType.clear} className={styles['cart-btn']}>
                <img src={CartIcon} alt="search"/>
                <span>cart</span>
            </Button>
        </div>
    );
};

export default ProductsHeader;