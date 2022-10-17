/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import {AiFillEdit} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'

type SectorProps = {
    name: string
    id: number
}

type ChargeProps = {
    name: string
    id: number
}

export function Charge({ name, id }: SectorProps) {

    return (
        <div className={styles.container}>
            <p>{name}</p>

            <div className={styles.controls}>
                <AiFillEdit />

                <BsFillTrashFill />
            </div>
        </div>
    )
}