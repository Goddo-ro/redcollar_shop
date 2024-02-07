import { useEffect, useState } from 'react';
import { getProductsCategories } from '../../api/ProductsApi';
import styles from './Categories.module.css';
import DraggableList from '../DraggableList/DraggableList';
import Category from '../Category/Category';

const Categories = () => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        getProductsCategories().then(res => {
            setCategories([...res.data, ...res.data]);
        });
    });

    return (
        <DraggableList
            children={categories}
            listClass={styles.categories}
            childRenderer={category => typeof category === 'string' && <Category category={category}/>}
        />
    );
};

export default Categories;