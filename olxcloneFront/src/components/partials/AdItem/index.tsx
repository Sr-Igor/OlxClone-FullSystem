// Created Styled-Components
import * as C from './styled'

// Hooks React
import { Link } from "react-router-dom"

// Types
import { Item } from "../../../types/MainTypes"

type Data = {
    data: Item
}

export const AdItem = ({data}: Data) => {

    // Verify price content
    let price = "";
    if(data.priceNegociable){
        price = "Preço Negociável"
    }else{
        price = `R$ ${data.price}`
    }

    return(
        <C.Item className="AdItem">
           <Link to={`/ad/${data._id}`}>
               <div className="itemImg">
                   <img src={data.images[1]} alt="" />
               </div>
               <div className="itemName">{data.title}</div>
               <div className="itemPrice">{price}</div>
           </Link>
        </C.Item>
    )
}