import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { $activeCategory, updateCategory } from '../../store/categories';
import ProductsHeader from '../../components/ProductsHeader/ProductsHeader';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import ProductsStatus from '../../components/ProductsStatus/ProductsStatus';
import Cart from '../../components/Cart/Cart';

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
            <SkeletonTheme baseColor="#DADADA" highlightColor="#BBBBBB">
                <Cart/>
                <ProductsHeader/>
                <ProductsGrid/>
                <ProductsStatus/>
            </SkeletonTheme>
        </main>
    );
};

export default Products;