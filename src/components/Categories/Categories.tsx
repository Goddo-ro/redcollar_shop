import { useUnit } from 'effector-react';
import Skeleton from 'react-loading-skeleton';
import { $categories, updateCategories } from '../../store/categories';
import DraggableList from '../DraggableList/DraggableList';
import Category from './Category';
import styles from './Categories.module.css';
import 'react-loading-skeleton/dist/skeleton.css';

const Categories = () => {
    const categories = useUnit($categories);
    const isLoading = useUnit(updateCategories.pending);

    return (
        <>   
        {
            isLoading
            ? <DraggableList 
                    children={Array.from({ length: 14 }, () => <Skeleton className={styles.skeleton} />)} 
                    listClass={styles.categories} 
                />
            : <DraggableList
                    children={['all', ...categories]}
                    listClass={styles.categories}
                    childRenderer={category => typeof category === 'string' && <Category category={category}/>}
                />
        }
        </>
    );
};

export default Categories;