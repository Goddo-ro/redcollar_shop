import { useUnit } from 'effector-react';
import { $products, updateProducts } from '../../store/products';
import styles from './ProductsStatus.module.css';
import Loader from '../Loader/Loader';

const ProductsStatus = () => {
    const isLoading = useUnit(updateProducts.pending);
    const products = useUnit($products);

    const getStatusElement = (): JSX.Element | undefined => {
        if (isLoading) {
            return <Loader />;
        } else if (!products.length) {
            return <span>Ничего не найдено, попробуйте изменить запрос</span>;
        }
    };

    const status = getStatusElement();

    return (
        <div className={status ? styles['products-status'] : ''}>
            {
                getStatusElement()
            }
        </div>
    );
};

export default ProductsStatus;