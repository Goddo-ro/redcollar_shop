import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { $products, $skip, updateProducts } from '../../store/products';
import Loader from '../Loader/Loader';  
import styles from './ProductsStatus.module.css';
import { useEffect } from 'react';


const ProductsStatus = () => {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const updateProductsEffect = useUnit(updateProducts);
    const isLoading = useUnit(updateProducts.pending);
    const products = useUnit($products);
    const skip = useUnit($skip);

    useEffect(() => {
        if (!inView || isLoading || skip > products.length) return;
        updateProductsEffect();
    }, [inView]);

    const getStatusElement = (): JSX.Element | undefined => {
        if (isLoading) {
            return <Loader />;
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