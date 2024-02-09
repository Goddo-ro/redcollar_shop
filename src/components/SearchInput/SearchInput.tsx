import { ChangeEvent } from 'react';
import SearchIcon from 'src/assets/icons/search.svg';
import CrossIcon from 'src/assets/icons/cross.svg';
import styles from './SearchInput.module.css';

type SearchInputProps = {
    resetClickHandler?: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
};

const SearchInput = ({ resetClickHandler, onChange, value }: SearchInputProps) => {
    return (
        <div className={styles['search-container']}>
            <img src={SearchIcon} />
            <input 
                className={styles['search-container__input']} 
                onChange={onChange}
                value={value}
                placeholder='Search...'
            />
            <img 
                className={styles['search-container__reset']} 
                onClick={resetClickHandler}
                src={CrossIcon} 
                alt='cross' 
            />
        </div>
    );
};

export default SearchInput;