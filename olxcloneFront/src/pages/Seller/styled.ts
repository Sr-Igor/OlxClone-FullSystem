import styled from "styled-components";


export const PageArea = styled.div`

    .box-filter {
        margin: 50px 0;

        span {
            margin: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            cursor: pointer;
            font-size: 18px;
        }

        span:hover, .active {
            color: #6e0ad7;
            border-bottom: 3px solid #6e0ad7;
        }
    }

    .container {
        width: 98%;
        margin: auto;
        min-height: 500px;
        border: 1px solid #CCC;
        border-radius: 5px;
        box-shadow: 0px 0px 5px #666;
        backgrOund-color: #FFF;
        
        .list {
            display: flex;
        }

        .emptyMessage {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 500px;

            img {
                width: 150px;
            }

            div {
                font-size: 20px;
                color: #347bfa;
                margin-top: 10px;
            }
        }
    }
`