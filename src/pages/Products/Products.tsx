import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $activeCategory, updateCategory } from '../../store/products';
import ProductsHeader from '../../components/ProductsHeader/ProductsHeader';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import ProductsStatus from '../../components/ProductsStatus/ProductsStatus';

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryParam  = searchParams?.get('category');

    const updateCategoryEvent = useUnit(updateCategory);
    const activeCategory = useUnit($activeCategory);

    useEffect(() => {
        if (searchParams.get('category') !== activeCategory) {
            updateCategoryEvent(searchParams.get('category'));
        }
    }, [categoryParam, activeCategory]);

    return (
        <main className='products'>
            <ProductsHeader/>
            <ProductsGrid/>
            <ProductsStatus/>
        </main>
    );
};

export default Products;