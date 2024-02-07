import React, { CSSProperties } from 'react';
import { ButtonType } from './ButtonType';
import './styles.css';

type ButtonProps = {
    children: React.ReactNode | string
    className?: string
    styles?: CSSProperties | undefined
    type?: ButtonType
};

const Button = ({ children, className = '', styles, type = ButtonType[''] }: ButtonProps) => {


    return (
        <button style={styles} className={['button', type, className].join(' ')}>
            { children }
        </button>
    );
};

export default Button;