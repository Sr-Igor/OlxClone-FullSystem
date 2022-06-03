import * as C from './styled'
import { useEffect, useState } from "react"
import{ useRef }from "react"

type Props = {
    img: string
    add: boolean
}

const delImages: any = []

export const ImagesSelector = ({img, add}: Props) => {

    // Controler send field (FormData)
    const fileField: any = useRef()

   const [image, setImage] = useState("")
   const [addImage, setAddImage] = useState(false)

    useEffect(()=> {
        if(img != "*"){
            setImage(img)
        }else{
            setImage("/public/images/no-pictures.png")
        }
        setAddImage(add)
    },[])

    const delImage = () => {
        setImage("/public/images/no-pictures.png")
        setAddImage(false)
        delImages.push(img)
        console.log(delImages)
    }

    return (
        <C.ImgArea>
         <C.Item>
            <img src={image} alt="" />
        </C.Item>
        {addImage &&
                <button className='del' onClick={delImage}>
                    <img src="/public/icons/trash.png" alt="del" />
                </button>
            }
        {!addImage && 
            <label className='add'>
                <input 
                    type="file"
                    ref={fileField}
                />
                <img src="/public/icons/plus.png" alt="add" />
            </label>
        }
        </C.ImgArea>
       
    )
}


        

