import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import ProductsHeader from '../../components/ProductsHeader/ProductsHeader';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { $activeCategory, updateCategory } from '../../store/products';

const Products = () => {
    const [searchParams] = useSearchParams();

    const [updateCategoryEvent] = useUnit([updateCategory]);
    const activeCategory = useUnit($activeCategory);

    useEffect(() => {
        if (searchParams.get('category') !== activeCategory) {
            updateCategoryEvent(searchParams.get('category'));
        }
    }, [searchParams?.get('category'), activeCategory]);

    return (
        <main className='products'>
            <ProductsHeader/>
            <ProductsGrid/>
        </main>
    );
};

export default Products;