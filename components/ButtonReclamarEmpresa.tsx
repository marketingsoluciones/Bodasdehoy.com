import React from 'react'
import { CrossIcon, UserIcon } from './Icons'
import ModalReclarEmpresa from './ReclamarEmpresa/ModalReclamarEmpresa'
import { useState } from 'react'

const ButtonReclamarEmpresa = () => {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            {showForm ? (
                <ModalReclarEmpresa set={setShowForm} state={showForm} />
            ) : null}

            <button
                className={` flex gap-2 bg-primary text-white text-sm py-2  px-4 rounded-full w-full justify-center  items-center`}                
                onClick={()=>setShowForm(!showForm)}
            >
                <CrossIcon />
                Reclama tu empresa aquí
            </button>
        </>
    )
}

export default ButtonReclamarEmpresa