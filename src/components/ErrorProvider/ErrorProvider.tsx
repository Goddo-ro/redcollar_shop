import { useUnit } from 'effector-react';
import { $error, resetError } from '../../store/error';
import styles from './ErrorProvider.module.css';
import { useEffect } from 'react';

const ErrorProvider = () => {
    const error = useUnit($error);
    const resetErrorEvent = useUnit(resetError);

    useEffect(() => {
        if (!error) return;
        setTimeout(() => {
            resetErrorEvent();
        }, 5000);
    }, [error]);

    return (
        <>
        {
            error && 
            <div className={styles['error-container']}>
                <span className={styles['error-container__error']}>{error}</span>
            </div>
        }
        </>
    );
};

export default ErrorProvider;