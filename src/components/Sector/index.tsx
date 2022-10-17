/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { ChargeProps, useControls } from '../../hooks/controls'
import { Charge } from '../Charge'
import styles from './styles.module.scss'
import { BiShowAlt, BiHide } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

type SectorProps = {
    name: string
    id: number
}

export function Sector({ name, id }: SectorProps) {

    const [open, setOpen] = useState<boolean>(false)

    const { deleteSector, editSector, getCharges, chargeList } = useControls()

    useEffect(() => {
        chargeList.map((charge: ChargeProps) => {
            if(charge.sectorId !== id){
                setOpen(false)
            }
        })
    }, [chargeList])

    return (
        <div className={styles.container}>
            <div className={styles.line}>
                <p>{name}</p>

                <div className={styles.controls}>
                    {open ?
                        <BiHide onClick={(() => {
                            getCharges(id)
                            setOpen(!open)
                        })} /> :
                        <BiShowAlt onClick={(() => {
                            getCharges(id)
                            setOpen(!open)
                        })} />}

                    <AiFillEdit onClick={(() => {

                        // const data = {
                        //     name: name,
                        //     id: id,
                        //     charges: 
                        // }

                        // editCharge(id)

                    })} />

                    <BsFillTrashFill onClick={(() => deleteSector(id))} />

                </div>
            </div>

            <div className={open ? styles.showCharges : styles.hideCharges}>
                {chargeList.length > 0 && <>
                    {chargeList.map((e: ChargeProps, k: number) => {
                        return (
                            <Charge
                                key={e.id}
                                name={e.name}
                                id={e.id}
                            />
                        )
                    })
                    }
                </>

                }
            </div>
        </div>
    )
}