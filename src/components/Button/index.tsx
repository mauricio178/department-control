import React, { HTMLAttributes } from 'react';

import styles from './styles.module.scss';

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    placeholder: string,
    theme?: 'primary' | 'green';
    disabled?: boolean
    type: string
}

export function Button({ placeholder, type, theme = 'primary', disabled = false, ...rest }: ButtonProps) {

    return (
        <button
            disabled={disabled}
            type={'submit'}
            {...rest}
            className={theme === 'primary' ? styles.primary : styles.green}
        >
            {placeholder}
        </button>
    )
}