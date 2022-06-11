import styled from "styled-components";

export const Item = styled.div`

    a {
        display: block;
        border: 1px solid #FFF;
        background-color: #FFF;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        transition: all ease .2s;

        &:hover{
            border: 1px solid #CCC;
        }

        .itemImg {
            display: flex;
            margin-bottom: 10px;
            width: 100%;

            img {
                margin: auto;
                width: 200px;
                height: 200px;
                border-radius: 5px;
                object-fit: cover;
                object-position: center;
            }
        }

        .itemName {
            font-weight: bold;
        }
    }

    @media (max-width:600px){

        a {
            display: flex;
            padding: 2px;
            border: 1px solid #CCC;
            position: relative;
            margin: 3px 0px;

            .itemImg {
                margin: 0;
                width: 100px;
                height: 100px;
                

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 2px;;
                }
            }

            .itemName {
                margin-left: 15px;
                margin-top: 3px;
                font-size: 14px;
                color: #010101;
            }

            .itemPrice {
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 10px;
                font-size: 13px;
                font-weight: bold;
                color: #4a4a4a;
            }
        }
    }
`