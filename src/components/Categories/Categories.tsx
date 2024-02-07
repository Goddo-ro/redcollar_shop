import { useEffect, useState } from 'react';
import { getProductsCategories } from '../../api/ProductsApi';
import DraggableList from '../DraggableList/DraggableList';
import Category from '../Category/Category';
import styles from './Categories.module.css';

const Categories = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        getProductsCategories().then(res => {
            setCategories([...res.data]);
        });
    }, []);

    return (
        <DraggableList
            children={['all', ...categories]}
            listClass={styles.categories}
            childRenderer={category => typeof category === 'string' && <Category category={category}/>}
        />
    );
};

export default Categories;