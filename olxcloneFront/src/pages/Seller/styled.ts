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
            flex-wrap: wrap;

            .AdItem {
                width: 20%;

                img {
                    width: 150px;
                    height: 150px;
                }
            }
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

    .pagination {
        display: flex;
        justify-content: center;
        margin: 10px;

        .pageItem {
            background-color: #FF8100;
            color: #FFF;
            margin: 1px;
            padding: 5px 10px;
            border-radius: 50%;
            font-size: 12px;
            cursor: pointer;
        }

        .active {
            background-color: #6e0ad6;
            opacity: 0.5;
        }
    }
`