import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { $products, $skip, updateProducts } from '../../store/products';
import { $error } from '../../store/error';
import Loader from '../Loader/Loader';  
import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import styles from './ProductsStatus.module.css';


const ProductsStatus = () => {
    const [isError, setIsError] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const updateProductsEffect = useUnit(updateProducts);
    const isLoading = useUnit(updateProducts.pending);
    const products = useUnit($products);
    const skip = useUnit($skip);
    const error = useUnit($error);

    useEffect(() => {
        if (!inView || isLoading || skip > products.length) return;
        updateProductsEffect();
    }, [inView]);

    useEffect(() => {
        error && setIsError(true);
    }, [error]);

    const handleLoadMore = () => {
        updateProductsEffect();
        setIsError(false);
    };

    const getStatusElement = (): JSX.Element | undefined => {
        if (isLoading) {
            return <Loader />;
        } else if (isError) {
            return <Button 
                        onClick={handleLoadMore} 
                        buttonType={ButtonType.clear}
                    >Загрузить еще</Button>;
        } else if (!products.length) {
            return <span>Ничего не найдено, попробуйте изменить запрос</span>;
        } else if (skip > products.length) {
            return <span>Товары закончились :(</span>;
        }
    };

    const status = getStatusElement();

    return (
        <div ref={ref} className={status ? styles['products-status'] : ''}>
            {
                getStatusElement()
            }
        </div>
    );
};

export default ProductsStatus;