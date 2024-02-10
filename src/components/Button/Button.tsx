import React, { CSSProperties } from 'react';
import { ButtonType } from './ButtonType';
import './styles.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode | string
    className?: string
    styles?: CSSProperties | undefined
    buttonType?: ButtonType
}

const Button = ({ styles, buttonType, className, children, ...rest }: ButtonProps) => {
    // TODO: unhover style
    return (
        <button style={styles} className={['button', buttonType, className].join(' ')} {...rest}>
            { children }
        </button>
    );
};

export default Button;