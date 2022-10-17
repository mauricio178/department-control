import React from 'react'
import styles from './styles.module.scss'

export function Load() {
    return (
        <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
    )
}