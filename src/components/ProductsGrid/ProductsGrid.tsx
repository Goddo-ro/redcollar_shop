import { useUnit } from 'effector-react';
import { $products, updateProducts } from '../../store/products';
import ProductCard from '../ProductCard/ProductCard';
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton';
import styles from './ProductsGrid.module.css';

const ProductsGrid = () => {
    const products = useUnit($products);
    const isLoading = useUnit(updateProducts.pending);

    const productsEls = products.map((product) => <ProductCard key={product.id} product={product} />);
    return (
        <div className={styles['products-grid']}>
            {
                productsEls
            }
            {
                isLoading && Array.from({ length: 8 }, () => <ProductSkeleton/>)
            }
        </div>
    );
};

export default ProductsGrid;