/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './styles.module.scss'

export type ItemHeaderProps = {
    id: number,
    text: string,
    icon: ReactNode,
    route: string
}

export function ItemHeader(data: any) {

    function goToDashboard () {
    }

    return (
        <div className={styles.container} onClick={() => goToDashboard()}>
            {data.icon}
            <p>{data.text}</p>
        </div>
    )
}