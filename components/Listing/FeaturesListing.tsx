import React, { FC } from 'react'
import { CurrencyIcon, GuestsIcon, NearTheSeaIcon } from '../icons'

const FeaturesListing = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <Component  type={"menu"} data="Desde 1 a 1"/>
            <Component  type={"guests"} data="Desde 1 a 1" />
            <Component  type={"location"} data="Desde 1 a 1" location="NearTheSea" />
        </div>
    )
}

export default FeaturesListing

const locations = {
    NearTheSea : <NearTheSeaIcon />,
    "" : "",
}

const types = {
    menu : {
        title: "Precio del menú",
        icon : <CurrencyIcon />
    },
    guests : {
        title : "Numero de invitados",
        icon : <GuestsIcon />
    },
    location : {
        title: "Localización",
        icon: undefined
    }
}

interface ComponentProps {
    type : keyof typeof types,
    location? : keyof typeof locations
    data : string
}
const Component : FC <ComponentProps> = ({type, data, location = ""}) => {
    
    return (
        <div className="flex flex-col items-center justify-center w-full text-tertiary">
            <span className="h-10">
                {types[type]?.icon || locations[location] }
            </span>
            <h2 className="font-semibold">{types[type]?.title}</h2>
            <h3 className="font-light">{data}</h3>
            
        </div>
    )
}
