import { useUnit } from 'effector-react';
import { updateProducts } from '../../store/products';
import styles from './ProductsStatus.module.css';
import Loader from '../Loader/Loader';

const ProductsStatus = () => {
    const isLoading = useUnit(updateProducts.pending);

    const getStatusElement = (): JSX.Element => {
        if (isLoading) {
            return <Loader />;
        }
        return <span>Ничего не найдено, попробуйте изменить запрос</span>;
    };

    return (
        <div className={styles['products-status']}>
            {
                getStatusElement()
            }
        </div>
    );
};

export default ProductsStatus;