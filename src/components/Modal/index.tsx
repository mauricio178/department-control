/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FcDepartment } from 'react-icons/fc'
import { FaUsers } from 'react-icons/fa'
import { GrUserWorker } from 'react-icons/gr'
import { CgLogOff } from 'react-icons/cg'
import { ItemHeader } from '../ItemHeader'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { SectorProps, useControls } from '../../hooks/controls'

export type ModalProps = {
    name: string
}

export function Modal({ name }: ModalProps) {

    const { getSectors, sectorList, setSectorSelected, sectorSelected } = useControls()

    useEffect(() => {
        getSectors()
    }, [sectorList])

    return (
        <div className={styles.container}>

            <div className={styles.content}>
                <h1>Selecione um Setor existente ou crie um novo no campo acima para inserir o Cargo: <span>{name}</span></h1>

            </div>
            <ul className={styles.nav}>
                {sectorList.map((item: SectorProps) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => {
                                if(sectorSelected === 0){
                                    setSectorSelected(item.id)
                                    toast.success('Setor selecionado!')
                                } else {
                                    setSectorSelected(0)
                                    toast.error('Setor desmarcado, selecione outro para poder Cadastrar o Cargo.')
                                }
                                
                            }}
                            className={item.id === sectorSelected ? styles.selected : styles.normal}
                        >
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}