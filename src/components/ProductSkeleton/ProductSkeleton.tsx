import Skeleton from 'react-loading-skeleton';
import styles from './ProductSkeleton.module.css';

const ProductSkeleton = () => {
    return (
        <Skeleton className={styles.skeleton}/>
    );
};

export default ProductSkeleton;