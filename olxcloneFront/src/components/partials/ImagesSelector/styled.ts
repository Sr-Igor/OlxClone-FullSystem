import styled from "styled-components";

export const ImgArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items center;
    padding: 10px;

    button, label {
        width: 90px;
        border: none;
        padding: 3px 7px;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
            display: none;
        }
        
       img {
           width: 20px;
           height: 20px;
           transform: scale(0.8);
           transition: all ease 0.2s;
       }

       &:hover {
            img {
                transform: scale(1);
            }
       }
    }

    .del {
        background-color: #cf1500;
    }

    .add {
        background-color: #e57706;
    }

`

export const Item = styled.div`
    margin: 10px;
    background-color: #FFF;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 3px 2px 3px #777;
    cursor: pointer;

    img {
        width:130px;
        height: 130px;
    }
`
