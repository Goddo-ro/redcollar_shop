import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <div className={styles['content-container']}>
            <h1 className={styles['content-container__header']}>It seems we can’t find what you’re looking for.</h1>
            <Button>
                <Link to={'/products'}>
                    Back to products
                </Link>
            </Button>
        </div>
    );
};

export default PageNotFound;