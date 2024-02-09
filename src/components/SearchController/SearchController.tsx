import { ChangeEvent, useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { updateSearchValue } from '../../store/products';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from '../SearchInput/SearchInput';

type SearchControllerProps = {
    setIsOpen: (isOpen: boolean) => void
};

const SearchController = ({ setIsOpen }: SearchControllerProps) => {
    const [value, setValue] = useState('');
    
    const debounceValue = useDebounce(value, 500);

    const updateSearchValueEvent = useUnit(updateSearchValue);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const resetHandler = () => {
        if (!value) {
            setIsOpen(false);
        } else {
            setValue('');
        }
    };

    useEffect(() => {
        updateSearchValueEvent(debounceValue);
    }, [debounceValue]);

    return (
        <SearchInput
            value={value}
            onChange={changeHandler}
            resetClickHandler={resetHandler}
        />
    );
};

export default SearchController;