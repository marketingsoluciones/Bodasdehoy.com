import {CardBusiness} from "../../Category/CardBusiness"
import { StartIconOutline } from "../../Icons"
import { BlockConfiguration } from '../../../pages/configuracion';

export const Favoritos =() =>{
    return (

            <BlockConfiguration title="Favoritos" subtitle="Tus empresas para bodas favoritas, encuentralas aqui">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 w-full mx-auto inset-x-0 ">
                    <CardBusiness size="sm"  />
                    <CardBusiness size="sm"  />
                    <CardBusiness size="sm"  />
                </div>
                </BlockConfiguration>

            
    )
}