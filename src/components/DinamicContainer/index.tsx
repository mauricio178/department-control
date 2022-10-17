/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useControls } from '../../hooks/controls'
import { Button } from '../Button'
import { Charge } from '../Charge'
import { Input } from '../Input'
import styles from './styles.module.scss'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Modal } from '../Modal'
import { toast } from 'react-toastify'

type DinamicContainerProps = {

}


export function DinamicContainer({ }: DinamicContainerProps) {

    const [sectorName, setSectorName] = useState<string>('')
    const [chargeName, setChargeName] = useState<string>('')

    const {
        dataEdit,
        chargeList,
        addSector,
        deleteCharge,
        modal,
        setModal,
        sectorSelected,
        setSectorSelected,
        addCharge
    } = useControls()

    useEffect(() => {
        console.log(sectorSelected)
    }, [])

    function actionCharge() {
        if (dataEdit) {

        } else {
            if (sectorName === '') {
                setModal(true)
                if (sectorSelected !== 0 && chargeName !== '') {
                    addCharge(chargeName)
                    setChargeName('')
                    setSectorSelected(0)
                }
            } else {
                setModal(false)
            }
        }
    }

    async function actionSector() {
        if (dataEdit) {
            alert('edit')
        } else {

            if (chargeName !== '' && sectorName !== '') {
                const obj = {
                    name: sectorName,
                }
                addSector(obj).then(res => {
                    if (res === true) {
                        addCharge(chargeName)
                    } else {
                        toast.error('Ocorreu um erro ao cadastrar')
                    }
                })
                setChargeName('')
                setSectorSelected(0)
            }

            if (chargeName === '' && sectorName !== '') {
                const obj = {
                    name: sectorName,
                }
                addSector(obj)
            }
            setSectorName('')
        }
    }

    useEffect(() => {
        if (chargeName !== '') {
            setModal(true)
        }
    })

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
                        disabled={(sectorSelected === 0) ? true : false}
                        placeholder={dataEdit ? "Salvar" : "Cadastrar"}
                        onClick={() => { actionCharge() }}
                    />
                </div>
            </div>

            <div className={styles.listCharges}>
                {modal ? <Modal name={chargeName} /> :
                    <>
                        <p>Listando: <span>{chargeList.length}</span> cargo(s).</p>
                        {
                            (chargeList !== undefined && chargeList.length > 0) ?
                                <ul>
                                    {chargeList.map((charge: any, k: number) => {
                                        return (
                                            <li key={k}>
                                                {charge.name}

                                                <AiFillCloseCircle onClick={() => deleteCharge(charge.id)} />
                                            </li>
                                        )
                                    })}
                                </ul>
                                :
                                <li>Lista Vazia</li>


                        }
                    </>
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