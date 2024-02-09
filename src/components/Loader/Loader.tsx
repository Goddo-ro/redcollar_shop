import LoadstarIcon from 'src/assets/icons/loadstar.svg';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles['loader']}>
            <img className={styles['loader__img']} src={LoadstarIcon}/>
            <span>loading</span>
        </div>
    );
};

export default Loader;