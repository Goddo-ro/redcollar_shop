import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import { getProductsCategories } from '../../api/ProductsApi';
import styles from './Categories.module.css';
import DraggableList from '../DraggableList/DraggableList';

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
            childRenderer={(category) => {
                return (
                    <Button type={ButtonType.clear}>
                         <Link to={`/products/category/${category}`}>{category}</Link>
                    </Button>
                );
            }}
        />
    );
};

export default Categories;