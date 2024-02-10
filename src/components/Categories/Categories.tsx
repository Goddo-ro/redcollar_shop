import { useUnit } from 'effector-react';
import { $categories } from '../../store/categories';
import DraggableList from '../DraggableList/DraggableList';
import Category from './Category';
import styles from './Categories.module.css';

const Categories = () => {
    const categories = useUnit($categories);

    return (
        <DraggableList
            children={['all', ...categories]}
            listClass={styles.categories}
            childRenderer={category => typeof category === 'string' && <Category category={category}/>}
        />
    );
};

export default Categories;