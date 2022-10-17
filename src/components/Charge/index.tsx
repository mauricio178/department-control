/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { useControls } from '../../hooks/controls'
import { toast } from 'react-toastify'

type SectorProps = {
    name: string
    id: number
}

type ChargeProps = {
    name: string
    id: number
}

export function Charge({ name, id }: SectorProps) {

    const { deleteCharge } = useControls()

    return (
        <div className={styles.container}>
            <p>{name}</p>

            <div className={styles.controls}>
                <AiFillEdit />

                <BsFillTrashFill onClick={() => {
                    deleteCharge(id)
                    toast.success(`Cargo ${name} Deletado!`)
                }
                } />
            </div>
        </div>
    )
}