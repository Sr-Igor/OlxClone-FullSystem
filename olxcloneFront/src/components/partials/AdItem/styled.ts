import styled from "styled-components";

export const Item = styled.div`
    width: 25%;

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
`