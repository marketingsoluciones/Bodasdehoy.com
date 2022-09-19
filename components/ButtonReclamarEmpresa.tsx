import React from 'react'
import { CrossIcon, UserIcon } from './Icons'
import Router from 'next/router'
import ModalReclarEmpresa from './ReclamarEmpresa/ModalReclamarEmpresa'
import { useState } from 'react'

const ButtonReclamarEmpresa = () => {
    const [showForm, setShowForm] = useState(true)
    return (
        <>
            {showForm ? (
                <ModalReclarEmpresa set={setShowForm} state={showForm} />
            ) : null}

            <button
                className={`hidden sm:flex cursor-pointer bg-color-base font-semibold rounded-full w-max px-4 text-xs py-2 text-primary fixed bottom-16 right-6 z-30 items-center gap-2  transition-all duration-500 shadow-lg`}
                /* onClick={() => Router.push("/reclama-tu-empresa")} */
                onClick={()=>setShowForm(!showForm)}
            >
                <CrossIcon />
                Reclama tu empresa aquí
            </button>
        </>
    )
}

export default ButtonReclamarEmpresa