import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface ControlsProviderProps {
    children: any;
}

export type SectorProps = {
    id?: number,
    name: string
    // charges: [
    //     {
    //         name: string,
    //     }
    // ]
}

export type ChargeProps = {
    id?: number,
    name: string
    sectorId?: number
}

interface ControlsContextData {
    addSector: (data: SectorProps) => void
    editSector: (data: SectorProps) => void
    deleteSector: (id: number) => void
    addCharge: (sectorId: number, name: string) => void
    editCharge: (data: ChargeProps) => void
    getSectors: () => void
    getCharges: (sector_id: number) => void
    deleteCharge: (id: number) => void
    dataEdit: boolean,
    setDataEdit: Dispatch<SetStateAction<boolean>>,
    load: boolean,
    setLoad: Dispatch<SetStateAction<boolean>>,
    chargeList: ChargeProps[],
    setChargeList: Dispatch<SetStateAction<[]>>,
    sectorList: SectorProps[],
    setSectorList: Dispatch<SetStateAction<[]>>,

}

export const ControlsContext = createContext(({} as ControlsContextData));

function ControlsProvider({ children }: ControlsProviderProps) {

    //  ## STATES 

    const [load, setLoad] = useState<boolean>(false)
    const [dataEdit, setDataEdit] = useState<boolean>(false)
    const [chargeList, setChargeList] = useState<ChargeProps[]>([])
    const [sectorList, setSectorList] = useState<SectorProps[]>([])

    //  ## SECTOR 

    async function getSectors() {
        await fetch("http://localhost:3000/sectors", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async (res) => {
                var result = await res.json()
                setSectorList(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function addSector(data: SectorProps) {
        if (sectorList.length >= 1) {
            const nameIsValid = sectorList.findIndex(val => val.name === data.name);
            if (nameIsValid >= 1) {
                toast.error('Este Departamento já existe!')
            } else {
                await fetch("http://localhost:3000/sectors", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: data.name
                    })
                })
                    .then(async (res) => {
                        toast.success(`Setor ${data.name} cadastrado!`)
                        getSectors()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        } else {
            await fetch("http://localhost:3000/sectors", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name
                })
            })
                .then(async (res) => {
                    toast.success(`Primeiro Setor ${data.name} cadastrado!`)
                    getSectors()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    async function editSector() {

    }

    async function deleteSector(id: number) {
        await fetch(`http://localhost:3000/sectors/${id}`, {
            method: "DELETE",
        })
            .then(async (res) => {
                toast.success(`Setor deletado!`)
                getSectors()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //  ## CHARGE 

    async function getCharges(sector_id: number) {
        await fetch(`http://localhost:3000/charges`, {
            method: "GET"
        })
            .then(async (res) => {
                console.log(res)
                var result = await res.json()
                const newArray = []

                await result.map((charge: ChargeProps) => {
                    if(charge.sectorId !== sector_id){
                        return
                    } else {
                        newArray.push(charge)
                    }
                })

                console.log(result)
                setChargeList(newArray)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function addCharge(sectorId: number, name: string) {
        await fetch(`http://localhost:3000/sectors/${sectorId}/charges`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
            .then(async (res) => {
                toast.success(`Cargo ${name} cadastrado!`)
                getCharges(sectorId)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function editCharge() {

    }

    async function deleteCharge() {

    }

    return (
        <div>
            <ControlsContext.Provider
                value={{
                    load,
                    setLoad,
                    getCharges,
                    sectorList,
                    setSectorList,
                    getSectors,
                    chargeList,
                    setChargeList,
                    dataEdit,
                    setDataEdit,
                    addSector,
                    editSector,
                    deleteSector,
                    addCharge,
                    editCharge,
                    deleteCharge,
                }}
            >
                {children}
            </ControlsContext.Provider>
        </div>
    )
}

function useControls() {
    return useContext(ControlsContext)
}

export { ControlsProvider, useControls }