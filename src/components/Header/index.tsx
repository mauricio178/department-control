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


export function Header() {

    const router = useRouter()

    const items = [
        {
            id: 1,
            icon: <FcDepartment />,
            text: 'SETORES',
            route: '/dashboard'
        },
        {
            id: 2,
            icon: <GrUserWorker />,
            text: 'CARGOS',
            route: '/dashboard'
        },
        {
            id: 3,
            icon: <FaUsers />,
            text: 'USUÁRIOS',
            route: '/dashboard'
        }
    ]

    function logoff() {
        if (confirm("Deseja sair?")) {
            router.push('/')
            toast.success('Deslogado!')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                {items.map((item: any) => {
                    return (
                        <ItemHeader
                            key={item.id}
                            text={item.text}
                            icon={item.icon}
                            route={item.route}
                        />
                    )
                })}
            </div>


            <div className={styles.logoff} onClick={() => logoff()}>
                <CgLogOff />
            </div>
        </div>
    )
}