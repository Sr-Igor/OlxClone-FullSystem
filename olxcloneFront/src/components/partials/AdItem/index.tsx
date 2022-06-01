// Created Styled-Components
import * as C from './styled'

// Hooks React
import { Link } from 'react-router-dom'

// Types
import { ItemsList } from "../../../types/MainTypes"

type Data = {
    data: ItemsList
}

export const AdItem = ({data}: Data) => {

    // Verify price content
    let price = "";
    if(data.priceNegotiable){
        price = "Preço Negociável"
    }else{
        price = `R$ ${data.price}`
    }

    return(
        <C.Item className="AdItem">
           <Link to={`/ad/${data.id}`}>
               <div className="itemImg">
                   <img src={data.image} alt="" />
               </div>
               <div className="itemName">{data.title}</div>
               <div className="itemPrice">{price}</div>
           </Link>
        </C.Item>
    )
}