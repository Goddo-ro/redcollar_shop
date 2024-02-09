import { useUnit } from 'effector-react';
import ProductCard from '../ProductCard/ProductCard';
import { $products } from '../../store/products';
import styles from './ProductsGrid.module.css';

const ProductsGrid = () => {
    const products = useUnit($products);

    const productsEls = products.map((product) => <ProductCard key={product.id} product={product} />);
    return (
        <div className={styles['products-grid']}>
            {
                productsEls
            }
        </div>
    );
};

export default ProductsGrid;