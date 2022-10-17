import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { Sector } from '../../components/Sector'
import { DinamicContainer } from '../../components/DinamicContainer'
import { Header } from '../../components/Header'
import { useControls } from '../../hooks/controls'

export default function Dashboard() {

    const {getSectors, sectorList} = useControls()
    
    useEffect(() => {
        getSectors()
    }, [])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.box1}>
                    <h1>SETORES</h1>
                    {
                        (sectorList !== undefined && sectorList.length > 0) ?
                            <ul>
                                {sectorList.map((e: any) => {
                                    return (
                                        <Sector
                                            key={e.id}
                                            name={e.name}
                                            id={e.id}
                                        />
                                    )
                                })}
                            </ul>
                            :
                            <p>Não existem setores cadastrados.</p>
                    }
                </div>
                <div className={styles.box2}>
                    <DinamicContainer />
                </div>
            </div>


        </div>
    )
}
