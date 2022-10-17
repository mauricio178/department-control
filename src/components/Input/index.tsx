/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styles from './styles.module.scss'

type InputProps = {
    placeholder: string;
    type: string;
    value: string | [];
    onchange: any;
    required?: boolean;
    theme: 'white' | 'dark'
}

export function Input({ placeholder, type, value, onchange, required = false, theme }: InputProps) {
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
        setError(false);
        setIsFocused(true);
    }

    function handleBlur() {
        if (value !== "")
            return;

        if (required)
            setError(true);

        setIsFocused(false);
    }

    function changeInputValue(text: string) {
        handleFocus();
        onchange(text);
    }

    return (
        <div className={`${theme === 'white' ? styles.container : styles.containerDark} ${error ? styles.error : undefined}`}>
            <input
                placeholder={placeholder}
                type={type}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={(text) => changeInputValue(text.target.value)}
            />
        </div>
    )
}