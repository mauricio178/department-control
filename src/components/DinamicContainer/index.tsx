/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useControls } from '../../hooks/controls'
import { Button } from '../Button'
import { Charge } from '../Charge'
import { Input } from '../Input'
import styles from './styles.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'

type DinamicContainerProps = {

}


export function DinamicContainer({ }: DinamicContainerProps) {

    const [sectorName, setSectorName] = useState<string>('')
    const [chargeName, setChargeName] = useState<string>('')

    const {
        dataEdit,
        chargeList,
        addSector,
        deleteSector,
    } = useControls()

    useEffect(() => {
        if (dataEdit) {

        }
    }, [])

    function actionCharge() {
        if (dataEdit) {

        } else {

        }
    }

    async function actionSector() {
        if (dataEdit) {
            alert('edit')
        } else {
            const obj = {
                name: sectorName,
            }

            addSector(obj)
            setSectorName('')
        }
    }


    return (
        <div className={styles.container}>
            <h1>{!dataEdit ? "ADICIONAR SETOR" : `EDITAR SETOR: {TAL}`}</h1>

            <div className={styles.sectorField}>
                <Input
                    onchange={(e) => setSectorName(e)}
                    placeholder={'Nome do Setor'}
                    type={'text'}
                    value={sectorName}
                    theme='dark'
                />
            </div>



            <div className={styles.chargeField}>
                <div>
                    <Input
                        theme='dark'
                        onchange={(e) => setChargeName(e)}
                        placeholder={'Nome do Cargo'}
                        type={'text'}
                        value={chargeName}
                    />
                    <Button
                        type='submit'
                        theme='primary'
                        disabled={!chargeName ? true : false}
                        placeholder={dataEdit ? "Salvar" : "Cadastrar"}
                        onClick={() => { actionCharge() }}
                    />
                </div>
            </div>

            <div className={styles.listCharges}>
                <p>Listando: <span>{chargeList.length}</span> cargo(s).</p>
                {
                    (chargeList !== undefined && chargeList.length > 0) ?
                        <ul>
                            {chargeList.map((charge: any, k: number) => {
                                return (
                                    <li key={k}>
                                        {charge.name}

                                        <AiFillCloseCircle />
                                    </li>
                                )
                            })}
                        </ul>
                        :
                        <li>Lista Vazia</li>


                }
            </div>

            <div className={styles.bottom}>
                <Button
                    type='submit'
                    theme='primary'
                    disabled={(!sectorName) ? true : false}
                    placeholder={dataEdit ? "Salvar" : "Cadastrar"}
                    onClick={() => { actionSector() }}
                />
            </div>

        </div>
    )
}